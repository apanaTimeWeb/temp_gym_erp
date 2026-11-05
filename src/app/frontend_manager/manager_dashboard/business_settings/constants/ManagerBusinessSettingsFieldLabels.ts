// RESPONSIBILITY: Provides human-readable labels for editable Manager Settings fields; no business data is stored here.
/**
 * @description Provides the ManagerBusinessSettingsFieldLabels implementation for the settings module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS = {
  gymName: 'Gym Name', phone: 'Phone', email: 'Email', address: 'Address', city: 'City', state: 'State', pincode: 'Pincode', website: 'Website', gstin: 'GSTIN',
} as const;

export const MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABEL_KEYS = {
  gymName: 'TEXT_GYM_NAME', phone: 'TEXT_PHONE', email: 'TEXT_EMAIL', address: 'TEXT_ADDRESS', city: 'TEXT_CITY', state: 'TEXT_STATE', pincode: 'TEXT_PINCODE', website: 'TEXT_WEBSITE', gstin: 'TEXT_GSTIN',
} as const;

export const MANAGER_BUSINESS_SETTINGS_MEMBERSHIP_FIELD_LABELS = {
  gracePeriodDays: 'Grace Period (Days)',
  maxFreezeDaysPerYear: 'Maximum Freeze Days / Year',
  autoSuspendAfterDays: 'Auto Suspend After (Days)',
  reminderDaysBefore: 'Reminder Before Expiry (Days)',
  autoSuspendOnExpiry: 'Auto Suspend on Expiry',
  allowFreeze: 'Allow Membership Freeze',
} as const;
