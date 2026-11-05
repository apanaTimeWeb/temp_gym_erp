"use client";
// RESPONSIBILITY: Shared module-local React Hook Form lifecycle for settings sections.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_settings/settings_management/hooks/useAdminSettingsManagementSectionForm.ts)

import { useCallback, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch, type FieldValues, type DefaultValues, type UseFormReturn } from 'react-hook-form';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api';
import { useAdminSettingsUnsavedChangesGuard } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementUnsavedChangesGuard';
import { useAdminSettingsMutation } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementMutation';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementIdempotencyIntentStore';
import type { ZodType } from 'zod';
import { applyAdminSettingsManagementApiValidationErrors } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementApiResponse';

/** Owns React Hook Form state, validation, mutation lifecycle, cache invalidation, and unsaved-change handling. Failed saves preserve dirty values and idempotency keys; a successful save establishes the new clean baseline. @description Coordinates useAdminSettingsSectionForm for the owning settings_management feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @param schema - Input consumed by this hook as declared by its TypeScript signature. @param submit - Input consumed by this hook as declared by its TypeScript signature. @param toastId - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminSettingsSectionForm<TFormValues extends FieldValues>(
  initialData: TFormValues,
  schema: ZodType<TFormValues>,
  submit: (data: TFormValues, idempotencyKey: string) => ReturnType<typeof AdminSettingsApi.updateSettings>,
  toastId: string,
) {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData as DefaultValues<TFormValues>,
  });
  const formValues = useWatch({ control: form.control });

  useAdminSettingsUnsavedChangesGuard(form.formState.isDirty);

  const mutation = useAdminSettingsMutation(submit, toastId);
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const activeSaveRef = useRef(false);
  const submitForm = useCallback(async (data: TFormValues) => {
    // Do not start a second settings write until the current one has settled.
    if (activeSaveRef.current) return false;
    activeSaveRef.current = true;
    const intentId = `${toastId}:${JSON.stringify(data)}`;
    const idempotencyKey = getAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
    try {
      // Await the actual API outcome. Errors must propagate to the caller rather than
      // being mistaken for a completed save when a confirm() Promise resolves.
      await mutation.mutateAsync({ data, idempotencyKey });
      // Don't discard user edits made while the request was in flight.
      if (JSON.stringify(form.getValues()) === JSON.stringify(data)) {
        form.reset(data);
      }
      // If the user edited during the request, keep the newer values untouched.
      // The next explicit save can then persist them without losing work.
      clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId);
      return true;
    } catch (error) {
      applyAdminSettingsManagementApiValidationErrors(error, form.getValues(), form.setError);
      throw error;
    } finally {
      activeSaveRef.current = false;
    }
  }, [form, mutation, toastId]);

  return { form: form as UseFormReturn<TFormValues>, formValues, mutation, submitForm };
}

