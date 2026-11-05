/** Canonical module-level constant registry for manager_referrals; child constant files remain the source of individual entries. */
export const ManagerReferralsRewardsConstants = {
  allStatusFilter: 'ALL',
  defaultPageSize: 10,
} as const;

export const MANAGER_REFERRAL_STATUS_JOINED = 'JOINED' as const;
export const MANAGER_REFERRAL_STATUS_REJECTED = 'REJECTED' as const;
export const MANAGER_REFERRAL_REWARD_STATUS_PENDING = 'PENDING' as const;
export const MANAGER_REFERRAL_REWARD_STATUS_CLAIMED = 'CLAIMED' as const;

export const MANAGER_REFERRALS_REWARDS_STATUS_VALUES = {
  ALL: 'ALL',
  PENDING: 'PENDING',
  JOINED: 'JOINED',
  REJECTED: 'REJECTED',
} as const;
