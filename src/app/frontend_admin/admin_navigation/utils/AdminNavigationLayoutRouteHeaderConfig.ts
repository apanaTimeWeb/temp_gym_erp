// RESPONSIBILITY: Resolves page-specific title/subtitle metadata for every canonical Admin leaf route.
// DATA FLOW: usePathname -> longest-prefix canonical leaf match -> existing localized AdminRouteHeaders keys.
import { ADMIN_PROFILE_ROUTES } from '@/app/frontend_admin/admin_profile/profile_overview/config/admin_profile_overview.url_config';
import type { AdminRouteHeaderConfigValue } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';

const ADMIN_ROUTE_HEADERS: ReadonlyArray<{ prefix: string; config: AdminRouteHeaderConfigValue }> = [
  { prefix: '/frontend_admin/admin_dashboard/dashboard_overview', config: { titleKey: 'route_admin_dashboard_title', subtitleKey: 'route_admin_dashboard_subtitle' } },
  { prefix: '/frontend_admin/admin_members/members_directory', config: { titleKey: 'route_admin_members_title', subtitleKey: 'route_admin_members_subtitle' } },
  { prefix: '/frontend_admin/admin_attendance/attendance_dashboard', config: { titleKey: 'route_admin_attendance_title', subtitleKey: 'route_admin_attendance_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_plans_catalog', config: { titleKey: 'route_admin_plans_title', subtitleKey: 'route_admin_plans_subtitle' } },
  { prefix: '/frontend_admin/admin_sales/sales_overview', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/frontend_admin/admin_sales/sales_membership_report', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/frontend_admin/admin_sales/sales_memberships', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/frontend_admin/admin_sales/sales_store_sales', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_coupons_management', config: { titleKey: 'route_admin_coupons_title', subtitleKey: 'route_admin_coupons_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_payments', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_expenses', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_summary', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_branch_profit_and_loss', config: { titleKey: 'route_admin_finance_pnl_title', subtitleKey: 'route_admin_finance_pnl_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_plan_revenue_analytics', config: { titleKey: 'route_admin_plans_revenue_title', subtitleKey: 'route_admin_plans_revenue_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_payouts_management', config: { titleKey: 'route_admin_payouts_title', subtitleKey: 'route_admin_payouts_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_payroll_management', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_salary_advance_management', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_staff_dues_management', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_staff_ledger_management', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_profit_and_loss_report', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_revenue_report', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_finance/finance_payroll_report', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/frontend_admin/admin_sales/sales_pending_payments', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_subscription_invoices', config: { titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_subscription_payment_methods', config: { titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' } },
  { prefix: '/frontend_admin/admin_attendance/attendance_reports', config: { titleKey: 'route_admin_attendance_title', subtitleKey: 'route_admin_attendance_subtitle' } },
  { prefix: '/frontend_admin/admin_reports/reports_cross_domain_overview', config: { titleKey: 'route_admin_reports_title', subtitleKey: 'route_admin_reports_subtitle' } },
  { prefix: '/frontend_admin/admin_sales/sales_membership_growth_report', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/frontend_admin/admin_hr/hr_staff_management', config: { titleKey: 'route_admin_hr_title', subtitleKey: 'route_admin_hr_subtitle' } },
  { prefix: '/frontend_admin/admin_hr/hr_performance_analytics', config: { titleKey: 'route_admin_hr_performance_title', subtitleKey: 'route_admin_hr_performance_subtitle' } },
  { prefix: '/frontend_admin/admin_gyms/gyms_branches_directory', config: { titleKey: 'route_admin_branches_title', subtitleKey: 'route_admin_branches_subtitle' } },
  { prefix: '/frontend_admin/admin_communication/communication_notices_and_announcements', config: { titleKey: 'route_admin_announcements_title', subtitleKey: 'route_admin_announcements_subtitle' } },
  { prefix: '/frontend_admin/admin_communication/communication_whatsapp_campaigns', config: { titleKey: 'route_admin_campaigns_title', subtitleKey: 'route_admin_campaigns_subtitle' } },
  { prefix: '/frontend_admin/admin_communication/communication_notifications_center', config: { titleKey: 'route_admin_notifications_title', subtitleKey: 'route_admin_notifications_subtitle' } },
  { prefix: '/frontend_admin/admin_security/security_permissions_management', config: { titleKey: 'route_admin_permissions_title', subtitleKey: 'route_admin_permissions_subtitle' } },
  { prefix: '/frontend_admin/admin_members/members_blacklist_management', config: { titleKey: 'route_admin_blacklist_title', subtitleKey: 'route_admin_blacklist_subtitle' } },
  { prefix: '/frontend_admin/admin_gyms/gyms_health_alerts_monitoring', config: { titleKey: 'route_admin_gym_health_alerts_title', subtitleKey: 'route_admin_gym_health_alerts_subtitle' } },
  { prefix: '/frontend_admin/admin_security/security_audit_logs_explorer', config: { titleKey: 'route_admin_audit_logs_title', subtitleKey: 'route_admin_audit_logs_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_subscriptions_overview', config: { titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_subscription_plans', config: { titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' } },
  { prefix: '/frontend_admin/admin_billing/billing_usage_analytics', config: { titleKey: 'route_admin_usage_title', subtitleKey: 'route_admin_usage_subtitle' } },
  { prefix: '/frontend_admin/admin_data_export/data_export_requests', config: { titleKey: 'route_admin_data_export_title', subtitleKey: 'route_admin_data_export_subtitle' } },
  { prefix: '/frontend_admin/admin_settings/settings_management', config: { titleKey: 'route_admin_settings_title', subtitleKey: 'route_admin_settings_subtitle' } },
  { prefix: ADMIN_PROFILE_ROUTES.root, config: { titleKey: 'route_admin_profile_title', subtitleKey: 'route_admin_profile_subtitle' } },
];

/** Maps the most-specific canonical leaf URL to its existing translated persistent-header copy. */
export function AdminNavigationLayoutRouteHeaderConfig(pathname: string): AdminRouteHeaderConfigValue {
  const match = [...ADMIN_ROUTE_HEADERS].sort((left, right) => right.prefix.length - left.prefix.length)
    .find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return match?.config ?? { titleKey: 'route_default_title', subtitleKey: 'route_default_subtitle' };
}
