// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { CANCELLATIONS_ITEMS_PER_PAGE, CHURN_REASON_VALUES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import { CANCELLATIONS_WIN_BACK_TEMPLATES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import { useManagerCommunicationsCampaignsChurnRecoveryMutations } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/hooks/useManagerCommunicationsChurnRecoveryMutations';
import { useManagerCommunicationsCampaignsChurnRecoveryQueries } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/hooks/useManagerCommunicationsChurnRecoveryQueries';
import { useManagerCommunicationsCampaignsStore } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/state/useManagerCommunicationsChurnRecoveryStore';
import type { ChurnedMember, CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsCampaignsChurnRecoveryLogic.
 * @dependencies Uses useManagerCommunicationsCampaignsChurnRecoveryMutations, useManagerCommunicationsCampaignsChurnRecoveryQueries, useManagerCommunicationsCampaignsStore, ManagerCommunicationsCampaignsSharedConstants.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsCampaignsChurnRecoveryLogic owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsCampaignsChurnRecoveryLogic() {
  const store = useManagerCommunicationsCampaignsStore();
  const t = useTranslations('MANAGER_COMMUNICATIONS_CAMPAIGNS');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const [churnSearch, setChurnSearchState] = useState('');
  const rawReason = searchParams.get('c_reason') ?? 'all';
  const churnReasonFilter = rawReason === 'all' || (CHURN_REASON_VALUES as readonly string[]).includes(rawReason) ? rawReason : 'all';
  const rawPage = searchParams.get('c_page');
  const parsedPage = rawPage === null ? 1 : Number(rawPage);
  const pageSyntaxIsValid = rawPage === null || /^\d+$/.test(rawPage);
  const churnCurrentPage = pageSyntaxIsValid && Number.isSafeInteger(parsedPage) && parsedPage >= 1 ? Math.min(parsedPage, 10000) : 1;

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('c_search'); // Member names are PII and must never be persisted in browser history or referrers.
    Object.entries(params).forEach(([k, v]) => {
      if (v === null) newParams.delete(k);
      else newParams.set(k, v);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  const setChurnSearch = useCallback((s: string) => {
    setChurnSearchState(s);
    updateURL({ c_search: null, c_page: null });
  }, [setChurnSearchState, updateURL]);

  const setChurnReasonFilter = useCallback((r: string) => {
    const safeReason = (CHURN_REASON_VALUES as readonly string[]).includes(r) ? r : 'all';
    updateURL({ c_reason: safeReason === 'all' ? null : safeReason, c_page: null });
  }, [updateURL]);

  const setChurnCurrentPage = useCallback((p: number) => {
    const safePage = Number.isSafeInteger(p) ? Math.min(Math.max(1, p), 10000) : 1;
    updateURL({ c_page: safePage > 1 ? String(safePage) : null });
  }, [updateURL]);

  useEffect(() => {
    const reasonIsValid = rawReason === 'all' || (CHURN_REASON_VALUES as readonly string[]).includes(rawReason);
    const pageIsValid = rawPage === null || (/^\d+$/.test(rawPage) && Number.isSafeInteger(parsedPage) && parsedPage >= 1 && parsedPage <= 10000);
    if (searchParams.has('c_search') || !reasonIsValid || !pageIsValid) {
      updateURL({ c_search: null, c_reason: reasonIsValid && rawReason !== 'all' ? rawReason : null, c_page: pageIsValid && parsedPage > 1 ? String(parsedPage) : null });
    }
  }, [parsedPage, rawPage, rawReason, searchParams, updateURL]);

  const { churnedMembers, churnLoading, churnError, churnErrorValue, churnKPIs, churnKPIError } = useManagerCommunicationsCampaignsChurnRecoveryQueries();
  const { winBackMutation, sendWinBackMessage } = useManagerCommunicationsCampaignsChurnRecoveryMutations(store.closeChurnComposer);

  const isPending = churnLoading;
  const isError = churnError || Boolean(churnKPIError);
  const errorMessage = churnErrorValue || churnKPIError ? ManagerInfrastructureGetErrorMessage(churnErrorValue || churnKPIError, t('TEXT_GENERIC_ERROR')) : '';

  const filteredMembers = useMemo(() => {
    return churnedMembers.filter((m: ChurnedMember) => {
      const matchSearch = !churnSearch || m.name.toLowerCase().includes(churnSearch.toLowerCase());
      const matchReason = churnReasonFilter === 'all' || m.reason === churnReasonFilter;
      return matchSearch && matchReason;
    });
  }, [churnedMembers, churnSearch, churnReasonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / CANCELLATIONS_ITEMS_PER_PAGE));
  const paginatedMembers = filteredMembers.slice((churnCurrentPage - 1) * CANCELLATIONS_ITEMS_PER_PAGE, churnCurrentPage * CANCELLATIONS_ITEMS_PER_PAGE);

  const getTemplateTier = useCallback((daysSinceExit: number): WinBackTemplateTier => {
    if (daysSinceExit <= 7) return '7_days';
    if (daysSinceExit <= 30) return '30_days';
    return '90_days';
  }, []);

  const handleOpenComposer = useCallback((memberId: string) => {
    store.openChurnComposer(memberId);
  }, [store]);

  const handleSendWinBack = useCallback((
    member: ChurnedMember,
    channel: CommChannel,
    templateTier: WinBackTemplateTier,
    message: string,
    subject: string,
  ) => {
    sendWinBackMessage({ memberId: member.memberId, memberName: member.name, phone: member.phone, email: member.email, channel, templateTier, message, subject });
  }, [sendWinBackMessage]);

  const selectedMember = useMemo(
    () => churnedMembers.find((m: ChurnedMember) => m.memberId === store.selectedChurnedMemberId) ?? null,
    [churnedMembers, store.selectedChurnedMemberId],
  );

  return {
    churnKPIs,
    paginatedMembers,
    filteredMembers,
    isPending, isError, errorMessage,
    totalPages,
    churnSearch,
    setChurnSearch,
    churnReasonFilter,
    setChurnReasonFilter,
    churnCurrentPage,
    setChurnCurrentPage,
    isChurnComposerOpen: store.isChurnComposerOpen,
    openChurnComposer: handleOpenComposer,
    closeChurnComposer: store.closeChurnComposer,
    selectedMember,
    handleSendWinBack,
    isSending: winBackMutation.isPending,
    getTemplateTier,
    CANCELLATIONS_WIN_BACK_TEMPLATES };
}
