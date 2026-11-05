// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { Clock, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/ManagerAttendanceTrackingLocalPaginationDefaults';

import { ManagerAttendanceTrackingCheckInMethodBadge } from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingCheckInMethodBadge';
import ManagerAttendanceTrackingEmptyState from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingEmptyState';
import { ATTENDANCE_TABLE_HEADERS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';
import { ManagerAttendanceTrackingFormatTime as formatTime } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingFormatters';
import { useManagerAttendanceTrackingLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLogic';
import { ManagerAttendanceTrackingDisplayValue, ManagerAttendanceTrackingFormatDate } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingFormatters';
import type { ManagerAttendanceTrackingPersonType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';

// CRITICAL FIX: Added Check-Out, Duration, and Method columns for time-tracking analytics.



/** Formats durationMinutes into a readable "Xh Ym" string. */
/**
 * @description Provides the `formatDuration` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function getAttendanceTypeSurface(type: ManagerAttendanceTrackingPersonType): string {
  if (type === 'MEMBER') return 'bg-info-bg';
  return 'bg-success-bg';
}

function getAttendanceTypeBadgeSurface(type: ManagerAttendanceTrackingPersonType): string {
  if (type === 'MEMBER') return 'bg-info text-on-info';
  return 'bg-success text-on-success';
}

function normalizeAttendanceStatus(status: string | undefined, checkIn: string | undefined): string {
  const normalized = (status || '').trim().toUpperCase();
  if (normalized === 'PRESENT' || normalized === 'PRESENT_DISPLAY') return 'PRESENT';
  if (normalized === 'ABSENT' || normalized === 'ABSENT_DISPLAY') return 'ABSENT';
  if (normalized === 'LATE') return 'LATE';
  if (normalized === 'LEAVE' || normalized === 'ON_LEAVE') return 'LEAVE';
  return checkIn ? 'PRESENT' : 'ABSENT';
}

function getAttendanceStatusSurface(status: string): string {
  if (status === 'PRESENT') return 'bg-success text-on-success';
  if (status === 'LATE') return 'bg-warning-bg text-warning-text';
  if (status === 'LEAVE') return 'bg-info-bg text-info-text';
  return 'bg-danger text-on-danger';
}

function getAttendanceStatusLabel(status: string, t: (key: string) => string): string {
  if (status === 'PRESENT') return t('COPY_PRESENT_3');
  if (status === 'LATE') return t('COPY_LATE');
  if (status === 'LEAVE') return t('COPY_LEAVE_1');
  return t('COPY_ABSENT_2');
}

/** @description Renders the ManagerAttendanceTrackingTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerAttendanceTrackingTable() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  const { records, totalRecords, isPending, isError, errorMessage, currentPage, setCurrentPage, setCalendarUser } = useManagerAttendanceTrackingLogic();

  const totalPages = Math.max(1, Math.ceil(totalRecords / MANAGER_ITEMS_PER_PAGE));
  const paginatedRecords = records;

  return (
    <div className="flex flex-col w-full">
      {(() => { if (isPending) return (<div className="motion-safe:animate-pulse bg-card rounded-xl border border-border p-4">
          {[...Array(5)].map((_, i) => (<div key={`skeleton-${i}`} className="h-16 border-b border-border flex items-center px-4 gap-4">
              <div className="h-8 w-8 bg-input rounded-full"></div>
              <div className="h-4 bg-input rounded w-32"></div>
              <div className="h-4 bg-input rounded-full w-16"></div>
              <div className="h-4 bg-input rounded w-20"></div>
              <div className="h-4 bg-input rounded w-20"></div>
              <div className="h-4 bg-input rounded w-16"></div>
              <div className="h-4 bg-input rounded w-16"></div>
            </div>))}
        </div>); return (() => { if (isError) return (<div className="text-center py-16 bg-card rounded-2xl border border-danger m-4">
          <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
          <span className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST")}</span>
        </div>); return (
          <ManagerInfrastructureResponsiveTable labels={ATTENDANCE_TABLE_HEADERS}>
<table className="w-full">
            <thead className="bg-input border-b border-border">
              <tr>
                {ATTENDANCE_TABLE_HEADERS.map(h => (<th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-2.5 py-3 whitespace-nowrap">
                    {h}
                  </th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedRecords.map((r, mapIndex) => (<tr data-testid={`manager_attendance-attendance-attendancetable-row-${r.id}`} key={r.id} tabIndex={0} role="button" aria-label={t("TEXT_VIEW_ATTENDANCE_HISTORY", { value: r.member?.name || r.staff?.name || t("TEXT_RECORD_FALLBACK") })} onClick={() => setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendanceTrackingPersonType })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendanceTrackingPersonType });
    } }} className="cursor-pointer hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                  {/* Name */}
                  <td className="px-2.5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 max-w-[140px]">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-text-primary text-xs font-bold shrink-0 ${getAttendanceTypeSurface(r.type as ManagerAttendanceTrackingPersonType)}`}>
                        {(r.member?.name || r.staff?.name || '?').charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-text-primary truncate">
                        {ManagerAttendanceTrackingDisplayValue(r.member?.name ?? r.staff?.name)}
                      </span>
                    </div>
                  </td>
                  {/* Type */}
                  <td className="px-2.5 py-3 whitespace-nowrap">
                    <span data-testid={`manager_attendance-attendance-attendancetable-type-${r.id}`} className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getAttendanceTypeBadgeSurface(r.type as ManagerAttendanceTrackingPersonType)}`}>
                      {r.type}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-2.5 py-3 whitespace-nowrap">
                    <span data-testid={`manager_attendance-attendance-attendancetable-status-${r.id}`} className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getAttendanceStatusSurface(normalizeAttendanceStatus(r.status, r.checkIn))}`}>
                      {getAttendanceStatusLabel(normalizeAttendanceStatus(r.status, r.checkIn), t)}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-2.5 py-3 text-sm text-text-secondary whitespace-nowrap">{ManagerAttendanceTrackingFormatDate(r.date)}</td>
                  {/* Check In */}
                  <td className="px-2.5 py-3 text-xs text-text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} strokeWidth={2} className="opacity-50 shrink-0"/>
                      {formatTime(r.checkIn)}
                    </div>
                  </td>
                  {/* Check Out — CRITICAL FIX */}
                  <td className="px-2.5 py-3 text-xs text-text-secondary whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} strokeWidth={2} className="opacity-50 shrink-0"/>
                      {formatTime(r.checkOut ?? r.checkOutTime)}
                    </div>
                  </td>
                  {/* Duration — CRITICAL FIX */}
                  <td className="px-2.5 py-3 text-sm text-text-secondary whitespace-nowrap">
                    {formatDuration(r.durationMinutes)}
                  </td>
                  {/* Method — CRITICAL FIX */}
                  <td className="px-2.5 py-3 whitespace-nowrap">
                    <ManagerAttendanceTrackingCheckInMethodBadge method={r.checkInMethod}/>
                  </td>
                  {/* Actions */}
                  <td className="px-2.5 py-3 text-sm whitespace-nowrap">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-md hover:bg-primary-subtle text-primary motion-safe:transition-all flex items-center gap-1 border border-transparent hover:border-border motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_attendance-attendance-managerattendancetable-button-view-monthly-calendar-${mapIndex}`} onClick={(event) => { event.stopPropagation(); setCalendarUser({ id: String(r.memberId || r.staffId || r.id), name: String(r.member?.name || r.staff?.name || ''), type: r.type as ManagerAttendanceTrackingPersonType }); }}  title={t("COPY_VIEW_MONTHLY_CALENDAR")} aria-label={t("COPY_VIEW_MONTHLY_ATTENDANCE_CALENDAR")} type="button">
                      <Calendar size={18} strokeWidth={2} data-testid="manager_attendance-managerattendancetable-interactive"/>
                      <span className="text-xs font-medium">{t("COPY_HISTORY")}</span>
                    </button>
                  </td>
                </tr>))}
              {records.length === 0 && (<tr>
                  <td colSpan={ATTENDANCE_TABLE_HEADERS.length} className="p-0 border-b-0">
                    <ManagerAttendanceTrackingEmptyState />
                  </td>
                </tr>)}
            </tbody>
          </table>
</ManagerInfrastructureResponsiveTable>
        ); })(); })()}

      <div className="border-t border-border p-4">
        <ManagerPagination data-testid="manager_attendance-managerattendancetable-managerpagination-1"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
