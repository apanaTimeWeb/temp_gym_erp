import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_contact/locales/public_landing_en.json';
import PublicLandingContact from '@/app/frontend_public/public_landing/landing_contact/components/contact/PublicLandingContact';
import { landingHandlers } from '@/app/frontend_public/public_landing/landing_contact/mocks/handlers/PublicLandingContactMockHandlers';
import { landingMockState, resetPublicLandingMockState } from '@/app/frontend_public/public_landing/landing_contact/mocks/fixtures/PublicLandingContactMockFixtures';

const server = setupServer(...landingHandlers);
function renderContact() {
  const queryClient = new QueryClient();
  return render(<NextIntlClientProvider locale="en" messages={enMessages}><QueryClientProvider client={queryClient}><PublicLandingContact /></QueryClientProvider></NextIntlClientProvider>);
}
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); resetPublicLandingMockState(); });
afterAll(() => server.close());

describe('PublicLandingContact', () => {
  it('submits a valid message and displays the backend response message', async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'I would like to know more about memberships.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    await waitFor(() => expect(screen.getByTestId('public_landing-contact-success-state')).toBeInTheDocument());
    expect(screen.getByText(/Message sent successfully/)).toBeInTheDocument();
    expect(landingMockState.contacts).toHaveLength(1);
  });

  it('preserves input and recovers after a failed request using the same idempotency key', async () => {
    let attempts = 0;
    const seenKeys: string[] = [];
    server.use(http.post('*/landing/contact', async ({ request }) => {
      attempts += 1;
      const key = request.headers.get('Idempotency-Key');
      if (key) seenKeys.push(key);
      if (attempts === 1) return HttpResponse.json({ success: false, message: 'Messaging service is temporarily unavailable. Please try again.', data: null, errorCode: 'CONTACT_SERVICE_UNAVAILABLE' });
      return HttpResponse.json({ success: true, message: 'Message sent successfully. We will get back to you shortly.', data: null });
    }));
    renderContact();
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Need a callback.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    await waitFor(() => expect(screen.getByTestId('public_landing-contact-api-error')).toHaveTextContent('Messaging service is temporarily unavailable'));
    expect(screen.getByLabelText(/Message/i)).toHaveValue('Need a callback.');
    fireEvent.click(screen.getByTestId('public_landing-contact-retry'));
    await waitFor(() => expect(screen.getByTestId('public_landing-contact-success-state')).toBeInTheDocument());
    expect(attempts).toBe(2);
    expect(seenKeys[0]).toBe(seenKeys[1]);
  });
});
