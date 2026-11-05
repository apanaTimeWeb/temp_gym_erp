/** Canonical identifiers and read-only SaaS-tier matrix consumed by the Features UI. */
export const SUPERADMIN_FEATURE_TIER_IDS = ['basic', 'pro', 'enterprise'] as const;
export const SUPERADMIN_FEATURE_IDS = ['hr', 'payroll', 'custom_domain', 'whitelabel', 'analytics', 'franchise'] as const;

export const SUPERADMIN_FEATURE_TIER_DEFINITIONS = [
  { id: 'basic', labelKey: 'ui.tier_basic' },
  { id: 'pro', labelKey: 'ui.tier_pro' },
  { id: 'enterprise', labelKey: 'ui.tier_enterprise' },
] as const satisfies ReadonlyArray<{ id: (typeof SUPERADMIN_FEATURE_TIER_IDS)[number]; labelKey: string }>;

export const SUPERADMIN_FEATURE_DEFINITIONS = [
  { id: 'hr', labelKey: 'ui.feature_hr_management' },
  { id: 'payroll', labelKey: 'ui.feature_payroll' },
  { id: 'custom_domain', labelKey: 'ui.feature_custom_domain' },
  { id: 'whitelabel', labelKey: 'ui.feature_whitelabel' },
  { id: 'analytics', labelKey: 'ui.feature_advanced_analytics' },
  { id: 'franchise', labelKey: 'ui.feature_franchise_management' },
] as const satisfies ReadonlyArray<{ id: (typeof SUPERADMIN_FEATURE_IDS)[number]; labelKey: string }>;

export const SUPERADMIN_FEATURE_TIER_MATRIX = {
  hr: { basic: true, pro: true, enterprise: true },
  payroll: { basic: false, pro: true, enterprise: true },
  custom_domain: { basic: false, pro: true, enterprise: true },
  whitelabel: { basic: false, pro: false, enterprise: true },
  analytics: { basic: false, pro: true, enterprise: true },
  franchise: { basic: false, pro: false, enterprise: true },
} as const satisfies Record<(typeof SUPERADMIN_FEATURE_IDS)[number], Record<(typeof SUPERADMIN_FEATURE_TIER_IDS)[number], boolean>>;
