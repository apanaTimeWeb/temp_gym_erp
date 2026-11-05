/**
 * @description Provides the ManagerReferralsRewardsFilterConstants implementation for the referrals module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_REFERRAL_ALL_STATUS_FILTER = 'ALL' as const;
export const REFERRAL_STATUS_VALUES = ['PENDING', 'JOINED', 'REJECTED'] as const;
export const REFERRAL_REWARD_TYPE_VALUES = ['CASH', 'DISCOUNT', 'CREDIT'] as const;

export const MANAGER_REFERRAL_STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending Join' },
  { value: 'JOINED', label: 'Joined' },
  { value: 'REJECTED', label: 'Rejected' },
] as const;

export const REFERRAL_REWARD_STATUS_VALUES = ['PENDING', 'CLAIMED', 'N/A'] as const;
