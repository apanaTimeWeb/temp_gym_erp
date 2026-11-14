"use client";
// RESPONSIBILITY: Owns Reports range selection and date-only URL state for API queries and exports.
// DATA FLOW: feature data/state and user input → AdminFinancePayrollReportDateFilterDropdown → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_report/components/date_filter/AdminFinancePayrollReportDateFilterDropdown.tsx)

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminFinancePayrollReportSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payroll_report/components/searchable_dropdown/AdminFinancePayrollReportSearchableDropdown';
import { DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_payroll_report/constants/AdminFinancePayrollReportConstants';
import { getAdminFinancePayrollReportPresetDateRange, isValidAdminFinancePayrollReportDateRange } from '@/app/frontend_admin/admin_finance/finance_payroll_report/utils/AdminFinancePayrollReportDateRangeUtils';
import type { ReportDateRange } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportTypes';
import AdminFinancePayrollReportDateRangePicker from '@/app/frontend_admin/admin_finance/finance_payroll_report/components/date_filter/AdminFinancePayrollReportDateRangePicker';

const REPORT_DATE_RANGES: readonly ReportDateRange[] = DATE_RANGE_OPTIONS.map((option) => option.value);

/**
 * @description AdminFinancePayrollReportDateFilterDropdown renders the ReportsAnalyticsDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminFinancePayrollReportDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const value: ReportDateRange = REPORT_DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  // URL writes are asynchronous. Keep the latest unacknowledged draft so rapid
  // date changes never overwrite each other with an earlier searchParams snapshot.
  const renderedQuery = searchParams.toString();
  const pendingUrlRef = useRef<{ snapshots: Set<string>; latest: string } | null>(null);
  useEffect(() => {
    const draft = pendingUrlRef.current;
    // An acknowledged intermediate navigation is not the last local edit.
    // A URL outside the issued set is external history and wins over local state.
    if (draft && (draft.latest === renderedQuery || !draft.snapshots.has(renderedQuery))) {
      pendingUrlRef.current = null;
    }
  }, [renderedQuery]);
  const replaceParams = useCallback((change: (params: URLSearchParams) => void) => {
    let draft = pendingUrlRef.current;
    if (draft && (draft.latest === renderedQuery || !draft.snapshots.has(renderedQuery))) {
      pendingUrlRef.current = null;
      draft = null;
    }
    const reuseDraft = Boolean(draft?.snapshots.has(renderedQuery));
    const params = new URLSearchParams(reuseDraft ? draft!.latest : renderedQuery);
    change(params);
    params.delete('page'); // A different date range invalidates the old page.
    const query = params.toString();
    if (query === (reuseDraft ? draft!.latest : renderedQuery)) return;
    pendingUrlRef.current = {
      snapshots: new Set([...(reuseDraft ? draft!.snapshots : []), renderedQuery, query]),
      latest: query,
    };
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, renderedQuery]);

  const handlePresetChange = useCallback((rawPreset: string) => {
    const preset = REPORT_DATE_RANGES.includes(rawPreset as ReportDateRange) ? rawPreset as ReportDateRange : 'this_month';
    replaceParams((params) => {
      params.set('range', preset);
      if (preset !== 'custom') {
        const range = getAdminFinancePayrollReportPresetDateRange(preset);
        params.set('startDate', range.startDate);
        params.set('endDate', range.endDate);
      } else {
        // Retain existing boundaries for editing; a clean custom range remains invalid until both dates are supplied.
        params.delete('startDate');
        params.delete('endDate');
      }
    });
  }, [replaceParams]);


  const customRangeValid = isValidAdminFinancePayrollReportDateRange(startDate, endDate);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="w-full bg-input border border-border rounded-lg shadow-card">
        <AdminFinancePayrollReportSearchableDropdown options={DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(nextValue) => handlePresetChange(String(nextValue))} placeholder={t('reports.AdminReportsDateFilterDropdown.text_12e1289bac')} testId="admin_reports-admin_reports-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3" data-testid="admin-finance-payroll-date-filter-custom-range">
          <AdminFinancePayrollReportDateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(nextStartDate, nextEndDate) => replaceParams((params) => {
              params.set('range', 'custom');
              if (nextStartDate) params.set('startDate', nextStartDate); else params.delete('startDate');
              if (nextEndDate) params.set('endDate', nextEndDate); else params.delete('endDate');
            })}
          />
          <p className={customRangeValid ? 'text-xs text-secondary' : 'text-xs text-danger'} role="status" data-testid="admin-finance-payroll-date-range-status">{customRangeValid ? t('reports.admin_reports_main.customRangeHelp') : t('reports.admin_reports_main.dateRangeInvalid')}</p>
        </div>
      )}
    </div>
  );
}
