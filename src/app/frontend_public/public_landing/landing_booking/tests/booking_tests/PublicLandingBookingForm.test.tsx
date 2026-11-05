import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_booking/locales/public_landing_en.json';
import PublicLandingBooking from '@/app/frontend_public/public_landing/landing_booking/components/booking/PublicLandingBooking';
import { landingHandlers } from '@/app/frontend_public/public_landing/landing_booking/mocks/handlers/PublicLandingBookingMockHandlers';
import { getPublicLandingDateInputValueDaysFromToday } from '@/app/frontend_public/public_landing/landing_booking/utils/PublicLandingBookingDateUtils';
import { landingMockState, resetPublicLandingMockState } from '@/app/frontend_public/public_landing/landing_booking/mocks/fixtures/PublicLandingBookingMockFixtures';

const server = setupServer(...landingHandlers);
function renderBooking() {
  const queryClient = new QueryClient();
  return render(<NextIntlClientProvider locale="en" messages={enMessages}><QueryClientProvider client={queryClient}><PublicLandingBooking /></QueryClientProvider></NextIntlClientProvider>);
}
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); resetPublicLandingMockState(); });
afterAll(() => server.close());

describe('PublicLandingBooking', () => {
  it('accepts valid input and non-.com email domains', async () => {
    renderBooking();
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Preferred Date/i), { target: { value: getPublicLandingDateInputValueDaysFromToday(7) } });
    fireEvent.click(screen.getByRole('button', { name: 'Proceed to Book' }));
    await waitFor(() => expect(screen.getByTestId('public_landing-booking-success-state')).toBeInTheDocument());
    expect(landingMockState.bookings).toHaveLength(1);
    expect(landingMockState.bookings[0]?.email).toBe('member@example.org');
    expect(landingMockState.bookings[0]?.date).toMatch(/T.*Z$/);
  });

  it('surfaces an API error, preserves input, retries with the same user intent, and reaches success', async () => {
    let attempts = 0;
    const seenKeys: string[] = [];
    server.use(http.post('*/landing/bookings', async ({ request }) => {
      attempts += 1;
      const key = request.headers.get('Idempotency-Key');
      if (key) seenKeys.push(key);
      if (attempts === 1) return HttpResponse.json({ success: false, message: 'Booking service is temporarily unavailable. Please try again.', data: null, errorCode: 'BOOKING_SERVICE_UNAVAILABLE' });
      return HttpResponse.json({ success: true, message: 'Booking submitted successfully. Our team will contact you shortly.', data: null });
    }));
    renderBooking();
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Preferred Date/i), { target: { value: getPublicLandingDateInputValueDaysFromToday(7) } });
    fireEvent.click(screen.getByRole('button', { name: 'Proceed to Book' }));
    await waitFor(() => expect(screen.getByTestId('public_landing-booking-api-error')).toHaveTextContent('Booking service is temporarily unavailable'));
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('member@example.org');
    fireEvent.click(screen.getByTestId('public_landing-booking-retry'));
    await waitFor(() => expect(screen.getByTestId('public_landing-booking-success-state')).toBeInTheDocument());
    expect(attempts).toBe(2);
    expect(seenKeys[0]).toBe(seenKeys[1]);
  });

  it('disables stale retry after edits and submits the edited values as a new intent', async () => {
    let attempts = 0;
    const seenKeys: string[] = [];
    const seenEmails: string[] = [];
    server.use(http.post('*/landing/bookings', async ({ request }) => {
      attempts += 1;
      seenKeys.push(request.headers.get('Idempotency-Key') ?? '');
      const body = await request.json() as { email: string };
      seenEmails.push(body.email);
      if (attempts === 1) return HttpResponse.json({ success: false, message: 'Booking service is temporarily unavailable. Please try again.', data: null, errorCode: 'BOOKING_SERVICE_UNAVAILABLE' }, { status: 503 });
      return HttpResponse.json({ success: true, message: 'Booking submitted successfully. Our team will contact you shortly.', data: null });
    }));
    renderBooking();
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'first@example.org' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/Preferred Date/i), { target: { value: getPublicLandingDateInputValueDaysFromToday(7) } });
    fireEvent.click(screen.getByRole('button', { name: 'Proceed to Book' }));
    await waitFor(() => expect(screen.getByTestId('public_landing-booking-api-error')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'edited@example.org' } });
    expect(screen.getByTestId('public_landing-booking-retry')).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Proceed to Book' }));
    await waitFor(() => expect(screen.getByTestId('public_landing-booking-success-state')).toBeInTheDocument());
    expect(attempts).toBe(2);
    expect(seenKeys[0]).not.toBe(seenKeys[1]);
    expect(seenEmails).toEqual(['first@example.org', 'edited@example.org']);
  });
});
