// RESPONSIBILITY: Centralized constants for the Superadmin Gyms module.
// No magic numbers or magic strings should exist in superadmin_gyms_components — all live here.
// DATA FLOW: SuperadminGymsConstants → SuperadminGymsTable, SuperadminGymsToolbar, useSuperadminGymsDirectoryTable
/** Number of gym rows displayed per page in the SuperadminGymsTable. */
export const GYMS_TABLE_PAGE_SIZE = 10;
/** Minimum search query length before triggering a filter. */
export const GYMS_SEARCH_MIN_LENGTH = 1;
/** Status label map for gym tenant status badges. */
export const GYMS_STATUS_LABELS = {
    ACTIVE: 'Active',
    SUSPENDED: 'Suspended',
    TRIAL: 'Trial',
    EXPIRED: 'Expired',
    CANCELLED: 'Cancelled',
} as const;
/** Plan badge color map — used in SuperadminGymsTable plan badge rendering. */
export const GYMS_PLAN_COLORS = {
    ENTERPRISE: 'bg-purple-bg text-purple-text border border-purple-text',
    PRO: 'bg-primary-subtle text-primary border border-focus',
    STARTER: 'bg-success-bg text-success border border-success',
    BASIC: 'bg-success-bg text-success border border-success',
    DEFAULT: 'bg-input text-secondary border border-border',
} as const;
// Removed mock data to comply with P0-02
/** Semantic status badge classes for Gym registry and detail presentation. */
export const getSuperadminGymStatusBadgeClasses = (status: keyof typeof GYMS_STATUS_LABELS): string => {
    const classes: Record<keyof typeof GYMS_STATUS_LABELS, string> = {
        ACTIVE: 'border-success-text bg-success-bg text-success',
        SUSPENDED: 'border-border bg-danger-bg text-danger',
        TRIAL: 'border-border bg-warning-bg text-warning',
        EXPIRED: 'border-border bg-danger-bg text-danger',
        CANCELLED: 'border-border bg-danger-bg text-danger',
    };
    return classes[status];
};

/** Locale keys for the canonical status registry, used by list and detail surfaces. */
export const GYMS_STATUS_TRANSLATION_KEYS = {
  ACTIVE: 'ui.status_active',
  SUSPENDED: 'ui.status_suspended',
  TRIAL: 'ui.status_trial',
  EXPIRED: 'ui.status_expired',
  CANCELLED: 'ui.status_cancelled',
} as const;

/** Canonical business/status literals for this feature; API compatibility still requires backend-contract confirmation. */
export const SUPERADMIN_GYM_STATUS_VALUES = ['ACTIVE', 'SUSPENDED', 'TRIAL', 'EXPIRED', 'CANCELLED'] as const;
export const SUPERADMIN_GYM_STATUS_CODES = Object.freeze({
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  SUSPENDED: 'SUSPENDED',
  TRIAL: 'TRIAL',
  EXPIRED: 'EXPIRED',
} as const);

export const SUPERADMIN_GYM_DETAIL_MAIN_TABS = [
  { id: 'overview', labelKey: 'ui.gym_detail_tab_overview' },
  { id: 'branches', labelKey: 'ui.gym_detail_tab_branches_franchises' },
  { id: 'lifecycle', labelKey: 'ui.gym_detail_tab_lifecycle_billing' },
  { id: 'whitelabel', labelKey: 'ui.gym_detail_tab_white_labeling' },
] as const;
/** External WhatsApp URL builder; kept outside the canonical route/API URL contract. */
export const SUPERADMIN_GYMS_MANAGEMENT_EXTERNAL = {
  WHATSAPP_CLICK_TO_CHAT: (phone: string, message: string) => {
    const rawDigits = String(phone || '').replace(/\D/g, '');
    const cleanDigits = rawDigits.startsWith('0') && rawDigits.length === 11 ? rawDigits.slice(1) : rawDigits;
    const cleanPhone = cleanDigits.startsWith('91') && cleanDigits.length === 12
      ? cleanDigits
      : cleanDigits.length === 10
      ? `91${cleanDigits}`
      : cleanDigits;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  },
} as const;
