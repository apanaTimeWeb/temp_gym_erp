"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation, mutation lifecycle, cache invalidation, and unsaved-change handling for Admin Settings forms.
// DATA FLOW: Settings view → section-specific hook → Zod resolver → settings API → TanStack Query invalidation → visible toast.

import { useCallback } from 'react';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api';
import { useAdminSettingsSectionForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementSectionForm';
import {
  AppIntegrationSettingsSchema,
  GeneralSettingsFormSchema,
  GstTaxSettingsSchema,
  GymProfileSchema,
  NotificationsSettingsSchema,
  PaymentGatewaySettingsSchema,
} from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';
import type {
  AppIntegrationSettingsType,
  GeneralSettingsType,
  GeneralSettingsFormType,
  GstTaxSettingsType,
  GymProfileType,
  NotificationsSettingsType,
  PaymentGatewaySettingsType,
} from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';

/**
 * useAdminSettingsSectionForm owns the isolated Admin data flow for this feature hook, including query state, mutations, and user-visible recovery behavior.
 * @remarks Server data remains in TanStack Query; UI-only state remains module-owned.
 * @description Manages the shared Admin Settings React Hook Form orchestration used by each settings section.
 * @dependencies Uses the module-owned Settings API client, mutation hook, schemas, and unsaved-changes guard.
 * @edge-case Preserves dirty form state after failed requests and reuses one idempotency key per user intent.
 */
/** @description Owns the General Settings form lifecycle and validation contract. @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard. @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsGeneralForm(initialData: GeneralSettingsType) {
  // The response schema includes 2FA status, but this generic form must never submit it.
  const editableInitialData = GeneralSettingsFormSchema.parse(initialData);
  const formState = useAdminSettingsSectionForm<GeneralSettingsFormType>(
    editableInitialData,
    GeneralSettingsFormSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ general: GeneralSettingsFormSchema.parse(data) }, idempotencyKey),
    'settings-general-save',
  );

  // Sanitize even programmatic callers that bypass React Hook Form's resolver.
  const submitGeneralForm = useCallback(
    (data: GeneralSettingsFormType) => formState.submitForm(GeneralSettingsFormSchema.parse(data)),
    [formState.submitForm],
  );

  return { ...formState, submitForm: submitGeneralForm };
}

/** @description Owns the GST/tax Settings form lifecycle and validation contract. @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard. @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsGstForm(initialData: GstTaxSettingsType) {
  return useAdminSettingsSectionForm<GstTaxSettingsType>(
    initialData,
    GstTaxSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ gst: data }, idempotencyKey),
    'settings-gst-save',
  );
}

/** @description Owns the Gym Profile Settings form lifecycle and validation contract. @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard. @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsGymProfileForm(initialData: GymProfileType) {
  return useAdminSettingsSectionForm<GymProfileType>(
    initialData,
    GymProfileSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ profile: data }, idempotencyKey),
    'settings-profile-save',
  );
}

/** @description Owns the notification-preference Settings form lifecycle and validation contract. @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard. @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsNotificationsForm(initialData: NotificationsSettingsType) {
  return useAdminSettingsSectionForm<NotificationsSettingsType>(
    initialData,
    NotificationsSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ notifications: data }, idempotencyKey),
    'settings-notifications-save',
  );
}

/** @description Owns the payment-gateway Settings form lifecycle and validation contract. @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard. @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsPaymentGatewayForm(initialData: PaymentGatewaySettingsType) {
  return useAdminSettingsSectionForm<PaymentGatewaySettingsType>(
    initialData,
    PaymentGatewaySettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ payment: data }, idempotencyKey),
    'settings-payment-save',
  );
}

/** @description Owns the application-integration Settings form lifecycle and validation contract. @dependencies Uses the module Zod schema, Settings API mutation hook, and feature unsaved-change guard. @edge-case Preserves dirty values and idempotency-key continuity when the API rejects a save. @param initialData - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsAppIntegrationForm(initialData: AppIntegrationSettingsType) {
  return useAdminSettingsSectionForm<AppIntegrationSettingsType>(
    initialData,
    AppIntegrationSettingsSchema,
    (data, idempotencyKey) => AdminSettingsApi.updateSettings({ integration: data }, idempotencyKey),
    'settings-integration-save',
  );
}
