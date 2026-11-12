
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES = {
  ...({
  DASHBOARD: '/frontend_superadmin/superadmin_dashboard',
} as const),
  SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES: ({
  // Primary domain entry points (one clickable sidebar destination per business domain).
  DASHBOARD: '/frontend_superadmin/superadmin_dashboard',
  GYMS: '/frontend_superadmin/superadmin_gyms',
  ANALYTICS: '/frontend_superadmin/superadmin_analytics',
  BILLING: '/frontend_superadmin/superadmin_billing',
  AUDIT_COMPLIANCE: '/frontend_superadmin/superadmin_audit_compliance',
  COMMUNICATION: '/frontend_superadmin/superadmin_communication',
  PLATFORM_CONFIGURATION: '/frontend_superadmin/superadmin_platform_configuration',
  SUPPORT: '/frontend_superadmin/superadmin_support',
  SYSTEM_OPS: '/frontend_superadmin/superadmin_system_ops',
  AFFILIATES: '/frontend_superadmin/superadmin_affiliates',
  TEAM: '/frontend_superadmin/superadmin_team',
  ACCOUNT: '/frontend_superadmin/superadmin_account',

  // Canonical leaf destinations for secondary navigation; alias compatibility is host-owned and must not duplicate feature route files.
  PLANS: '/frontend_superadmin/superadmin_billing/billing_plans_management',
  INVOICES: '/frontend_superadmin/superadmin_billing/billing_invoices_management',
  COUPONS: '/frontend_superadmin/superadmin_billing/billing_coupons_management',
  USAGE_METERS: '/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard',
  COMPLIANCE: '/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard',
  GLOBAL_AUDIT: '/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview',
  TICKETS: '/frontend_superadmin/superadmin_support/support_tickets_management',
  MESSAGING: '/frontend_superadmin/superadmin_communication/communication_messaging_center',
  BROADCASTS: '/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns',
  REPORTS: '/frontend_superadmin/superadmin_analytics/analytics_reports_center',
  WHITE_LABELING: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings',
  FEATURES: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management',
  INTEGRATIONS: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management',
  SETTINGS: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general',
  PROFILE: '/frontend_superadmin/superadmin_account/account_profile_overview',
  SYSTEM_OPS_OVERVIEW: '/frontend_superadmin/superadmin_system_ops/system_ops_overview',
  SYSTEM_OPS_BACKUPS: '/frontend_superadmin/superadmin_system_ops/system_ops_backups',
  SYSTEM_OPS_JOBS: '/frontend_superadmin/superadmin_system_ops/system_ops_jobs',
  SYSTEM_OPS_MIGRATIONS: '/frontend_superadmin/superadmin_system_ops/system_ops_migrations',
} as const),
} as const;
export const SUPERADMIN_PLATFORM_SHELL_NAVIGATION_API = {

} as const;
