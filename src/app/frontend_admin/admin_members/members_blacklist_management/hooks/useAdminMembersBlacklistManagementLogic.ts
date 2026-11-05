"use client";
import { normalizeAdminMembersBlacklistManagementUrlPage } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementUrlPage';
// RESPONSIBILITY: Business logic hook for the Blacklist module.
// DATA FLOW: feature API/schema → hook/context → useAdminBlacklistLogic consumers.

import { ADMIN_BLACKLIST_QUERY_KEYS } from '@/app/frontend_admin/admin_members/members_blacklist_management/constants/AdminMembersBlacklistManagementQueryKeys';

import { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_members/members_blacklist_management/api/admin_members_blacklist_management_api';
import { useTranslations } from 'next-intl';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_members/members_blacklist_management/state/useAdminMembersBlacklistManagementStore';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementUrlQuerySync';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementConfirm';
import { BLACKLIST_ITEMS_PER_PAGE, EMPTY_BLACKLIST_FORM } from '@/app/frontend_admin/admin_members/members_blacklist_management/constants/AdminMembersBlacklistManagementConstants';
import type { BlacklistFormValues, BlacklistedMember, BlacklistScope } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
import { adminBlacklistToggleIntent } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementToggleIntent';
import { useAdminBlacklistMutations } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementMutations';
import { useAdminBlacklistDebounce } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementDebounce';
import type { AdminConfirmOptions } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementConfirmTypes';
/** @description useAdminBlacklistLogic: Business logic hook for the Blacklist module. @dependencies Consumes AdminBlacklistQueryKeys, AdminBlacklistApi, useAdminBlacklistStore, useAdminNavigationLayoutUrlQuerySync, useAdminNavigationLayoutConfirm, AdminBlacklistConstants. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminBlacklistLogic() {
  const t = useTranslations();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { activeTab, setActiveTab, showModal, setShowModal, form, setForm, search, scopeFilter, gymFilter, currentPage, setCurrentPage, operationPending: sharedPending } = useAdminBlacklistStore();
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => useAdminBlacklistStore.getState().setSearch(val as string) },
    { key: 'scope', value: scopeFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || val === 'global' || val === 'specific') useAdminBlacklistStore.getState().setScopeFilter(val); } },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: (val) => useAdminBlacklistStore.getState().setGymFilter(val as string) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(normalizeAdminMembersBlacklistManagementUrlPage(value)) },
  ]);

  const debouncedSearch = useAdminBlacklistDebounce(search, 300);
  const queryParams = { page: currentPage, limit: BLACKLIST_ITEMS_PER_PAGE, search: debouncedSearch || undefined, scope: scopeFilter === 'all' ? undefined : (scopeFilter as BlacklistScope), gymId: gymFilter === 'all' ? undefined : gymFilter };
  const blacklistQuery = useQuery({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list', queryParams), queryFn: () => AdminBlacklistApi.fetchBlacklist(queryParams), staleTime: 1000 * 60 * 2 });
  const crossGymQuery = useQuery({
    queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym', { page: currentPage, limit: BLACKLIST_ITEMS_PER_PAGE }),
    queryFn: () => AdminBlacklistApi.fetchBlacklist({ page: currentPage, limit: BLACKLIST_ITEMS_PER_PAGE, scope: 'specific' }),
    staleTime: 1000 * 60 * 2,
  });

  const kpiQuery = useQuery({
    queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis'),
    queryFn: () => AdminBlacklistApi.fetchKPIs().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const kpis = kpiQuery.data;
  const membersData = blacklistQuery.data?.data ?? [];
  const totalItems = blacklistQuery.data?.meta?.total ?? membersData.length;
  const status = blacklistQuery.status;
  const paginated = membersData;
  const gymSpecificEntries = (crossGymQuery.data?.data ?? []).filter((m: BlacklistedMember) => m.scope === 'specific');

  const { getIntentKey, clearIntentKey, addMutation, removeMutation, toggleMutation, propagateMutation } = useAdminBlacklistMutations();

  // A single confirmed blacklist write at a time. The lock includes the dialog phase.
  const inFlightRef = useRef(false);
  const [operationPending, setOperationPending] = useState(false);
  const runConfirmed = useCallback(async (intentId: string, options: AdminConfirmOptions, submit: () => Promise<unknown>): Promise<boolean> => {
    if (inFlightRef.current) return false;
    // Zustand's synchronous guard spans the separate hook instances mounted by table/modal/cross-gym.
    if (!useAdminBlacklistStore.getState().tryBeginOperation()) return false;
    inFlightRef.current = true;
    setOperationPending(true);
    let submitted = false;
    try {
      const approved = await confirm(options);
      if (!approved) {
        clearIntentKey(intentId);
        return false;
      }
      submitted = true;
      // mutateAsync settles only after the API response; keep idempotency on failure.
      await submit();
      return true;
    } catch {
      if (!submitted) clearIntentKey(intentId);
      // The mutation layer presents a localized failure message without raw server details.
      return false;
    } finally {
      inFlightRef.current = false;
      useAdminBlacklistStore.getState().endOperation();
      setOperationPending(false);
    }
  }, [confirm, clearIntentKey]);

  const openAdd = useCallback(() => { if (inFlightRef.current || useAdminBlacklistStore.getState().operationPending) return; setForm(EMPTY_BLACKLIST_FORM); setShowModal(true); }, [setForm, setShowModal]);

  const saveBlacklist = useCallback(async (data: BlacklistFormValues, onValidationError?: (error: unknown) => void) => {
    const intentId = `add-blacklist:${JSON.stringify({ memberId: data.memberId, memberName: data.memberName, memberPhone: data.memberPhone, memberEmail: data.memberEmail, reason: data.reason, scope: data.scope, assignedGyms: [...data.assignedGyms].sort() })}`;
    return runConfirmed(intentId, {
      title: t('blacklist.AdminBlacklistConfirm.addTitle'),
      message: t('blacklist.AdminBlacklistConfirm.addMessage', { name: data.memberName }),
      confirmText: t('blacklist.AdminBlacklistConfirm.addConfirm'),
      type: 'danger',
    }, () => addMutation.mutateAsync({ payload: data, intentId, idempotencyKey: getIntentKey(intentId) }, { onError: onValidationError }));
  }, [addMutation, getIntentKey, runConfirmed, t]);

  const removeFromBlacklist = useCallback(async (id: string, name: string) => {
    if (!id.trim()) return false;
    const intentId = `remove-blacklist:${id}`;
    return runConfirmed(intentId, {
      title: t('blacklist.AdminBlacklistConfirm.removeTitle'),
      message: t('blacklist.AdminBlacklistConfirm.removeMessage', { name }),
      confirmText: t('blacklist.AdminBlacklistConfirm.removeConfirm'), type: 'danger',
    }, () => removeMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) }));
  }, [runConfirmed, removeMutation, getIntentKey, t]);

  const toggleBlacklist = useCallback(async (id: string) => {
    const target = membersData.find((member) => member.id === id);
    if (!target) return false;
    const nextAction = target.isActive ? 'restore' : 'blacklist';
    const intentId = adminBlacklistToggleIntent(id, nextAction);
    return runConfirmed(intentId, {
      title: nextAction === 'blacklist' ? t('blacklist.AdminBlacklistConfirm.addTitle') : t('blacklist.AdminBlacklistConfirm.restoreTitle'),
      message: nextAction === 'blacklist'
        ? t('blacklist.AdminBlacklistConfirm.addMessage', { name: target.memberName })
        : t('blacklist.AdminBlacklistConfirm.restoreMessage', { name: target.memberName }),
      confirmText: nextAction === 'blacklist' ? t('blacklist.AdminBlacklistConfirm.addConfirm') : t('blacklist.AdminBlacklistConfirm.restoreConfirm'),
      type: 'danger',
    }, () => toggleMutation.mutateAsync({ id, intentId, idempotencyKey: getIntentKey(intentId) }));
  }, [runConfirmed, getIntentKey, membersData, toggleMutation, t]);

  const propagateToAllBranches = useCallback(async (id: string, name: string) => {
    if (!id.trim()) return false;
    const target = membersData.find((member) => member.id === id);
    if (target?.scope === 'global') return false;
    const intentId = `propagate-blacklist:${id}`;
    return runConfirmed(intentId, {
      title: t('blacklist.AdminBlacklistConfirm.propagateTitle'),
      message: t('blacklist.AdminBlacklistConfirm.propagateMessage', { name }),
      confirmText: t('blacklist.AdminBlacklistConfirm.propagateConfirm'), type: 'danger',
    }, () => propagateMutation.mutateAsync({ id, idempotencyKey: getIntentKey(intentId) }));
  }, [runConfirmed, getIntentKey, membersData, propagateMutation, t]);

  return {
    members: paginated, allMembers: paginated, gymSpecificEntries, status, error: blacklistQuery.error, retry: () => blacklistQuery.refetch(), kpis, kpiStatus: kpiQuery.status, kpiError: kpiQuery.error, retryKpis: () => kpiQuery.refetch(), crossGymStatus: crossGymQuery.status, crossGymError: crossGymQuery.error, retryCrossGym: () => crossGymQuery.refetch(),
    activeTab, setActiveTab,
    showModal, setShowModal, form, openAdd, saveBlacklist,
    removeFromBlacklist, toggleBlacklist, propagateToAllBranches,
    saving: operationPending || sharedPending || addMutation.isPending,
    propagating: operationPending || sharedPending || propagateMutation.isPending,
    currentPage, setCurrentPage, totalPages: Math.max(1, Math.ceil(totalItems / BLACKLIST_ITEMS_PER_PAGE)), totalItems,
    crossGymTotalItems: crossGymQuery.data?.meta?.total ?? (crossGymQuery.data?.data?.length ?? 0),
    crossGymTotalPages: Math.max(1, Math.ceil((crossGymQuery.data?.meta?.total ?? (crossGymQuery.data?.data?.length ?? 0)) / BLACKLIST_ITEMS_PER_PAGE)),
  };
}
