// RESPONSIBILITY: Owns Contact form state, validation, mutation lifecycle, idempotent retry, and dirty-state protection.
// DATA FLOW: Form → RHF/Zod → API client → canonical backend response → user-visible success/error.
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPublicLandingContactMessage } from '@/app/frontend_public/public_landing/landing_contact/api/PublicLandingContactApi';
import { PublicLandingContactSchema } from '@/app/frontend_public/public_landing/landing_contact/schemas/PublicLandingContactSchema';
import { EMPTY_LANDING_CONTACT_FORM } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactFormConstants';
import { LANDING_API_ERROR_CODES } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactApiErrorConstants';
import { PublicLandingApiRequestError } from '@/app/frontend_public/public_landing/landing_contact/types/PublicLandingContactTypes';
import { usePublicLandingUnsavedChangesGuard } from '@/app/frontend_public/public_landing/landing_contact/hooks/usePublicLandingContactUnsavedChangesGuard';
import type { PublicLandingContactFormValues } from '@/app/frontend_public/public_landing/landing_contact/types/PublicLandingContactTypes';

/** Orchestrates the contact workflow without rendering JSX.
 * @dependencies RHF, Zod, TanStack Query mutation state, PublicLanding contact API, translations, and dirty-form guard.
 * @edge-case One idempotency key is generated per valid submit intent and reused for retry; it resets only after success or explicit start-new.
 */
export function usePublicLandingContactForm() {
  const t = useTranslations('LANDING');
  const lastSubmittedValues = useRef<PublicLandingContactFormValues | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<PublicLandingContactFormValues>({ defaultValues: EMPTY_LANDING_CONTACT_FORM, resolver: zodResolver(PublicLandingContactSchema), mode: 'onBlur', reValidateMode: 'onChange' });
  const currentValues = form.watch();
  const mutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: { values: PublicLandingContactFormValues; idempotencyKey: string }) => createPublicLandingContactMessage(values, idempotencyKey),
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

  const startNewMessage = useCallback(() => {
    mutation.reset(); lastSubmittedValues.current = null; idempotencyKeyRef.current = null; form.reset(EMPTY_LANDING_CONTACT_FORM);
  }, [form, mutation]);

  // Only trusted field identifiers map to RHF; do not translate arbitrary backend messages.
  useEffect(() => {
    if (!mutation.isError || !(mutation.error instanceof PublicLandingApiRequestError) ||
        !mutation.error.validationErrors?.length) return;
    for (const issue of mutation.error.validationErrors ?? []) {
      if (['name', 'email', 'message'].includes(issue.field)) {
        form.setError(issue.field as keyof PublicLandingContactFormValues, { type: 'server', message: issue.message });
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
        ? t('errors.contactRequestFailed')
        : '';

  return { form, navigationGuard, submit, retry, canRetry, startNewMessage, isSubmitting: mutation.isPending, isSuccess: mutation.isSuccess, errorMessage, successMessage: mutation.data?.message ?? '' };
}
