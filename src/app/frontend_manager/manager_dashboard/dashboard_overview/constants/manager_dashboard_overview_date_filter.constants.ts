import type { ManagerDashboardOverviewDateRange } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';
// RESPONSIBILITY: Owns dashboard date-range presets and their translation-key mapping.
/**
 * @description Provides the stable supported date-range values and locale keys for the dashboard toolbar.
 * @dependencies Uses the owning module's date-range type only.
 * @edge-case Preserves the documented weekly, monthly, yearly, and custom range options without embedding UI copy.
 */
export const MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS = [
  { value: 'this_month', labelKey: 'TEXT_TIME_THIS_MONTH' },
  { value: 'last_month', labelKey: 'TEXT_TIME_LAST_MONTH' },
  { value: 'last_3_months', labelKey: 'TEXT_TIME_LAST_3_MONTHS' },
  { value: 'this_year', labelKey: 'TEXT_TIME_YEAR' },
  { value: 'custom', labelKey: 'COPY_CUSTOM_RANGE' },
] as const satisfies readonly { value: ManagerDashboardOverviewDateRange; labelKey: string }[];
