import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import enMessages from '@/app/frontend_public/public_landing/landing_booking/locales/public_landing_en.json';
import { usePublicLandingBookingForm } from '@/app/frontend_public/public_landing/landing_booking/hooks/usePublicLandingBookingForm';
import { getPublicLandingDateInputValueDaysFromToday } from '@/app/frontend_public/public_landing/landing_booking/utils/PublicLandingBookingDateUtils';
import { PublicLandingApiRequestError } from '@/app/frontend_public/public_landing/landing_booking/types/PublicLandingBookingTypes';

const { createBookingMock } = vi.hoisted(() => ({ createBookingMock: vi.fn() }));
vi.mock('@/app/frontend_public/public_landing/landing_booking/api/PublicLandingBookingApi', () => ({
  createPublicLandingBooking: createBookingMock,
  createPublicLandingContactMessage: vi.fn(),
}));
vi.mock('@/app/frontend_public/public_landing/landing_booking/hooks/usePublicLandingBookingUnsavedChangesGuard', () => ({
  usePublicLandingUnsavedChangesGuard: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <NextIntlClientProvider locale="en" messages={enMessages}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></NextIntlClientProvider>;
  };
}

describe('usePublicLandingBookingForm', () => {
  beforeEach(() => createBookingMock.mockReset());

  it('reuses one idempotency key for a failed intent and its retry', async () => {
    createBookingMock
      .mockRejectedValueOnce(new PublicLandingApiRequestError('Booking service is temporarily unavailable.', { errorCode: 'BOOKING_REQUEST_FAILED', isBackendMessage: true }))
      .mockResolvedValueOnce({ success: true, message: 'Booking submitted successfully.', data: null });

    const { result } = renderHook(() => usePublicLandingBookingForm(), { wrapper: createWrapper() });
    act(() => {
      result.current.form.setValue('name', 'Member One', { shouldDirty: true });
      result.current.form.setValue('email', 'member@example.org', { shouldDirty: true });
      result.current.form.setValue('phone', '9876543210', { shouldDirty: true });
      result.current.form.setValue('date', getPublicLandingDateInputValueDaysFromToday(7), { shouldDirty: true });
      result.current.form.setValue('type', 'trial', { shouldDirty: true });
    });

    await act(async () => { await result.current.submit(); });
    await waitFor(() => expect(result.current.canRetry).toBe(true));
    expect(result.current.errorMessage).toContain('Booking service is temporarily unavailable');

    await act(async () => { result.current.retry(); });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(createBookingMock).toHaveBeenCalledTimes(2);
    const firstIdempotencyKey = createBookingMock.mock.calls[0]?.[1];
    const retryIdempotencyKey = createBookingMock.mock.calls[1]?.[1];
    expect(firstIdempotencyKey).toEqual(expect.any(String));
    expect(firstIdempotencyKey).not.toBe('');
    expect(retryIdempotencyKey).toBe(firstIdempotencyKey);
    expect(result.current.successMessage).toBe('Booking submitted successfully.');
  });
  it('maps HTTP 400 backend validation errors only onto verified booking fields', async () => {
    createBookingMock.mockRejectedValueOnce(new PublicLandingApiRequestError('Please check the form.', {
      statusCode: 400, errorCode: 'VALIDATION_ERROR', isBackendMessage: true,
      validationErrors: [{ field: 'email', message: 'This address was already used.' },
        { field: 'adminRole', message: 'Must not set unknown fields.' }],
    }));
    const { result } = renderHook(() => usePublicLandingBookingForm(), { wrapper: createWrapper() });
    act(() => {
      result.current.form.setValue('name', 'Member One', { shouldDirty: true });
      result.current.form.setValue('email', 'member@example.org', { shouldDirty: true });
      result.current.form.setValue('phone', '9876543210', { shouldDirty: true });
      result.current.form.setValue('date', getPublicLandingDateInputValueDaysFromToday(7), { shouldDirty: true });
      result.current.form.setValue('type', 'trial', { shouldDirty: true });
    });
    await act(async () => { await result.current.submit(); });
    await waitFor(() => expect(result.current.form.formState.errors.email?.message).toBe('This address was already used.'));
    expect(result.current.form.getValues('email')).toBe('member@example.org');
    expect(result.current.form.getFieldState('adminRole' as never).error).toBeUndefined();
  });

});
