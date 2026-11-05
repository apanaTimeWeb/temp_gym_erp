// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_blacklist/blacklist_management/constants/AdminMembersBlacklistManagementConstants.ts)

export const BLACKLIST_MEMBER_STATUS_VALUES = { INACTIVE: 'inactive' } as const;

import type { BlacklistedMember, BlacklistKPIData, BlacklistActiveTab } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';

export const BLACKLIST_SCOPE_VALUES = {
  GLOBAL: 'global',
  SPECIFIC: 'specific',
} as const;



export const BLACKLIST_TAB_OPTIONS: { value: BlacklistActiveTab; labelKey: string }[] = [
  { value: 'all', labelKey: 'blacklist.admin_blacklist_tabs.allEntries' },
  { value: 'cross-branch', labelKey: 'blacklist.admin_blacklist_tabs.crossBranchView' },
];

export const BLACKLIST_GYM_OPTIONS = [
  { value: 'all', labelKey: 'blacklist.admin_blacklist_filters.allGyms' },
  { value: 'g1', labelKey: 'blacklist.admin_blacklist_filters.gymAndheriEast' },
  { value: 'g2', labelKey: 'blacklist.admin_blacklist_filters.gymBandraWest' },
  { value: 'g3', labelKey: 'blacklist.admin_blacklist_filters.gymPowai' },
  { value: 'g4', labelKey: 'blacklist.admin_blacklist_filters.gymThane' },
];

export const BLACKLIST_SCOPE_OPTIONS = [
  { value: 'all', labelKey: 'blacklist.admin_blacklist_filters.allScopes' },
  { value: 'global', labelKey: 'blacklist.admin_blacklist_filters.globalBan' },
  { value: 'specific', labelKey: 'blacklist.admin_blacklist_filters.gymSpecific' },
];

export const BLACKLIST_ITEMS_PER_PAGE = 10;



export const EMPTY_BLACKLIST_FORM = {
  memberId: '',
  memberName: '',
  memberPhone: '',
  memberEmail: '',
  reason: '',
  scope: 'global' as const,
  assignedGyms: ['all'],
};

export const BLACKLIST_SCOPE_STYLES = {
  global: 'bg-danger-bg text-danger-text',
  specific: 'bg-warning-bg text-warning',
} as const;

export const BLACKLIST_STATUS_STYLES = {
  active: 'bg-danger-bg text-danger-text',
  inactive: 'bg-input text-secondary',
} as const;
