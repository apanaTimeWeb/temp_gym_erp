"use client";
// RESPONSIBILITY: Owns all TanStack Query mutations and cache updates for Admin Blacklist.
// DATA FLOW: Blacklist confirmation/form → mutation hook → AdminBlacklistApi → TanStack Query invalidation → blacklist UI and feedback.

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_BLACKLIST_QUERY_KEYS } from '@/app/frontend_admin/admin_members/members_blacklist_management/constants/AdminMembersBlacklistManagementQueryKeys';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_members/members_blacklist_management/state/useAdminMembersBlacklistManagementStore';
import { adminToast } from '@/app/frontend_admin/admin_members/members_blacklist_management/components/feedback/AdminMembersBlacklistManagementToastService';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementIdempotencyIntentStore';
import type { BlacklistFormValues } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
/** @description useAdminBlacklistMutations: Owns all TanStack Query mutations and cache updates for Admin Blacklist. @dependencies Consumes AdminBlacklistQueryKeys, AdminBlacklistApi, useAdminBlacklistStore, AdminNavigationLayoutToastService, AdminNavigationLayoutBackendMessage, AdminNavigationLayoutIdempotencyIntentStore. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminBlacklistMutations() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const store = useAdminBlacklistStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const addMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: BlacklistFormValues; intentId: string; idempotencyKey: string }) => AdminBlacklistApi.addToBlacklist(payload, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-05f887bf44'); store.setShowModal(false); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: () => adminToast.error(t('blacklist.AdminRepair.requestFailed'), 'admin-error-1f0bf3da16'),
  });
  const removeMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminBlacklistApi.removeFromBlacklist(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-d13beab19d'); clearIntentKey(`remove-blacklist:${variables.id}`); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: () => adminToast.error(t('blacklist.AdminRepair.requestFailed'), 'admin-error-e6e7045880'),
  });
  const toggleMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; intentId: string; idempotencyKey: string }) => AdminBlacklistApi.toggleBlacklist(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-40f1704ed7'); clearIntentKey(variables.intentId); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: () => adminToast.error(t('blacklist.AdminRepair.requestFailed'), 'admin-error-547e47fc01'),
  });
  const propagateMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminBlacklistApi.propagateToAllBranches(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-52cccb7033'); clearIntentKey(`propagate-blacklist:${variables.id}`); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: () => adminToast.error(t('blacklist.AdminRepair.requestFailed'), 'admin-error-86b564e1d9'),
  });

  return { getIntentKey, clearIntentKey, addMutation, removeMutation, toggleMutation, propagateMutation };
}
