"use client";
// RESPONSIBILITY: Owns Reports range selection and date-only URL state for API queries and exports.
// DATA FLOW: feature data/state and user input → AdminFinanceProfitAndLossReportDateFilterDropdown → accessible UI/events routed to owning hooks (admin_finance/finance_profit_and_loss_report/components/date_filter/AdminFinanceProfitAndLossReportDateFilterDropdown.tsx)

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminFinanceProfitAndLossReportSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/searchable_dropdown/AdminFinanceProfitAndLossReportSearchableDropdown';
import { DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/constants/AdminFinanceProfitAndLossReportConstants';
import { getAdminFinanceProfitAndLossReportPresetDateRange, isValidAdminFinanceProfitAndLossReportDateRange } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportDateRangeUtils';
import AdminFinanceProfitAndLossReportDateRangePicker from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/date_filter/AdminFinanceProfitAndLossReportDateRangePicker';
import type { ReportDateRange } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';

const REPORT_DATE_RANGES: readonly ReportDateRange[] = DATE_RANGE_OPTIONS.map((option) => option.value);

/**
 * @description AdminFinanceProfitAndLossReportDateFilterDropdown renders the ReportsAnalyticsDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminFinanceProfitAndLossReportDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const value: ReportDateRange = REPORT_DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  // Merge adjacent user edits until Next.js acknowledges a new URL snapshot; do not
  // turn browser Back/Forward into a new write from an obsolete staged snapshot.
  const renderedQuery = searchParams.toString();
  const pendingUrlRef = useRef<{ snapshots: Set<string>; latest: string } | null>(null);
  useEffect(() => {
    const draft = pendingUrlRef.current;
    if (draft && (draft.latest === renderedQuery || !draft.snapshots.has(renderedQuery))) {
      pendingUrlRef.current = null;
    }
  }, [renderedQuery]);
  const replaceParams = useCallback((change: (params: URLSearchParams) => void) => {
    const draft = pendingUrlRef.current;
    const canReuse = Boolean(draft?.snapshots.has(renderedQuery));
    const params = new URLSearchParams(canReuse ? draft!.latest : renderedQuery);
    change(params);
    params.delete('page'); // Date range change invalidates a stale report page.
    const query = params.toString();
    if (query === (canReuse ? draft!.latest : renderedQuery)) return;
    pendingUrlRef.current = { snapshots: new Set([...(canReuse ? draft!.snapshots : []), renderedQuery, query]), latest: query };
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, renderedQuery]);

  const handlePresetChange = useCallback((rawPreset: string) => {
    const preset = REPORT_DATE_RANGES.includes(rawPreset as ReportDateRange) ? rawPreset as ReportDateRange : 'this_month';
    replaceParams((params) => {
      params.set('range', preset);
      if (preset !== 'custom') {
        const range = getAdminFinanceProfitAndLossReportPresetDateRange(preset);
        params.set('startDate', range.startDate);
        params.set('endDate', range.endDate);
      } else {
        // Retain existing boundaries for editing; a clean custom range remains invalid until both dates are supplied.
        params.delete('startDate');
        params.delete('endDate');
      }
    });
  }, [replaceParams]);

  const updateCustomRange = useCallback((nextStartDate: string, nextEndDate: string) => {
    replaceParams((params) => {
      params.set('range', 'custom');
      if (nextStartDate) params.set('startDate', nextStartDate);
      else params.delete('startDate');
      if (nextEndDate) params.set('endDate', nextEndDate);
      else params.delete('endDate');
    });
  }, [replaceParams]);

  const customRangeValid = isValidAdminFinanceProfitAndLossReportDateRange(startDate, endDate);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="w-full bg-input border border-border rounded-lg shadow-card">
        <AdminFinanceProfitAndLossReportSearchableDropdown options={DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(nextValue) => handlePresetChange(String(nextValue))} placeholder={t('reports.AdminReportsDateFilterDropdown.text_12e1289bac')} testId="admin_reports-admin_reports-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="space-y-3 rounded-lg border border-border bg-card p-3" data-testid="admin_reports-admin_reports-date-filter-custom-range">
          <AdminFinanceProfitAndLossReportDateRangePicker startDate={startDate} endDate={endDate} onChange={updateCustomRange} />
          <p id="admin-reports-custom-range-help" className={customRangeValid ? 'text-xs text-secondary' : 'text-xs text-danger'} role="status" data-testid="reports-analytics-reports-analytics-date-filter-dropdown-status-region">{customRangeValid ? t('reports.admin_reports_main.customRangeHelp') : t('reports.admin_reports_main.dateRangeInvalid')}</p>
        </div>
      )}
    </div>
  );
}
