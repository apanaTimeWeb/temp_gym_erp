// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsLocalDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsLocalGetErrorMessage';

import { MANAGER_REFERRALS_REWARDS_STATUS_VALUES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import { MANAGER_REFERRAL_ALL_STATUS_FILTER } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards_filter.constants';
import { useManagerReferralsRewardsMutations } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsMutations';
import { useManagerReferralsRewardsQueries } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/hooks/useManagerReferralsRewardsQueries';
import { useManagerReferralsRewardsStore } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/state/useManagerReferralsRewardsStore';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates referrals feature state and its documented UI/API boundary through useManagerReferralsRewardsLogic.
 * @dependencies Uses ManagerDebounce, ManagerIdempotency, ManagerPaginationDefaults, ManagerInfrastructureShowSuccessToast and ManagerInfrastructureShowErrorToast.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/**
 * @description Owns Manager Referrals list state, referral actions, and feature-local business flow coordination.
 * @dependencies Uses Manager Referrals query/mutation hooks, permissions/confirmation infrastructure, and module translations.
 * @edge-case Preserves loading, empty, error, retry, cancellation, and repeated-action behavior without owning API transport.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerReferralsRewardsLogic owns the referrals feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerReferralsRewardsLogic() {
  const t = useTranslations('MANAGER_REFERRALS_REWARDS');
  const store = useManagerReferralsRewardsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQueryState] = useState('');
  const requestedStatus = searchParams.get('status') ?? MANAGER_REFERRAL_ALL_STATUS_FILTER;
  const allowedStatuses = Object.values(MANAGER_REFERRALS_REWARDS_STATUS_VALUES) as string[];
  const statusFilter = allowedStatuses.includes(requestedStatus) ? requestedStatus : MANAGER_REFERRAL_ALL_STATUS_FILTER;
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    updateUrl({ page: null });
  }, [updateUrl]);
  const setStatusFilter = useCallback((status: string) => {
    updateUrl({ status: status === MANAGER_REFERRALS_REWARDS_STATUS_VALUES.ALL ? null : status, page: null });
  }, [updateUrl]);
  const setCurrentPage = useCallback((page: number) => {
    const nextPage = Math.max(1, page);
    updateUrl({ page: nextPage > 1 ? String(nextPage) : null });
  }, [updateUrl]);

  const debouncedSearch = useManagerInfrastructureDebounce(searchQuery, 300);
  const page = currentPage;
  const status = statusFilter;
  const { kpisQuery, listQuery: referralsQuery } = useManagerReferralsRewardsQueries(page, debouncedSearch, status);
  const kpis = kpisQuery.data?.data ?? null;
  const isKpisLoading = kpisQuery.isPending;
  const isKpisError = kpisQuery.isError;
  const referrals = referralsQuery.data?.data ?? [];
  const totalPages = (referralsQuery.data && 'meta' in referralsQuery.data ? referralsQuery.data.meta?.totalPages : 1) ?? 1;

  const referralMutations = useManagerReferralsRewardsMutations();

  return {
    kpis,
    isKpisLoading, isKpisError, reloadKpis: kpisQuery.refetch,
    referrals,
    isReferralsLoading: referralsQuery.isPending,
    isReferralsError: referralsQuery.isError,
    errorMessage: referralsQuery.error ? ManagerInfrastructureGetErrorMessage(referralsQuery.error, t('TEXT_GENERIC_ERROR')) : '',
    reloadReferrals: referralsQuery.refetch,
    
    // Store proxies
    isAddModalOpen: store.isAddModalOpen,
    setIsAddModalOpen: store.setIsAddModalOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,

    // Actions
    createReferral: referralMutations.createReferral,
    isCreating: referralMutations.isCreating,
    claimReward: referralMutations.claimReward,
    isClaiming: referralMutations.isClaiming,
  };
}
