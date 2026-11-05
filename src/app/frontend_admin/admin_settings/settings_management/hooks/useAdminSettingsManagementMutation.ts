"use client";
// RESPONSIBILITY: Owns one Admin Settings section mutation lifecycle while the caller owns form state.
// DATA FLOW: Settings form submission → mutation hook → AdminSettingsApi → TanStack Query invalidation → Settings UI and backend feedback.

import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementQueryKeys';
import { adminToast } from '@/app/frontend_admin/admin_settings/settings_management/components/feedback/AdminSettingsManagementToastService';
import type { FieldValues } from 'react-hook-form';
import type { AdminSettingsMutationSubmit, AdminSettingsMutationVariables } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementMutationTypes';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api';


/** @description useAdminSettingsMutation: Owns one Admin Settings section mutation lifecycle while the caller owns form state. @dependencies Consumes AdminSettingsQueryKeys, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminSettingsApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @param submit - Input consumed by this hook as declared by its TypeScript signature. @param toastId - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSettingsMutation<TFormValues extends FieldValues>(submit: AdminSettingsMutationSubmit<TFormValues>, toastId: string) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, idempotencyKey }: AdminSettingsMutationVariables<TFormValues>) => submit(data, idempotencyKey),
    onSuccess: (res) => { adminToast.success(res.message, toastId); void queryClient.invalidateQueries({ queryKey: ADMIN_SETTINGS_QUERY_KEYS.key() }); },
    onError: () => adminToast.error(t('settings.AdminRepair.requestFailed'), toastId),
  });
}
