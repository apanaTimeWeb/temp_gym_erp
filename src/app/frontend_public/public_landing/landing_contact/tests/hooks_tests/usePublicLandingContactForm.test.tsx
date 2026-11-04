import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_contact/locales/public_landing_en.json';
import { usePublicLandingContactForm } from '@/app/frontend_public/public_landing/landing_contact/hooks/usePublicLandingContactForm';
import { PublicLandingApiRequestError } from '@/app/frontend_public/public_landing/landing_contact/types/PublicLandingContactTypes';

const { createContactMock } = vi.hoisted(() => ({ createContactMock: vi.fn() }));
vi.mock('@/app/frontend_public/public_landing/landing_contact/api/PublicLandingContactApi', () => ({
  createPublicLandingBooking: vi.fn(),
  createPublicLandingContactMessage: createContactMock,
}));
vi.mock('@/app/frontend_public/public_landing/landing_contact/hooks/usePublicLandingContactUnsavedChangesGuard', () => ({
  usePublicLandingUnsavedChangesGuard: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <NextIntlClientProvider locale="en" messages={enMessages}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></NextIntlClientProvider>;
  };
}

describe('usePublicLandingContactForm', () => {
  beforeEach(() => createContactMock.mockReset());

  it('reuses one idempotency key for a failed message intent and its retry', async () => {
    createContactMock
      .mockRejectedValueOnce(new PublicLandingApiRequestError('Messaging service is temporarily unavailable.', { errorCode: 'CONTACT_REQUEST_FAILED', isBackendMessage: true }))
      .mockResolvedValueOnce({ success: true, message: 'Message sent successfully.', data: null });

    const { result } = renderHook(() => usePublicLandingContactForm(), { wrapper: createWrapper() });
    act(() => {
      result.current.form.setValue('name', 'Member One', { shouldDirty: true });
      result.current.form.setValue('email', 'member@example.org', { shouldDirty: true });
      result.current.form.setValue('message', 'Please share membership details.', { shouldDirty: true });
    });

    await act(async () => { await result.current.submit(); });
    await waitFor(() => expect(result.current.canRetry).toBe(true));
    expect(result.current.errorMessage).toContain('Messaging service is temporarily unavailable');

    await act(async () => { result.current.retry(); });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(createContactMock).toHaveBeenCalledTimes(2);
    const firstIdempotencyKey = createContactMock.mock.calls[0]?.[1];
    const retryIdempotencyKey = createContactMock.mock.calls[1]?.[1];
    expect(firstIdempotencyKey).toEqual(expect.any(String));
    expect(firstIdempotencyKey).not.toBe('');
    expect(retryIdempotencyKey).toBe(firstIdempotencyKey);
    expect(result.current.successMessage).toBe('Message sent successfully.');
  });
  it('maps HTTP 400 backend validation errors only onto verified contact fields', async () => {
    createContactMock.mockRejectedValueOnce(new PublicLandingApiRequestError('Please check the form.', {
      statusCode: 400, errorCode: 'VALIDATION_ERROR', isBackendMessage: true,
      validationErrors: [{ field: 'email', message: 'This address was already used.' },
        { field: 'adminRole', message: 'Must not set unknown fields.' }],
    }));
    const { result } = renderHook(() => usePublicLandingContactForm(), { wrapper: createWrapper() });
    act(() => {
      result.current.form.setValue('name', 'Member One', { shouldDirty: true });
      result.current.form.setValue('email', 'member@example.org', { shouldDirty: true });
      result.current.form.setValue('message', 'Please share membership details.', { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    await waitFor(() => expect(result.current.form.formState.errors.email?.message).toBe('This address was already used.'));
    expect(result.current.form.getValues('email')).toBe('member@example.org');
    expect(result.current.form.getFieldState('adminRole' as never).error).toBeUndefined();
  });

});
