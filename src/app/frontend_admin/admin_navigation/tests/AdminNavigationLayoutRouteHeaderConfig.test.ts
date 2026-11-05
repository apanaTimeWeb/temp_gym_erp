// RESPONSIBILITY: Verifies every canonical leaf has its supplied page-specific localized header metadata.
import { describe, expect, it } from 'vitest';
import { AdminNavigationLayoutRouteHeaderConfig } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutRouteHeaderConfig';

const expectedHeaders = [
  { route: '/frontend_admin/admin_dashboard/dashboard_overview', titleKey: 'route_admin_dashboard_title', subtitleKey: 'route_admin_dashboard_subtitle' },
  { route: '/frontend_admin/admin_members/members_directory', titleKey: 'route_admin_members_title', subtitleKey: 'route_admin_members_subtitle' },
  { route: '/frontend_admin/admin_attendance/attendance_dashboard', titleKey: 'route_admin_attendance_title', subtitleKey: 'route_admin_attendance_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_plans_catalog', titleKey: 'route_admin_plans_title', subtitleKey: 'route_admin_plans_subtitle' },
  { route: '/frontend_admin/admin_sales/sales_overview', titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' },
  { route: '/frontend_admin/admin_sales/sales_membership_report', titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' },
  { route: '/frontend_admin/admin_sales/sales_memberships', titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' },
  { route: '/frontend_admin/admin_sales/sales_store_sales', titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_coupons_management', titleKey: 'route_admin_coupons_title', subtitleKey: 'route_admin_coupons_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_payments', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_expenses', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_summary', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_branch_profit_and_loss', titleKey: 'route_admin_finance_pnl_title', subtitleKey: 'route_admin_finance_pnl_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_plan_revenue_analytics', titleKey: 'route_admin_plans_revenue_title', subtitleKey: 'route_admin_plans_revenue_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_payouts_management', titleKey: 'route_admin_payouts_title', subtitleKey: 'route_admin_payouts_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_payroll_management', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_salary_advance_management', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_staff_dues_management', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_staff_ledger_management', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_profit_and_loss_report', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_revenue_report', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_finance/finance_payroll_report', titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' },
  { route: '/frontend_admin/admin_sales/sales_pending_payments', titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_subscription_invoices', titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_subscription_payment_methods', titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' },
  { route: '/frontend_admin/admin_attendance/attendance_reports', titleKey: 'route_admin_attendance_title', subtitleKey: 'route_admin_attendance_subtitle' },
  { route: '/frontend_admin/admin_reports/reports_cross_domain_overview', titleKey: 'route_admin_reports_title', subtitleKey: 'route_admin_reports_subtitle' },
  { route: '/frontend_admin/admin_sales/sales_membership_growth_report', titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' },
  { route: '/frontend_admin/admin_hr/hr_staff_management', titleKey: 'route_admin_hr_title', subtitleKey: 'route_admin_hr_subtitle' },
  { route: '/frontend_admin/admin_hr/hr_performance_analytics', titleKey: 'route_admin_hr_performance_title', subtitleKey: 'route_admin_hr_performance_subtitle' },
  { route: '/frontend_admin/admin_gyms/gyms_branches_directory', titleKey: 'route_admin_branches_title', subtitleKey: 'route_admin_branches_subtitle' },
  { route: '/frontend_admin/admin_communication/communication_notices_and_announcements', titleKey: 'route_admin_announcements_title', subtitleKey: 'route_admin_announcements_subtitle' },
  { route: '/frontend_admin/admin_communication/communication_whatsapp_campaigns', titleKey: 'route_admin_campaigns_title', subtitleKey: 'route_admin_campaigns_subtitle' },
  { route: '/frontend_admin/admin_communication/communication_notifications_center', titleKey: 'route_admin_notifications_title', subtitleKey: 'route_admin_notifications_subtitle' },
  { route: '/frontend_admin/admin_security/security_permissions_management', titleKey: 'route_admin_permissions_title', subtitleKey: 'route_admin_permissions_subtitle' },
  { route: '/frontend_admin/admin_members/members_blacklist_management', titleKey: 'route_admin_blacklist_title', subtitleKey: 'route_admin_blacklist_subtitle' },
  { route: '/frontend_admin/admin_gyms/gyms_health_alerts_monitoring', titleKey: 'route_admin_gym_health_alerts_title', subtitleKey: 'route_admin_gym_health_alerts_subtitle' },
  { route: '/frontend_admin/admin_security/security_audit_logs_explorer', titleKey: 'route_admin_audit_logs_title', subtitleKey: 'route_admin_audit_logs_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_subscriptions_overview', titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_subscription_plans', titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' },
  { route: '/frontend_admin/admin_billing/billing_usage_analytics', titleKey: 'route_admin_usage_title', subtitleKey: 'route_admin_usage_subtitle' },
  { route: '/frontend_admin/admin_data_export/data_export_requests', titleKey: 'route_admin_data_export_title', subtitleKey: 'route_admin_data_export_subtitle' },
  { route: '/frontend_admin/admin_settings/settings_management', titleKey: 'route_admin_settings_title', subtitleKey: 'route_admin_settings_subtitle' },
];

describe('Admin route-header canonical leaf mapping', () => {
  it('maps all 43 canonical business leaf routes to their documented localized header keys', () => {
    expect(expectedHeaders).toHaveLength(43);
    for (const expected of expectedHeaders) {
      expect(AdminNavigationLayoutRouteHeaderConfig(expected.route)).toEqual({ titleKey: expected.titleKey, subtitleKey: expected.subtitleKey });
    }
  });
  it('preserves specificity for nested branch P&L routes', () => {
    expect(AdminNavigationLayoutRouteHeaderConfig('/frontend_admin/admin_finance/finance_branch_profit_and_loss/quarterly')).toEqual({
      titleKey: 'route_admin_finance_pnl_title', subtitleKey: 'route_admin_finance_pnl_subtitle',
    });
  });
  it('falls back safely for unmapped paths', () => {
    expect(AdminNavigationLayoutRouteHeaderConfig('/admin/not-mapped')).toEqual({ titleKey: 'route_default_title', subtitleKey: 'route_default_subtitle' });
  });
});
