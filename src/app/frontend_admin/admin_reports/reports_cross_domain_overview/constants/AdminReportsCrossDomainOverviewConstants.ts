import type { AdminReportsCrossDomainOverviewLink } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/types/AdminReportsCrossDomainOverviewTypes';
import { ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/config/admin_reports_cross_domain_overview.url_config';

/** Catalog links only; each linked feature keeps its own state, APIs, and permissions. */
export const ADMIN_REPORTS_CATALOG_LINKS: readonly AdminReportsCrossDomainOverviewLink[] = [
  { id: 'attendance', href: ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.attendance, titleKey: 'admin_navigation.AdminNavigation.reportsCatalog.attendanceTitle', descriptionKey: 'admin_navigation.AdminNavigation.reportsCatalog.attendanceDescription' },
  { id: 'sales-membership-growth', href: ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.salesMembershipGrowth, titleKey: 'admin_navigation.AdminNavigation.reportsCatalog.salesGrowthTitle', descriptionKey: 'admin_navigation.AdminNavigation.reportsCatalog.salesGrowthDescription' },
  { id: 'sales-membership', href: ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.salesMembership, titleKey: 'admin_navigation.AdminNavigation.reportsCatalog.salesTitle', descriptionKey: 'admin_navigation.AdminNavigation.reportsCatalog.salesDescription' },
  { id: 'finance-profit-loss', href: ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.financeProfitLoss, titleKey: 'admin_navigation.AdminNavigation.reportsCatalog.financeTitle', descriptionKey: 'admin_navigation.AdminNavigation.reportsCatalog.financeDescription' },
  { id: 'finance-revenue', href: ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.financeRevenue, titleKey: 'admin_navigation.AdminNavigation.reportsCatalog.financeTitle', descriptionKey: 'admin_navigation.AdminNavigation.reportsCatalog.financeDescription' },
  { id: 'finance-payroll', href: ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_URLS.financePayroll, titleKey: 'admin_navigation.AdminNavigation.reportsCatalog.financeTitle', descriptionKey: 'admin_navigation.AdminNavigation.reportsCatalog.financeDescription' },
] as const;
