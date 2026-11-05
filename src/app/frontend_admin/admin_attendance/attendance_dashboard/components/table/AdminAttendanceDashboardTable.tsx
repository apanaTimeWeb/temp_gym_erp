"use client";
// RESPONSIBILITY: Renders the read-only paginated attendance records table with status badges and duration.
// DATA FLOW: feature data/state and user input → AdminAttendanceDashboardTable → accessible UI/events routed to owning hooks (admin_attendance/attendance_dashboard/components/table/AdminAttendanceDashboardTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { displayValue } from '@/lib/display_value';
import { maskSensitiveData } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardMaskSensitiveData';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardLogic';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/state/useAdminAttendanceDashboardStore';
import AdminAttendanceEmptyState from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/empty_state/AdminAttendanceDashboardEmptyState';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/AdminAttendanceDashboardPagination';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/AdminAttendanceDashboardTableSkeleton';
import { RefreshCw } from 'lucide-react';
import { ATTENDANCE_TABLE_HEADER_KEYS, ATTENDANCE_ITEMS_PER_PAGE, ATTENDANCE_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardConstants';
import { computeDuration, formatAttendanceTime } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardFormatters';

type AttendanceSortKey = 'memberName' | 'branchName' | 'planName' | 'trainerName' | 'checkInTime' | 'checkOutTime' | 'duration' | 'status';
const ATTENDANCE_SORT_KEYS: AttendanceSortKey[] = ['memberName', 'branchName', 'planName', 'trainerName', 'checkInTime', 'checkOutTime', 'duration', 'status'];

const STATUS_STYLES: Record<string, string> = {
  present: 'bg-success text-on-success',
  late:    'bg-warning-bg text-warning',
  absent:  'bg-danger  text-on-danger',
};

/**
 * AdminAttendanceDashboardTable renders the admin attendance table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceDashboardTable: Renders the read-only paginated attendance records table with status badges and duration.
 * @dependencies Consumes AdminNavigationLayoutDisplayValue, AdminNavigationLayoutMaskSensitiveData, useAdminAttendanceLogic, useAdminAttendanceStore, AdminAttendanceEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceDashboardTable() {
  const t = useTranslations();
  const locale = useLocale();
  const { records, allFilteredCount, totalPages, status, error, retryRecords } = useAdminAttendanceLogic();
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();
  const [sortKey, setSortKey] = useState<AttendanceSortKey>('checkInTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const sortedRecords = useMemo(() => [...records].sort((left, right) => {
    const value = (record: typeof left): string | number => {
      if (sortKey === 'duration') {
        const start = Date.parse(record.checkInTime);
        const end = record.checkOutTime ? Date.parse(record.checkOutTime) : Number.NaN;
        return Number.isFinite(start) && Number.isFinite(end) ? end - start : -1;
      }
      if (sortKey === 'checkInTime' || sortKey === 'checkOutTime') {
        const raw = record[sortKey];
        return raw ? Date.parse(raw) : -1;
      }
      return record[sortKey] ?? '';
    };
    const a = value(left); const b = value(right);
    const comparison = typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b), locale, { numeric: true, sensitivity: 'base' });
    return sortDirection === 'asc' ? comparison : -comparison;
  }), [records, sortKey, sortDirection, locale]);

  const hasFilters = search !== '' || statusFilter !== 'all' || branchFilter !== 'all' || dateRange !== 'today';

  if (status === 'pending' && records.length === 0) {
    return <AdminNavigationLayoutTableSkeleton rows={6} cols={ATTENDANCE_TABLE_HEADER_KEYS.length} />;
  }

  if (status === 'error' && records.length === 0) {
    return (
      <div role="alert" className="flex flex-col items-start gap-3 rounded-xl border border-border bg-danger-bg p-5">
        <p className="text-sm text-danger">{error || t('attendance.AdminAttendanceError.text_b304c3222c')}</p>
        <button type="button" onClick={() => void retryRecords()} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="attendance-dashboard-attendance-dashboard-table-retry-records">
          <RefreshCw size={16} strokeWidth={2} aria-hidden="true" />
          {t('attendance.admin_attendance_main.text_9f5cd8a2e8')}
        </button>
      </div>
    );
  }

  if (status === 'success' && records.length === 0) {
    return <AdminAttendanceEmptyState hasFilters={hasFilters} />;
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {ATTENDANCE_TABLE_HEADER_KEYS.map((key, index) => {
                const columnSortKey = ATTENDANCE_SORT_KEYS[index];
                const active = sortKey === columnSortKey;
                return (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (active) setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
                        else { setSortKey(columnSortKey); setSortDirection('asc'); }
                      }}
                      className="inline-flex min-h-11 items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={t('attendance.admin_attendance_table.sortBy', { header: t(key) })}
                     data-testid="attendance-dashboard-attendance-dashboard-table-set-sort-direction">
                      {t(key)}
                      {active ? (sortDirection === 'asc' ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />) : <ChevronsUpDown size={16} aria-hidden="true" />}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedRecords.map((r) => (
              <tr key={r.id} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {r.memberName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">{r.memberName}</p>
                      <p className="text-xs text-secondary">
                        {maskSensitiveData(r.memberPhone)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{r.branchName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{r.planName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">
                    {r.sessionType === 'PT' ? displayValue(r.trainerName) : displayValue(null)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {formatAttendanceTime(r.checkInTime, locale)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {formatAttendanceTime(r.checkOutTime, locale)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-secondary">
                    {computeDuration(r.checkInTime, r.checkOutTime)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[r.status] ?? 'bg-input text-secondary'}`}
                    data-testid={`admin_attendance-admin_attendance-table-status-${r.id}`}
                  >
                    {t(ATTENDANCE_STATUS_LABEL_KEYS[r.status] ?? r.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border px-4 pt-2">
        <p className="text-xs text-secondary">{t('attendance.admin_attendance_table.pageSortNotice')}</p>
      </div>
      <div className="border-t border-border">
        <AdminNavigationLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={allFilteredCount}
          itemsPerPage={ATTENDANCE_ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
