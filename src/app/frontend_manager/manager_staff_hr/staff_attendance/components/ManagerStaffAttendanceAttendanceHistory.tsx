// RESPONSIBILITY: Renders read-only attendance history and distinguishes roster state from the selected staff/month query state.
'use client';

import { useLocale, useTranslations } from 'next-intl';

import ManagerStaffAttendanceEmptyState from '@/app/frontend_manager/manager_staff_hr/staff_attendance/components/ManagerStaffAttendanceEmptyState';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import {
  MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES,
  MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT,
} from '@/app/frontend_manager/manager_staff_hr/staff_attendance/constants/manager_staff_payroll_and_attendance.constants';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceLogic';
import { useManagerStaffPayrollAndAttendanceAttendanceHistoryUrlState } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceAttendanceHistoryUrlState';
import { useManagerStaffPayrollAndAttendanceStaffAttendanceQuery } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceStaffAttendanceQuery';
import {
  ManagerStaffPayrollAndAttendanceFormatDate,
  ManagerStaffPayrollAndAttendanceDisplayValue,
} from '@/app/frontend_manager/manager_staff_hr/staff_attendance/utils/ManagerStaffAttendanceFormatters';
import type { ManagerStaffPayrollAndAttendanceStaffAttendanceRecord } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_payroll_and_attendance_staff_attendance.types';

const ATTENDANCE_COLUMN_COUNT = 4;

function getStatusClass(status: string) {
  if (status === MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT) return 'bg-success-bg text-success-text border-success';
  if (status === MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.ABSENT) return 'bg-danger-bg text-danger-text border-danger';
  return 'bg-warning-bg text-warning-text border-warning';
}

function RetryState({ message, onRetry, label }: { message: string; onRetry: () => void; label: string }) {
  return (
    <div className="p-8 text-center" role="alert">
      <p className="text-sm text-danger-text">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        {label}
      </button>
    </div>
  );
}

export default function ManagerStaffPayrollAndAttendanceAttendanceHistory() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();

  const {
    staff,
    isPending: isRosterPending,
    isError: isRosterError,
    error: rosterError,
    loadAll: retryRoster,
  } = useManagerStaffPayrollAndAttendanceLogic();
  const { selectedStaffId, setSelectedStaffId, month, setMonth } = useManagerStaffPayrollAndAttendanceAttendanceHistoryUrlState();

  const effectiveStaffId = selectedStaffId || staff[0]?.id || '';
  const {
    data,
    isPending: isAttendancePending,
    isError: isAttendanceError,
    error: attendanceError,
    refetch: retryAttendance,
  } = useManagerStaffPayrollAndAttendanceStaffAttendanceQuery(effectiveStaffId, month);
  const history: ManagerStaffPayrollAndAttendanceStaffAttendanceRecord[] = data?.data?.history ?? [];

  const noStaff = staff.length === 0;
  const showRosterLoading = noStaff && isRosterPending;
  const showRosterError = noStaff && isRosterError;
  const showNoStaff = noStaff && !isRosterPending && !isRosterError;
  const showAttendanceLoading = Boolean(effectiveStaffId) && isAttendancePending;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <div>
          <h2 className="text-lg font-bold text-text-primary">{t('COPY_TRAINER_ATTENDANCE_HISTORY')}</h2>
          <p className="text-sm text-text-secondary">{t('COPY_READ_ONLY_ATTENDANCE_RECORDS_SUPPLIED_MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ATTENDANCE_API')}</p>
        </div>
        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          <div className="min-w-56">
            <label className="mb-1 block text-xs text-text-secondary" htmlFor="manager-hr-attendance-staff">{t('COPY_STAFF_MEMBER_3')}</label>
            <ManagerSearchableDropdown
              dataTestId="manager_hr-managerhrattendancehistory-managersearchabledropdown-1"
              value={effectiveStaffId}
              onChange={(value) => setSelectedStaffId(String(value))}
              options={staff.map((member) => ({ value: member.id, label: `${member.name} (${member.role})` }))}
              placeholder={t('COPY_SELECT_STAFF_1')}
              data-testid="manager_hr-managerhrattendancehistory-searchable-dropdown-1"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary" htmlFor="manager-hr-attendance-month">{t('COPY_MONTH_2')}</label>
            <input
              id="manager-hr-attendance-month"
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={[t('COPY_DATE_2'), t('COPY_STATUS_2'), t('COPY_CHECK'), t('COPY_CHECK_OUT')]}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-highlight">
                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-text-secondary">{t('COPY_DATE_2')}</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-text-secondary">{t('COPY_STATUS_2')}</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-text-secondary">{t('COPY_CHECK')}</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wide text-text-secondary">{t('COPY_CHECK_OUT')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {showRosterLoading || showAttendanceLoading ? (
                [1, 2, 3, 4, 5].map((skeletonRow) => (
                  <tr key={`attendance-loading-row-${skeletonRow}`} className="motion-safe:animate-pulse">
                    {Array.from({ length: ATTENDANCE_COLUMN_COUNT }, (_, cellIndex) => (
                      <td key={`attendance-loading-row-${skeletonRow}-cell-${cellIndex + 1}`} className="p-4"><div className="h-4 w-24 rounded bg-input" /></td>
                    ))}
                  </tr>
                ))
              ) : showRosterError ? (
                <tr><td colSpan={ATTENDANCE_COLUMN_COUNT}><RetryState message={rosterError || t('TEXT_GENERIC_ERROR')} onRetry={() => { void retryRoster(); }} label={t('COPY_TRY_AGAIN')} /></td></tr>
              ) : showNoStaff ? (
                <tr><td colSpan={ATTENDANCE_COLUMN_COUNT}><ManagerStaffAttendanceEmptyState message={t('TEXT_NO_STAFF')} /></td></tr>
              ) : isAttendanceError ? (
                <tr><td colSpan={ATTENDANCE_COLUMN_COUNT}><RetryState message={ManagerInfrastructureGetErrorMessage(attendanceError, t('TEXT_GENERIC_ERROR'))} onRetry={() => { void retryAttendance(); }} label={t('COPY_TRY_AGAIN')} /></td></tr>
              ) : history.length === 0 ? (
                <tr><td colSpan={ATTENDANCE_COLUMN_COUNT}><ManagerStaffAttendanceEmptyState message={t('COPY_NO_ATTENDANCE_RECORDS_WERE_RETURNED_SELECTED_MONTH')} /></td></tr>
              ) : (
                history.map((record) => (
                  <tr key={`${record.date}-${record.status}`}>
                    <td className="p-4 text-text-primary">{ManagerStaffPayrollAndAttendanceFormatDate(record.date, locale)}</td>
                    <td className="p-4">
                      <span
                        data-testid={`manager_hr-manager-hr-attendance-history-status-${record.date}-${record.status}`}
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(record.status ?? '')}`}
                      >
                        {ManagerStaffPayrollAndAttendanceDisplayValue(record.status)}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary">{ManagerStaffPayrollAndAttendanceDisplayValue(record.checkIn)}</td>
                    <td className="p-4 text-text-secondary">{ManagerStaffPayrollAndAttendanceDisplayValue(record.checkOut)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}
