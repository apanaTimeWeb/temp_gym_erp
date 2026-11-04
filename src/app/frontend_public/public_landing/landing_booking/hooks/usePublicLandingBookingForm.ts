// RESPONSIBILITY: Owns Booking form state, validation, mutation lifecycle, idempotent retry, and dirty-state protection.
// DATA FLOW: Form → RHF/Zod → API client → canonical backend response → user-visible success/error.
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPublicLandingBooking } from '@/app/frontend_public/public_landing/landing_booking/api/PublicLandingBookingApi';
import { PublicLandingBookingSchema } from '@/app/frontend_public/public_landing/landing_booking/schemas/PublicLandingBookingSchema';
import { EMPTY_LANDING_BOOKING_FORM } from '@/app/frontend_public/public_landing/landing_booking/constants/PublicLandingBookingFormConstants';
import { LANDING_API_ERROR_CODES } from '@/app/frontend_public/public_landing/landing_booking/constants/PublicLandingBookingApiErrorConstants';
import { PublicLandingApiRequestError } from '@/app/frontend_public/public_landing/landing_booking/types/PublicLandingBookingTypes';
import { usePublicLandingUnsavedChangesGuard } from '@/app/frontend_public/public_landing/landing_booking/hooks/usePublicLandingBookingUnsavedChangesGuard';
import type { PublicLandingBookingFormValues } from '@/app/frontend_public/public_landing/landing_booking/types/PublicLandingBookingTypes';

/** Orchestrates the booking workflow without rendering JSX.
 * @dependencies RHF, Zod, TanStack Query mutation state, PublicLanding booking API, translations, and dirty-form guard.
 * @edge-case One idempotency key is generated per valid submit intent and reused for retry; it is reset only after success or explicit start-new.
 */
export function usePublicLandingBookingForm() {
  const t = useTranslations('LANDING');
  const lastSubmittedValues = useRef<PublicLandingBookingFormValues | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<PublicLandingBookingFormValues>({ defaultValues: EMPTY_LANDING_BOOKING_FORM, resolver: zodResolver(PublicLandingBookingSchema), mode: 'onBlur', reValidateMode: 'onChange' });
  const currentValues = form.watch();
  const mutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: { values: PublicLandingBookingFormValues; idempotencyKey: string }) => createPublicLandingBooking(values, idempotencyKey),
    onSuccess: () => { idempotencyKeyRef.current = null; },
  });

  const navigationGuard = usePublicLandingUnsavedChangesGuard(form.formState.isDirty && !mutation.isPending && !mutation.isSuccess);

  const submit = form.handleSubmit((values) => {
    if (mutation.isPending) return;
    const sameIntent = lastSubmittedValues.current !== null
      && JSON.stringify(lastSubmittedValues.current) === JSON.stringify(values)
      && idempotencyKeyRef.current !== null;
    const idempotencyKey = sameIntent ? idempotencyKeyRef.current as string : crypto.randomUUID();
    idempotencyKeyRef.current = idempotencyKey;
    lastSubmittedValues.current = { ...values };
    mutation.mutate({ values: { ...values }, idempotencyKey });
  });

  const retry = useCallback(() => {
    if (mutation.isPending) return;
    const values = lastSubmittedValues.current;
    const idempotencyKey = idempotencyKeyRef.current;
    if (values && idempotencyKey) mutation.mutate({ values, idempotencyKey });
  }, [mutation]);

  const startNewBooking = useCallback(() => {
    mutation.reset(); lastSubmittedValues.current = null; idempotencyKeyRef.current = null; form.reset(EMPTY_LANDING_BOOKING_FORM);
  }, [form, mutation]);

  // Only trusted field identifiers map to RHF; do not translate arbitrary backend messages.
  useEffect(() => {
    if (!mutation.isError || !(mutation.error instanceof PublicLandingApiRequestError) ||
        !mutation.error.validationErrors?.length) return;
    for (const issue of mutation.error.validationErrors ?? []) {
      if (['name', 'email', 'phone', 'date', 'type'].includes(issue.field)) {
        form.setError(issue.field as keyof PublicLandingBookingFormValues, { type: 'server', message: issue.message });
      }
    }
  }, [mutation.isError, mutation.error, form]);

  const canRetry = mutation.isError
    && lastSubmittedValues.current !== null
    && idempotencyKeyRef.current !== null
    && JSON.stringify(lastSubmittedValues.current) === JSON.stringify(currentValues);
  const error = mutation.error instanceof PublicLandingApiRequestError ? mutation.error : undefined;
  const errorMessage = error?.isBackendMessage
    ? error.message
    : error?.errorCode === LANDING_API_ERROR_CODES.INVALID_RESPONSE
      ? t('errors.invalidResponse')
      : error
        ? t('errors.bookingRequestFailed')
        : '';

  return { form, navigationGuard, submit, retry, canRetry, startNewBooking, isSubmitting: mutation.isPending, isSuccess: mutation.isSuccess, errorMessage, successMessage: mutation.data?.message ?? '' };
}
