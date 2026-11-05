/** Canonical module-level constant registry for manager_plans; child constant files remain the source of individual entries. */
export const ManagerMembershipLifecycleConstants = {} as const;
export const MANAGER_MEMBERSHIP_LIFECYCLE_ACTIVE_MEMBER_STATUS = 'ACTIVE' as const;

export const MANAGER_MEMBERSHIP_LIFECYCLE_PENDING_REQUEST_STATUS = 'PENDING' as const;

export const MANAGER_MEMBERSHIP_LIFECYCLE_TIER_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_TIERS' },
  { value: 'BASIC', labelKey: 'COPY_BASIC_1' },
  { value: 'GOLD', labelKey: 'COPY_GOLD_2' },
  { value: 'PREMIUM', labelKey: 'COPY_PREMIUM_2' },
] as const;

export const MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', labelKey: 'COPY_ALL_STATUS' },
  { value: 'ACTIVE', labelKey: 'COPY_ACTIVE_2' },
  { value: 'INACTIVE', labelKey: 'COPY_INACTIVE_2' },
] as const;

export const MANAGER_MEMBERSHIP_LIFECYCLE_STATUS_VALUES = {
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN',
  PENDING: 'PENDING',

  ALL: 'ALL',
} as const;

export const MANAGER_MEMBERSHIP_LIFECYCLE_TIER_STYLES: Record<string, { bg: string; text: string; labelKey: string }> = {
  BASIC: { bg: 'bg-info-bg', text: 'text-info-text', labelKey: 'COPY_BASIC_2' },
  GOLD: { bg: 'bg-warning-bg', text: 'text-warning-text', labelKey: 'COPY_GOLD_1' },
  PREMIUM: { bg: 'bg-primary-subtle', text: 'text-primary', labelKey: 'COPY_PREMIUM_1' },
};
