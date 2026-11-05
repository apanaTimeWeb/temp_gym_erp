// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { EMPTY_MANAGER_BUSINESS_SETTINGS } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/manager_business_settings_form_defaults.constants';
import { useManagerBusinessSettingsLogic } from '@/app/frontend_manager/manager_dashboard/business_settings/hooks/useManagerBusinessSettingsLogic';
import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_dashboard/business_settings/schemas/manager_business_settings.schemas';
import type { ManagerAllSettings, ManagerAllSettingsInput } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates settings feature state and its documented UI/API boundary through useManagerBusinessSettingsForm.
 * @dependencies Uses ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast, ManagerUnsavedChangesGuard, useManagerBusinessSettingsLogic, ManagerBusinessSettingsSchema.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerBusinessSettingsForm owns the settings feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerBusinessSettingsForm() {
  const logic = useManagerBusinessSettingsLogic();
  const form = useForm<ManagerAllSettingsInput, unknown, ManagerAllSettings>({ resolver: zodResolver(managerAllSettingsSchema), defaultValues: EMPTY_MANAGER_BUSINESS_SETTINGS });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.settings && !form.formState.isDirty) form.reset(logic.settings); }, [form, form.formState.isDirty, logic.settings]);
  useManagerInfrastructureUnsavedChangesGuard(form.formState.isDirty);
  const submit = form.handleSubmit(async (draft) => { try { const response = await logic.saveSettings(draft); form.reset(response.data ?? draft); ManagerInfrastructureShowSuccessToast(response.message, 'manager-settings-save-success'); } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, 'manager-settings-save-error'); } });
  return { ...logic, form, submit };
}
