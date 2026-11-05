"use client";
// RESPONSIBILITY: Owns Reports range selection and date-only URL state for API queries and exports.
// DATA FLOW: feature data/state and user input → AdminSalesMembershipGrowthReportAnalyticsDateFilterDropdown → accessible UI/events routed to owning hooks (admin_sales/sales_membership_growth_report/components/date_filter/AdminSalesMembershipGrowthReportAnalyticsDateFilterDropdown.tsx)

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminSalesMembershipGrowthReportSearchableDropdown } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/searchable_dropdown/AdminSalesMembershipGrowthReportSearchableDropdown';
import { DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/constants/AdminSalesMembershipGrowthReportConstants';
import { getAdminSalesMembershipGrowthReportPresetDateRange, isValidAdminSalesMembershipGrowthReportDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportDateRangeUtils';
import type { ReportDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportTypes';
import AdminSalesMembershipGrowthReportDateRangePicker from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/date_filter/AdminSalesMembershipGrowthReportDateRangePicker';

const REPORT_DATE_RANGES: readonly ReportDateRange[] = DATE_RANGE_OPTIONS.map((option) => option.value);

/**
 * @description AdminSalesMembershipGrowthReportAnalyticsDateFilterDropdown renders the ReportsAnalyticsDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminSalesMembershipGrowthReportAnalyticsDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const value: ReportDateRange = REPORT_DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  const replaceParams = useCallback((change: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    change(params);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const handlePresetChange = useCallback((rawPreset: string) => {
    const preset = REPORT_DATE_RANGES.includes(rawPreset as ReportDateRange) ? rawPreset as ReportDateRange : 'this_month';
    replaceParams((params) => {
      params.set('range', preset);
      if (preset !== 'custom') {
        const range = getAdminSalesMembershipGrowthReportPresetDateRange(preset);
        params.set('startDate', range.startDate);
        params.set('endDate', range.endDate);
      } else {
        // Retain existing boundaries for editing; a clean custom range remains invalid until both dates are supplied.
        params.delete('startDate');
        params.delete('endDate');
      }
    });
  }, [replaceParams]);


  const customRangeValid = isValidAdminSalesMembershipGrowthReportDateRange(startDate, endDate);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="w-full bg-input border border-border rounded-lg shadow-card">
        <AdminSalesMembershipGrowthReportSearchableDropdown options={DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(nextValue) => handlePresetChange(String(nextValue))} placeholder={t('reports.AdminReportsDateFilterDropdown.text_12e1289bac')} testId="admin_sales-admin_sales-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3" data-testid="admin_sales-membership-growth-date-filter-custom-range">
          <AdminSalesMembershipGrowthReportDateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(nextStartDate, nextEndDate) => replaceParams((params) => {
              params.set('range', 'custom');
              if (nextStartDate) params.set('startDate', nextStartDate); else params.delete('startDate');
              if (nextEndDate) params.set('endDate', nextEndDate); else params.delete('endDate');
            })}
          />
          <p className={customRangeValid ? 'text-xs text-secondary' : 'text-xs text-danger'} role="status" data-testid="admin_sales-membership-growth-date-range-status">{customRangeValid ? t('reports.admin_reports_main.customRangeHelp') : t('reports.admin_reports_main.dateRangeInvalid')}</p>
        </div>
      )}
    </div>
  );
}
