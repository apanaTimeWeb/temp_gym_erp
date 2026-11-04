import { renderHook, act, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';
import { usePublicLandingNewsletter } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingNewsletter';
const wrapper = ({ children }: { children: ReactNode }) => <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>;
describe('usePublicLandingNewsletter', () => {
  it('does not invent a recipient when no business email is configured', () => {
    const { result } = renderHook(() => usePublicLandingNewsletter(), { wrapper });
    act(() => result.current.form.setValue('email', 'member@example.org'));
    expect(result.current.mailtoHref).toBeNull();
  });
  it('reports that the newsletter destination is unavailable after valid input', async () => {
    const { result } = renderHook(() => usePublicLandingNewsletter(), { wrapper });
    act(() => result.current.form.setValue('email', 'person@example.org'));
    await act(async () => { await result.current.handleSubmit(); });
    await waitFor(() => expect(result.current.form.formState.errors.email?.message).toBe('footer.newsletter.destinationUnavailable'));
  });
  it('uses RHF and Zod to reject invalid email without opening mail client', async () => {
    const { result } = renderHook(() => usePublicLandingNewsletter(), { wrapper });
    act(() => result.current.form.setValue('email', 'bad'));
    await act(async () => { await result.current.handleSubmit(); });
    await waitFor(() => expect(result.current.form.formState.errors.email?.message).toBe('validation.email'));
  });
});
