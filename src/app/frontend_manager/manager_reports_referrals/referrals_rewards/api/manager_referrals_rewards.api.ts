import { MANAGER_REFERRALS_REWARDS_API } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/config/manager_referrals_rewards.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { MANAGER_REFERRALS_REWARDS_STATUS_VALUES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards.constants';
import { managerReferralSchema, managerReferralsKpiSchema } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/schemas/manager_referrals_rewards.schemas';
import type { ManagerReferral, ManagerReferralsRewardsKPIs, CreateReferralDto } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/types/manager_referrals_rewards.types';


/**
 * @description Provides the ManagerReferralsRewardsApi implementation for the referrals module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_reports_referrals/manager_referrals_schemas/ManagerReferralsRewardsSchema; @/app/frontend_manager/manager_reports_referrals/manager_referrals_url_config; @/app/frontend_manager/manager_reports_referrals/manager_referrals_types/ManagerReferralsRewardsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerReferralsRewardsApi = {
  fetchReferralKPIs: async (): Promise<ApiResponse<ManagerReferralsRewardsKPIs>> => {
    return apiFetch(MANAGER_REFERRALS_REWARDS_API.KPIS, { dataSchema: managerReferralsKpiSchema });
  },

  fetchReferrals: async (params: { page: number; limit: number; search?: string; status?: string }): Promise<ApiResponse<ManagerReferral[]>> => {
    const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== MANAGER_REFERRALS_REWARDS_STATUS_VALUES.ALL) query.set('status', params.status);
    return apiFetch(`${MANAGER_REFERRALS_REWARDS_API.BASE}?${query.toString()}`, { dataSchema: z.array(managerReferralSchema) });
  },

  createReferral: async (dto: CreateReferralDto, idempotencyKey: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(MANAGER_REFERRALS_REWARDS_API.BASE, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: managerReferralSchema
    });
  },

  claimReward: async (referralId: string, idempotencyKey: string): Promise<ApiResponse<ManagerReferral>> => {
    return apiFetch(MANAGER_REFERRALS_REWARDS_API.CLAIM(referralId), {
      method: 'POST',
      headers: { 'Idempotency-Key': idempotencyKey },
      dataSchema: managerReferralSchema
    });
  } };
