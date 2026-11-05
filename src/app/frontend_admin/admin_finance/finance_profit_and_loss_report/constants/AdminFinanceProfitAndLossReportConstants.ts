// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_profit_and_loss_report/constants/AdminFinanceProfitAndLossReportConstants.ts)

import type { ReportDateRange } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';



export const DATE_RANGE_OPTIONS: ReadonlyArray<{ value: ReportDateRange; labelKey: string }> = [
  { value: 'this_month', labelKey: 'reports.static.this_month' },
  { value: 'last_month', labelKey: 'reports.static.last_month' },
  { value: 'last_3_months', labelKey: 'reports.static.last_3_months' },
  { value: 'last_6_months', labelKey: 'reports.static.last_6_months' },
  { value: 'this_year', labelKey: 'reports.static.this_year' },
  { value: 'custom', labelKey: 'reports.static.custom_range' },
];

export const REPORTS_ITEMS_PER_PAGE = 10;

export const EXPORT_FORMAT_OPTIONS: { value: import('@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes').AdminFinanceProfitAndLossReportExportFormat; labelKey: string }[] = [
  { value: 'pdf', labelKey: 'reports.static.export_as_pdf' },
  { value: 'csv', labelKey: 'reports.static.export_as_csv' },
];
