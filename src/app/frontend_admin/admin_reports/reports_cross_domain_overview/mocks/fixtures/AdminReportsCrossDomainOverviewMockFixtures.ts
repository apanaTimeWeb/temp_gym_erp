import { ADMIN_REPORTS_CATALOG_LINKS } from '@/app/frontend_admin/admin_reports/reports_cross_domain_overview/constants/AdminReportsCrossDomainOverviewConstants';

/**
 * Test fixtures for this static catalog. The active fixture references the canonical local
 * constants instead of copying route strings, preventing fixture/production route drift.
 */
export const ADMIN_REPORTS_CROSS_DOMAIN_OVERVIEW_MOCK_FIXTURES = {
  ACTIVE_RECORDS: ADMIN_REPORTS_CATALOG_LINKS,
  EMPTY_DATA: [] as const,
} as const;
