"use client";
// RESPONSIBILITY: Owns Reports range selection and date-only URL state for API queries and exports.
// DATA FLOW: feature data/state and user input → AdminAttendanceReportsDateFilterDropdown → accessible UI/events routed to owning hooks (admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown.tsx)

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdminAttendanceReportsSearchableDropdown } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown';
import { DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsConstants';
import { getAdminAttendanceReportsPresetDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsDateRangeUtils';
import type { ReportDateRange } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';
import AdminAttendanceReportsDateRangePicker from '@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker';

const REPORT_DATE_RANGES: readonly ReportDateRange[] = DATE_RANGE_OPTIONS.map((option) => option.value);

/**
 * @description AdminAttendanceReportsDateFilterDropdown renders the ReportsAnalyticsDateFilterDropdown interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export function AdminAttendanceReportsDateFilterDropdown() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rawRange = searchParams.get('range');
  const value: ReportDateRange = REPORT_DATE_RANGES.includes(rawRange as ReportDateRange) ? rawRange as ReportDateRange : 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const observedQuery = searchParams.toString();
  const syncRef = useRef<{ observed: string; pending: string[] }>({ observed: observedQuery, pending: [] });
  const sync = syncRef.current;
  if (sync.observed !== observedQuery) {
    const ackIndex = sync.pending.indexOf(observedQuery);
    if (ackIndex >= 0) sync.pending.splice(0, ackIndex + 1);
    else sync.pending.length = 0; // External browser history/navigation wins.
    sync.observed = observedQuery;
  }

  const replaceParams = useCallback((change: (params: URLSearchParams) => void) => {
    const pending = syncRef.current.pending;
    const params = new URLSearchParams(pending.length ? pending[pending.length - 1] : searchParams.toString());
    change(params);
    const query = params.toString();
    const existing = pending.length ? pending[pending.length - 1] : searchParams.toString();
    if (query === existing) return;
    pending.push(query);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const handlePresetChange = useCallback((rawPreset: string) => {
    const preset = REPORT_DATE_RANGES.includes(rawPreset as ReportDateRange) ? rawPreset as ReportDateRange : 'this_month';
    replaceParams((params) => {
      params.set('range', preset);
      if (preset !== 'custom') {
        const range = getAdminAttendanceReportsPresetDateRange(preset);
        params.set('startDate', range.startDate);
        params.set('endDate', range.endDate);
      } else {
        // Retain existing boundaries for editing; a clean custom range remains invalid until both dates are supplied.
        params.delete('startDate');
        params.delete('endDate');
      }
    });
  }, [replaceParams]);


  const customRangeValid = Boolean(startDate && endDate && startDate <= endDate);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="w-full bg-input border border-border rounded-lg shadow-card">
        <AdminAttendanceReportsSearchableDropdown options={DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(nextValue) => handlePresetChange(String(nextValue))} placeholder={t('reports.AdminReportsDateFilterDropdown.text_12e1289bac')} testId="admin_attendance-admin_attendance-date-filter-dropdown-filter" />
      </div>
      {value === 'custom' && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3" data-testid="admin-attendance-reports-date-filter-custom-range">
          <AdminAttendanceReportsDateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(nextStartDate, nextEndDate) => replaceParams((params) => {
              params.set('range', 'custom');
              if (nextStartDate) params.set('startDate', nextStartDate); else params.delete('startDate');
              if (nextEndDate) params.set('endDate', nextEndDate); else params.delete('endDate');
            })}
          />
          <p className={customRangeValid ? 'text-xs text-secondary' : 'text-xs text-danger'} role="status" data-testid="admin-attendance-reports-date-range-status">{customRangeValid ? t('reports.admin_reports_main.customRangeHelp') : t('reports.admin_reports_main.dateRangeInvalid')}</p>
        </div>
      )}
    </div>
  );
}
