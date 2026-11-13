// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_members/members_directory/constants/AdminMembersDirectoryConstants.ts)

export const ADMIN_MEMBERS_ITEMS_PER_PAGE = 10;

export const MEMBER_STATUS_VALUES = { ACTIVE: 'active', EXPIRED: 'expired', PENDING: 'pending', FROZEN: 'frozen' } as const;

export const MEMBER_STATUS_OPTIONS = [
  { value: 'all', labelKey: 'members.AdminMembersCatalog.status.all' },
  { value: 'active', labelKey: 'members.AdminMembersCatalog.status.active' },
  { value: 'expired', labelKey: 'members.AdminMembersCatalog.status.expired' },
  { value: 'pending', labelKey: 'members.AdminMembersCatalog.status.pending' },
  { value: 'frozen', labelKey: 'members.AdminMembersCatalog.status.frozen' },
] as const;

export const MEMBER_EXPIRY_FILTER_OPTIONS = [
  { value: 'all', labelKey: 'members.AdminMembersCatalog.expiry.all' },
  { value: 'this_week', labelKey: 'members.AdminMembersCatalog.expiry.thisWeek' },
  { value: 'this_month', labelKey: 'members.AdminMembersCatalog.expiry.thisMonth' },
  { value: 'next_month', labelKey: 'members.AdminMembersCatalog.expiry.nextMonth' },
  { value: 'expired', labelKey: 'members.AdminMembersCatalog.expiry.expired' },
  { value: 'custom', labelKey: 'members.AdminMembersCatalog.expiry.custom' },
] as const;

export const MEMBER_STATUS_STYLES: Record<string, string> = {
  active: 'bg-success-bg text-success',
  expired: 'bg-danger-bg text-danger',
  pending: 'bg-warning-bg text-warning',
  frozen: 'bg-info-bg text-info',
};

export const MEMBER_STATUS_LABEL_KEYS: Record<string, string> = {
  active: 'members.AdminMembersCatalog.status.active',
  expired: 'members.AdminMembersCatalog.status.expired',
  pending: 'members.AdminMembersCatalog.status.pending',
  frozen: 'members.AdminMembersCatalog.status.frozen',
};

export const MEMBER_TABLE_HEADER_KEYS = [
  'members.AdminMembersCatalog.table.member',
  'members.AdminMembersCatalog.table.branch',
  'members.AdminMembersCatalog.table.plan',
  'members.AdminMembersCatalog.table.joinDate',
  'members.AdminMembersCatalog.table.status',
  'members.AdminMembersCatalog.table.expiry',
  'members.AdminMembersCatalog.table.outstanding',
] as const;

export const EXPIRY_FILTER_OPTIONS = MEMBER_EXPIRY_FILTER_OPTIONS;



export const MEMBER_GENDER_OPTIONS = [
  { value: 'all', labelKey: 'members.admin_members_toolbar.remaining_allGenders' },
  { value: 'Male', labelKey: 'members.AdminAuditRepair.male' },
  { value: 'Female', labelKey: 'members.AdminAuditRepair.female' },
  { value: 'Other', labelKey: 'members.AdminAuditRepair.other' },
] as const;

export const MEMBER_PLAN_OPTIONS = [
  { value: 'all', labelKey: 'members.admin_members_toolbar.remaining_allPlans' },
  { value: 'basic', labelKey: 'members.admin_members_toolbar.remaining_monthlyBasic' },
  { value: 'pro', labelKey: 'members.admin_members_toolbar.remaining_annualPro' },
  { value: 'classic', labelKey: 'members.admin_members_toolbar.remaining_quarterlyClassic' },
] as const;
