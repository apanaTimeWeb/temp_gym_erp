"use client";
// RESPONSIBILITY: Coordinates role-default permissions, per-staff overrides, confirmation and query invalidation.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_permissions/permissions_management/hooks/useAdminSecurityPermissionsManagementLogic.ts)

import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_PERMISSIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementQueryKeys';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementConfirm';
import { AdminPermissionsApi } from '@/app/frontend_admin/admin_security/security_permissions_management/api/admin_security_permissions_management_api';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore';
import type { RoleType } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementTypes';
import { useAdminPermissionsMutations } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementMutations';
import { PERMISSION_FEATURES } from '@/app/frontend_admin/admin_security/security_permissions_management/constants/AdminSecurityPermissionsManagementConstants';
import { adminPermissionsChangeIntentId, adminPermissionsResetIntentId } from '@/app/frontend_admin/admin_security/security_permissions_management/utils/AdminSecurityPermissionsManagementIntentId';

/** Coordinates Permissions data and UI state while keeping server state in TanStack Query. @description Coordinates useAdminPermissionsLogic for the owning permissions_management feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminPermissionsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { activeRole, staffSearch, pendingStaffOperations, tryBeginStaffOperation, endStaffOperation, setActiveRole, setStaffSearch, setEditingStaffId } = useAdminPermissionsStore();
  // The guard lives in the module-scoped Zustand store because this hook is mounted in multiple components.
  // Check-and-set is synchronous across all instances for the whole confirm → API settlement window.
  const permissionsQuery = useQuery({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('permissions'), queryFn: () => AdminPermissionsApi.fetchPermissions(), staleTime: 300000 });
  const overridesQuery = useQuery({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('overrides'), queryFn: () => AdminPermissionsApi.fetchOverrides(), staleTime: 300000 });
  const roleDefaults = permissionsQuery.data?.data ?? [];
  const allOverrides = overridesQuery.data?.data ?? [];
  const hasActiveFilters = activeRole !== 'all' || staffSearch.trim().length > 0;

  const filteredOverrides = useMemo(() => {
    const search = staffSearch.trim().toLowerCase();
    return allOverrides.filter((item) => {
      const matchesRole = activeRole === 'all' || item.role === activeRole;
      const matchesSearch = !search || item.staffName.toLowerCase().includes(search) || item.staffId.toLowerCase().includes(search);
      return matchesRole && matchesSearch;
    });
  }, [activeRole, allOverrides, staffSearch]);

  const { updateStaffMutation, resetMutation, getIntentKey, clearIntentKey } = useAdminPermissionsMutations();
  const clearFilters = useCallback(() => { setActiveRole('all'); setStaffSearch(''); }, [setActiveRole, setStaffSearch]);

  const toggleStaffPermission = useCallback(async (staffId: string, staffName: string, permission: string, enabled: boolean) => {
    const feature = PERMISSION_FEATURES.find((item) => item.key === permission);
    if (!feature || typeof enabled !== 'boolean' || !tryBeginStaffOperation(staffId)) return false;
    const intentId = adminPermissionsChangeIntentId(staffId, permission, enabled);
    try {
      const confirmed = await confirm({
        title: t('permissions.AdminPermissionsConfirm.changeTitle'),
        message: t('permissions.AdminPermissionsConfirm.changeMessage', { permission: t(feature.labelKey), staffName }),
        confirmText: t('permissions.AdminPermissionsConfirm.changeConfirm'),
        type: 'warning',
      });
      if (!confirmed) { clearIntentKey(intentId); return false; }
      try {
        await updateStaffMutation.mutateAsync({ staffId, permission, enabled, idempotencyKey: getIntentKey(intentId) });
        return true;
      } catch {
        // Mutation hook reports a localized error; retaining the key permits an explicit retry.
        return false;
      }
    } finally {
      endStaffOperation(staffId);
    }
  }, [clearIntentKey, confirm, endStaffOperation, getIntentKey, t, tryBeginStaffOperation, updateStaffMutation]);

  const resetToDefaults = useCallback(async (staffId: string, staffName: string, role: RoleType) => {
    if (!tryBeginStaffOperation(staffId)) return false;
    const intentId = adminPermissionsResetIntentId(staffId);
    try {
      const confirmed = await confirm({ title: t('permissions.AdminPermissionsConfirm.resetTitle'), message: t('permissions.AdminPermissionsConfirm.resetMessage', { staffName, role: t(`permissions.AdminPermissionsCatalog.roles.${role}.label`) }), confirmText: t('permissions.AdminPermissionsConfirm.resetConfirm'), type: 'danger' });
      if (!confirmed) { clearIntentKey(intentId); return false; }
      try {
        await resetMutation.mutateAsync({ staffId, idempotencyKey: getIntentKey(intentId) });
        setEditingStaffId(null);
        return true;
      } catch {
        return false;
      }
    } finally {
      endStaffOperation(staffId);
    }
  }, [clearIntentKey, confirm, endStaffOperation, getIntentKey, resetMutation, setEditingStaffId, t, tryBeginStaffOperation]);

  return {
    status: permissionsQuery.status === 'error' || overridesQuery.status === 'error' ? 'error' : permissionsQuery.status === 'pending' || overridesQuery.status === 'pending' ? 'pending' : 'success',
    roleDefaults,
    overrides: filteredOverrides,
    allOverridesCount: allOverrides.length,
    hasActiveFilters,
    clearFilters,
    saving: Object.keys(pendingStaffOperations).length > 0 || updateStaffMutation.isPending || resetMutation.isPending,
    activeRole,
    staffSearch,
    toggleStaffPermission,
    resetToDefaults,
    retry: async () => { await Promise.all([permissionsQuery.refetch(), overridesQuery.refetch()]); },
    isError: permissionsQuery.isError || overridesQuery.isError,
  };
}
