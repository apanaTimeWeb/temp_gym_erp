// RESPONSIBILITY: Runtime API schemas for Manager referral data.
import { z } from 'zod';

import { REFERRAL_STATUS_VALUES, REFERRAL_REWARD_STATUS_VALUES, REFERRAL_REWARD_TYPE_VALUES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards_filter.constants';

/**
 * @description Provides the ManagerReferralsRewardsSchema implementation for the referrals module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerReferralSchema = z.object({
  id: z.string(), referrerName: z.string(), referrerId: z.string(), refereeName: z.string(), refereePhone: z.string(), dateReferred: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date'),
  status: z.enum(REFERRAL_STATUS_VALUES), rewardStatus: z.enum(REFERRAL_REWARD_STATUS_VALUES), rewardAmount: z.number().int().nonnegative(),
  rewardType: z.enum(REFERRAL_REWARD_TYPE_VALUES), rewardExpiryDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date').optional(), conversionDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid date').optional(), planJoined: z.string().optional() });
export const managerReferralsKpiSchema = z.object({ totalReferrals: z.number().int().nonnegative(), totalConverted: z.number().int().nonnegative(), pendingRewards: z.number().int().nonnegative(), claimedRewards: z.number().int().nonnegative(), conversionRate: z.number().min(0).max(100), totalRewardsPaidOut: z.number().int().nonnegative() });
