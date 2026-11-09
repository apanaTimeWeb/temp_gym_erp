// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/ManagerReferralsRewardsLocalPaginationDefaults';

import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsLocalDomainError';
import { ManagerReferralsRewardsApi } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/api/manager_referrals_rewards.api';
import { ManagerReferralsRewardsQueryKeys } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/api/manager_referrals_rewards.query_keys';

/**
 * @description Owns Manager Referrals KPI and paginated-list TanStack Query server state.
 * @dependencies Uses ManagerReferralsRewardsApi, ManagerReferralsRewardsQueryKeys, and the approved pagination default.
 * @edge-case Keeps KPI state independent from list filters so filtering does not create cache collisions.
 */
export function useManagerReferralsRewardsQueries(page: number, search: string, status: string) {
  const kpisQuery = useQuery({
    queryKey: ManagerReferralsRewardsQueryKeys.kpis(),
    queryFn: async () => {
      const res = await ManagerReferralsRewardsApi.fetchReferralKPIs();
      if (!res.success) throw new ManagerInfrastructureDomainError(res.message || 'Unable to load referral KPIs');
      return res;
    },
    staleTime: 1000 * 60 * 5,
  });
  const listQuery = useQuery({
    queryKey: ManagerReferralsRewardsQueryKeys.list({ page, search, status }),
    queryFn: async () => {
      const res = await ManagerReferralsRewardsApi.fetchReferrals({ page, limit: MANAGER_ITEMS_PER_PAGE, search, status });
      if (!res.success) throw new ManagerInfrastructureDomainError(res.message || 'Unable to load referrals');
      return res;
    },
    staleTime: 1000 * 60 * 2,
  });
  return { kpisQuery, listQuery };
}
