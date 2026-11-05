// RESPONSIBILITY: TypeScript types for the Manager Referrals module.
// HIGHLY RECOMMENDED additions: rewardType, rewardExpiryDate, conversionDate, planJoined,
// conversionRate, totalRewardsPaidOut.

import type { REFERRAL_STATUS_VALUES, REFERRAL_REWARD_STATUS_VALUES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/constants/manager_referrals_rewards_filter.constants';
export type ReferralStatus = typeof REFERRAL_STATUS_VALUES[number];
export type RewardStatus = typeof REFERRAL_REWARD_STATUS_VALUES[number];
export type RewardType = 'CASH' | 'DISCOUNT' | 'CREDIT';

export interface ManagerReferral {
  id: string;
  referrerName: string;
  referrerId: string;
  refereeName: string;
  refereePhone: string;
  dateReferred: string;
  status: ReferralStatus;
  rewardStatus: RewardStatus;
  rewardAmount: number;
  // HIGHLY RECOMMENDED — needed for complete referral tracking
  rewardType: RewardType;
  rewardExpiryDate?: string;    // when the reward expires if unclaimed
  conversionDate?: string;      // date the referee actually joined
  planJoined?: string;          // which plan the referee enrolled in
}

export interface ManagerReferralsRewardsKPIs {
  totalReferrals: number;
  totalConverted: number;
  pendingRewards: number;
  claimedRewards: number;
  // HIGHLY RECOMMENDED — key SaaS metrics
  conversionRate: number;       // percentage e.g. 42.5
  totalRewardsPaidOut: number;  // total INR paid out as rewards
}

export interface CreateReferralDto {
  referrerName: string;
  referrerId: string;
  refereeName: string;
  refereePhone: string;
}
