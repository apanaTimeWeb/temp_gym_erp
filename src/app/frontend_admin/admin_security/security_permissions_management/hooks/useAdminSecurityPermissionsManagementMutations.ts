"use client";
// RESPONSIBILITY: Owns permission override and reset mutations for Admin Permissions.
// DATA FLOW: Permission action → mutation hook → AdminPermissionsApi → TanStack Query invalidation → permission UI and backend feedback.

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_PERMISSIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementQueryKeys';
import { AdminPermissionsApi } from '@/app/frontend_admin/admin_security/security_permissions_management/api/admin_security_permissions_management_api';
import { adminToast } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementToastService';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore';
import { adminPermissionsChangeIntentId, adminPermissionsResetIntentId } from '@/app/frontend_admin/admin_security/security_permissions_management/utils/AdminSecurityPermissionsManagementIntentId';
/** @description useAdminPermissionsMutations: Owns permission override and reset mutations for Admin Permissions. @dependencies Consumes AdminPermissionsQueryKeys, AdminPermissionsApi, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminPermissionsMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  // Unlike a per-hook ref, this module-owned registry retains the identical retry key across
  // components and remounts until success or the user explicitly abandons the intent.
  const getIntentKey = useCallback((intentId: string) => useAdminPermissionsStore.getState().getSharedIntentKey(intentId), []);
  const clearIntentKey = useCallback((intentId: string) => useAdminPermissionsStore.getState().clearSharedIntentKey(intentId), []);
  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('overrides') }),
      queryClient.invalidateQueries({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('permissions') }),
    ]);
  };
  const updateStaffMutation = useMutation({
    mutationFn: ({ staffId, permission, enabled, idempotencyKey }: { staffId: string; permission: string; enabled: boolean; idempotencyKey: string }) => AdminPermissionsApi.updateStaffPermission(staffId, { permission, enabled }, idempotencyKey),
    onSuccess: async (response, variables) => { clearIntentKey(adminPermissionsChangeIntentId(variables.staffId, variables.permission, variables.enabled)); adminToast.success(response.message, `admin_permissions-update-${variables.staffId}-${variables.permission}`); await invalidate(); },
    onError: () => adminToast.error(t('permissions.AdminPermissionsError.mutationFailed'), 'admin_permissions-update-error'),
  });
  const resetMutation = useMutation({
    mutationFn: ({ staffId, idempotencyKey }: { staffId: string; idempotencyKey: string }) => AdminPermissionsApi.resetToDefaults(staffId, idempotencyKey),
    onSuccess: async (response, variables) => { clearIntentKey(adminPermissionsResetIntentId(variables.staffId)); adminToast.success(response.message, `admin_permissions-reset-${variables.staffId}`); await invalidate(); },
    onError: () => adminToast.error(t('permissions.AdminPermissionsError.mutationFailed'), 'admin_permissions-reset-error'),
  });
  return { updateStaffMutation, resetMutation, getIntentKey, clearIntentKey };
}
