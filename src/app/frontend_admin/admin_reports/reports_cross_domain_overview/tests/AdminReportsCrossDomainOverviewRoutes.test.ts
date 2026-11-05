import { describe, expect, it } from 'vitest';
import { ADMIN_REPORTS_CATALOG_LINKS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/constants/AdminReportsCrossDomainOverviewConstants';
import { ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS as URLS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/config/admin_reports_cross_domain_overview.url_config';
import { ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/mocks/fixtures/AdminReportsCrossDomainOverviewMockFixtures';
import { adminReportsCrossDomainOverviewMockHandlers } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/mocks/handlers/AdminReportsCrossDomainOverviewMockHandlers';
import { ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/mocks/scenarios/admin_reports_cross_domain_overview.scenarios';

describe('Reports cross-domain catalog contract', () => {
  it('links each report to its owning business domain', () => {
    expect(URLS.attendance).toBe('/frontend_admin/admin_attendance/attendance_reports');
    expect(URLS.salesMembershipGrowth).toBe('/frontend_admin/admin_sales/sales_membership_growth_report');
    expect(URLS.salesMembership).toBe('/frontend_admin/admin_sales/sales_membership_report');
    expect(URLS.financeProfitLoss).toBe('/frontend_admin/admin_finance/finance_profit_and_loss_report');
    expect(URLS.financeRevenue).toBe('/frontend_admin/admin_finance/finance_revenue_report');
    expect(URLS.financePayroll).toBe('/frontend_admin/admin_finance/finance_payroll_report');
    expect(ADMIN_REPORTS_CATALOG_LINKS).toHaveLength(6);
    expect(new Set(ADMIN_REPORTS_CATALOG_LINKS.map((item) => item.id)).size).toBe(6);
    expect(ADMIN_REPORTS_CATALOG_LINKS.every((item) => item.href.startsWith('/frontend_admin/'))).toBe(true);
  });

  it('uses canonical static fixtures without duplicating route literals', () => {
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_MOCK_FIXTURES.ACTIVE_RECORDS).toBe(ADMIN_REPORTS_CATALOG_LINKS);
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_MOCK_FIXTURES.EMPTY_DATA).toHaveLength(0);
    expect(adminReportsCrossDomainOverviewMockHandlers).toHaveLength(0);
  });

  it('marks API failure and authorization scenarios as host-owned, not fabricated locally', () => {
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS.ACTIVE_RECORDS.appliesLocally).toBe(true);
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS.EMPTY_DATA.appliesLocally).toBe(true);
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS.SERVER_500_ERROR.appliesLocally).toBe(false);
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS.NETWORK_TIMEOUT.appliesLocally).toBe(false);
    expect(ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_SCENARIOS.UNAUTHORIZED_401.appliesLocally).toBe(false);
  });
});
