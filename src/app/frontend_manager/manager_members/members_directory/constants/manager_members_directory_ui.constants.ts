// RESPONSIBILITY: Owns Members UI status, cycle, and filter option constants.
import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';

/**
 * @description Provides the ManagerMembersDirectoryUiConstants implementation for the members module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MEMBERS_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: 'bg-success-bg', text: 'text-success-text' },
  PENDING: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  EXPIRED: { bg: 'bg-danger-bg', text: 'text-danger-text' },
  FROZEN: { bg: 'bg-info-bg', text: 'text-info-text' },
  SUSPENDED: { bg: 'bg-danger-bg', text: 'text-danger-text' },
  BANNED: { bg: 'bg-danger-bg', text: 'text-danger-text' } };

export const MEMBERS_CYCLE_LABELS: Record<string, string> = {
 ONE_MONTH: 'COPY_ONE_MONTH',
 THREE_MONTHS: 'COPY_THREE_MONTHS',
 SIX_MONTHS: 'COPY_SIX_MONTHS',
 TWELVE_MONTHS: 'COPY_TWELVE_MONTHS',
 CUSTOM: 'COPY_CUSTOM_DAYS_1',
 Monthly: 'COPY_ONE_MONTH',
 Quarterly: 'COPY_THREE_MONTHS',
 Semiannual: 'COPY_SIX_MONTHS',
 Annual: 'COPY_TWELVE_MONTHS' };

export const MEMBER_STATUS_OPTIONS = [
  { label: 'All Status', labelKey: 'COPY_ALL_STATUS', value: 'All' },
  { label: 'Active', labelKey: 'COPY_ACTIVE', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE },
  { label: 'Pending', labelKey: 'COPY_PENDING', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PENDING },
  { label: 'Expired', labelKey: 'COPY_EXPIRED', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.EXPIRED },
  { label: 'Frozen', labelKey: 'COPY_FROZEN', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.FROZEN },
  { label: 'Suspended', labelKey: 'COPY_SUSPENDED', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.SUSPENDED },
  { label: 'Banned', labelKey: 'COPY_BANNED', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.BANNED }
];

/** Gender filter options for the Members toolbar (Rule 3B — centralized for API query param support). */

export const MEMBER_GENDER_OPTIONS = [
  { label: 'All Genders', labelKey: 'COPY_ALL_GENDERS', value: 'All' },
  { label: 'Male', labelKey: 'COPY_MALE', value: 'MALE' },
  { label: 'Female', labelKey: 'COPY_FEMALE', value: 'FEMALE' },
  { label: 'Other', labelKey: 'COPY_OTHER', value: 'OTHER' },
];

export const MEMBER_PAYMENT_METHOD_OPTIONS = [
  { value: 'UPI', labelKey: 'COPY_UPI' },
  { value: 'CARD', labelKey: 'COPY_CARD' },
  { value: 'CASH', labelKey: 'COPY_CASH' },
  { value: 'NET_BANKING', labelKey: 'COPY_NET_BANKING' },
] as const;

export const MEMBER_RENEW_PAYMENT_METHOD_OPTIONS = [
  { value: 'UPI', labelKey: 'COPY_UPI' },
  { value: 'Cash', labelKey: 'COPY_CASH' },
  { value: 'Card', labelKey: 'COPY_CARD' },
  { value: 'NetBanking', labelKey: 'COPY_NET_BANKING' },
] as const;
