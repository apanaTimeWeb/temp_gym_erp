"use client";
// RESPONSIBILITY: Owns Reports range selection and date-only URL state for API queries and exports.
// DATA FLOW: feature data/state and user input → AdminFinanceRevenueReportDateFilterDropdown → accessible UI/events routed to owning hooks (admin_finance/finance_revenue_report/components/date_filter/AdminFinanceRevenueReportDateFilterDropdown.tsx)

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminFinanceRevenueReportSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/searchable_dropdown/AdminFinanceRevenueReportSearchableDropdown';
import { DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_revenue_report/constants/AdminFinanceRevenueReportConstants';
import { getAdminFinanceRevenueReportPresetDateRange, isValidAdminFinanceRevenueReportDateRange } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportDateRangeUtils';
import type { ReportDateRange } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportTypes';
import AdminFinanceRevenueReportDateRangePicker from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/date_filter/AdminFinanceRevenueReportDateRangePicker';

const REPORT_DATE_RANGES: readonly ReportDateRange[] = DATE_RANGE_OPTIONS.map((option) => option.value);

/**
 * @description AdminFinanceRevenueReportDateFilterDropdown renders the ReportsAnalyticsDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminFinanceRevenueReportDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const value: ReportDateRange = REPORT_DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  // Protect consecutive edits while a Next.js searchParams snapshot has not yet caught up.
  const renderedQuery = searchParams.toString();
  const pendingUrlRef = useRef<{ snapshots: Set<string>; latest: string } | null>(null);
  useEffect(() => {
    const draft = pendingUrlRef.current;
    if (draft?.latest === renderedQuery || (draft && !draft.snapshots.has(renderedQuery))) pendingUrlRef.current = null;
  }, [renderedQuery]);
  const replaceParams = useCallback((change: (params: URLSearchParams) => void) => {
    const draft = pendingUrlRef.current;
    const canReuse = Boolean(draft?.snapshots.has(renderedQuery));
    const params = new URLSearchParams(canReuse ? draft!.latest : renderedQuery);
    change(params);
    params.delete('page'); // Every change to the reporting period invalidates the current page.
    const query = params.toString();
    pendingUrlRef.current = {
      snapshots: new Set([...(canReuse ? draft!.snapshots : []), renderedQuery, query]),
      latest: query,
    };
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, renderedQuery]);

  const handlePresetChange = useCallback((rawPreset: string) => {
    const preset = REPORT_DATE_RANGES.includes(rawPreset as ReportDateRange) ? rawPreset as ReportDateRange : 'this_month';
    replaceParams((params) => {
      params.set('range', preset);
      if (preset !== 'custom') {
        const range = getAdminFinanceRevenueReportPresetDateRange(preset);
        params.set('startDate', range.startDate);
        params.set('endDate', range.endDate);
      } else {
        // Retain existing boundaries for editing; a clean custom range remains invalid until both dates are supplied.
        params.delete('startDate');
        params.delete('endDate');
      }
    });
  }, [replaceParams]);


  const customRangeValid = isValidAdminFinanceRevenueReportDateRange(startDate, endDate);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="w-full bg-input border border-border rounded-lg shadow-card">
        <AdminFinanceRevenueReportSearchableDropdown options={DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(nextValue) => handlePresetChange(String(nextValue))} placeholder={t('reports.AdminReportsDateFilterDropdown.text_12e1289bac')} testId="admin_reports-admin_reports-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3" data-testid="admin-finance-revenue-date-filter-custom-range">
          <AdminFinanceRevenueReportDateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(nextStartDate, nextEndDate) => replaceParams((params) => {
              params.set('range', 'custom');
              if (nextStartDate) params.set('startDate', nextStartDate); else params.delete('startDate');
              if (nextEndDate) params.set('endDate', nextEndDate); else params.delete('endDate');
            })}
          />
          <p className={customRangeValid ? 'text-xs text-secondary' : 'text-xs text-danger'} role="status" data-testid="admin-finance-revenue-date-range-status">{customRangeValid ? t('reports.admin_reports_main.customRangeHelp') : t('reports.admin_reports_main.dateRangeInvalid')}</p>
        </div>
      )}
    </div>
  );
}
