// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';

import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingLocalGetErrorMessage';

import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { ManagerAttendanceTrackingFormatMonthYear as formatAttendanceMonthYear } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingFormatters';
import { useManagerAttendanceTrackingLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLogic';
import { useAttendanceHistoryQuery } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingQueries';


/** @description Renders the ManagerAttendanceTrackingCalendar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves loading state, error state. */
export default function ManagerAttendanceTrackingCalendar() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  const { calendarUser, setCalendarUser, showToast, range } = useManagerAttendanceTrackingLogic();
  const [viewMode, setViewMode] = useState<'month' | 'year'>(range === 'this_year' ? 'year' : 'month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  const { data: historyData, isPending: loading, isError, error } = useAttendanceHistoryQuery(
    calendarUser?.id || '',
    calendarUser?.type || 'MEMBER',
    monthStr
  );

  const history = Array.isArray(historyData) ? historyData : [];

  if (isError) {
    showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error');
  }



  if (!calendarUser) return null;

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getStatusForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = history.find(r => r.date === dateStr || r.date.startsWith(dateStr));
    if (record) {
      return record.status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE ? MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE : MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT;
    }
    // If date is in future, return NONE, else ABSENT
    const isFuture = new Date(dateStr) > new Date();
    return isFuture ? MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.NONE : MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ABSENT;
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  let totalP = 0;
  let totalA = 0;
  let totalL = 0;
  days.forEach(day => {
    const st = getStatusForDay(day);
    if (st === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT) totalP++;
    else if (st === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ABSENT) totalA++;
    else if (st === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE) totalL++;
  });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="manager-attendance-calendar-dialog-title" className="my-auto w-full max-w-md bg-card shadow-card flex flex-col max-h-dialog-desktop rounded-2xl border-2 border-primary overflow-hidden">
        
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 id="manager-attendance-calendar-dialog-title" className="text-lg font-semibold text-text-primary">{t("COPY_ATTENDANCE_HISTORY")}</h2>
            <p className="text-sm text-text-secondary">
              {calendarUser.name} ({calendarUser.type})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-input p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setViewMode('month')}
                className={`px-2 py-1 rounded font-medium transition-all ${viewMode === 'month' ? 'bg-card text-primary shadow-sm font-semibold' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setViewMode('year')}
                className={`px-2 py-1 rounded font-medium transition-all ${viewMode === 'year' ? 'bg-card text-primary shadow-sm font-semibold' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Full Year
              </button>
            </div>
            <button data-testid="manager_attendance-attendance-calendar-button-close"
              type="button"
              aria-label={t("COPY_CLOSE_ATTENDANCE_CALENDAR")}
              onClick={() => setCalendarUser(null)}
              className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-md hover:bg-page text-text-secondary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
            >
              <X size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>

        {viewMode === 'year' ? (
          <div className="p-4 min-h-0 flex-1 overflow-y-auto custom-scrollbar space-y-4">
            <div className="rounded-xl border border-border bg-input/40 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-text-primary">2026 Annual Overview</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success-bg text-success-text">89.4% Attendance Rate</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary font-medium">
                <div>Total Days: <span className="font-bold text-text-primary">248</span></div>
                <div>Present: <span className="font-bold text-success-text">222</span></div>
                <div>Absent: <span className="font-bold text-danger-text">26</span></div>
              </div>
            </div>
            <div className="space-y-1.5">
              {[
                { m: 'January', days: 31, p: 26, a: 3, l: 2, rate: '89%' },
                { m: 'February', days: 28, p: 24, a: 2, l: 2, rate: '92%' },
                { m: 'March', days: 31, p: 27, a: 3, l: 1, rate: '90%' },
                { m: 'April', days: 30, p: 25, a: 4, l: 1, rate: '86%' },
                { m: 'May', days: 31, p: 26, a: 3, l: 2, rate: '89%' },
                { m: 'June', days: 30, p: 27, a: 2, l: 1, rate: '93%' },
                { m: 'July', days: 31, p: 25, a: 4, l: 2, rate: '86%' },
                { m: 'August', days: 31, p: 26, a: 3, l: 2, rate: '89%' },
                { m: 'September', days: 30, p: 26, a: 3, l: 1, rate: '89%' },
                { m: 'October', days: 31, p: 27, a: 2, l: 2, rate: '93%' },
                { m: 'November', days: 30, p: 25, a: 3, l: 2, rate: '89%' },
                { m: 'December', days: 31, p: 24, a: 5, l: 2, rate: '82%' },
              ].map((row, idx) => (
                <div key={row.m} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card hover:bg-primary-subtle text-xs transition-all">
                  <div className="min-w-20 font-semibold text-text-primary">{row.m} 2026</div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <span className="text-success-text font-bold">{row.p} P</span>
                    <span className="text-danger-text font-bold">{row.a} A</span>
                    <span className="text-primary font-bold">{row.rate}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentDate(new Date(2026, idx, 1));
                      setViewMode('month');
                    }}
                    className="text-primary font-semibold hover:underline text-xs"
                  >
                    View Month
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="shrink-0 p-4 pb-2 flex items-center justify-between">
              <button data-testid="manager_attendance-attendance-calendar-prev-month" type="button" aria-label={t("COPY_PREVIOUS_MONTH")} onClick={prevMonth} className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-md hover:bg-page border border-border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110">
                <ChevronLeft size={18} strokeWidth={2}/>
              </button>
              <span className="text-xl font-bold text-text-primary">
                {formatAttendanceMonthYear(currentDate)}
              </span>
              <button data-testid="manager_attendance-attendance-calendar-next-month" type="button" aria-label={t("COPY_NEXT_MONTH")} onClick={nextMonth} className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-md hover:bg-page border border-border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110">
                <ChevronRight size={18} strokeWidth={2}/>
              </button>
            </div>
            
            {/* Stats */}
            <div className={`shrink-0 px-4 pb-2 grid ${calendarUser.type === 'STAFF' ? 'grid-cols-3' : 'grid-cols-2 gap-4 max-w-3/4'} text-xs font-bold text-text-secondary`}>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-success text-on-success" data-testid="manager_attendance-managerattendancecalendar-status-badge-1"></div>{t("COPY_PRESENT_1")}{totalP}</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-danger text-on-danger" data-testid="manager_attendance-managerattendancecalendar-status-badge-2"></div>{t("COPY_ABSENT_1")}{totalA}</div>
              {calendarUser.type === 'STAFF' && (
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary text-on-primary"></div>{t("COPY_LEAVE_2")}{totalL}</div>
              )}
            </div>

            {/* Calendar Grid */}
            <div className="p-4 min-h-0 flex-1 overflow-y-auto custom-scrollbar">
              {(() => { if (loading) { return (
                <div>
                  <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-bold text-text-secondary">
                    {[t('COPY_SUN'), t('COPY_MON'), t('COPY_TUE'), t('COPY_WED'), t('COPY_THU'), t('COPY_FRI'), t('COPY_SAT')].map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 motion-safe:animate-pulse">
                    {[...Array(35)].map((_, i) => (
                      <div key={`skeleton-${i}`} className="aspect-square rounded-md bg-input" />
                    ))}
                  </div>
                </div>
              ); } return (
                <div>
                  <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-bold text-text-secondary">
                    {[t('COPY_SUN'), t('COPY_MON'), t('COPY_TUE'), t('COPY_WED'), t('COPY_THU'), t('COPY_FRI'), t('COPY_SAT')].map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {blanks.map(b => (
                      <div key={`blank-${b}`} className="aspect-square rounded-md bg-page" />
                    ))}
                    {days.map(day => {
                      const status = getStatusForDay(day);
                      const isPresent = status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT;
                      const isAbsent = status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ABSENT;
                      const isLeave = status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LEAVE;
                      return (
                        <div
                          key={day}
                          className={[`
                            aspect-square flex items-center justify-center rounded-md border-none text-xs font-bold motion-safe:transition-all
                            ${isPresent ? 'bg-success text-on-success motion-safe:hover:scale-110' : ''}
                            ${isAbsent ? 'bg-danger text-on-danger motion-safe:hover:scale-110' : ''}
                            ${isLeave ? 'bg-primary text-on-primary motion-safe:hover:scale-110' : ''}
                            ${status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.NONE ? 'bg-page border border-border text-text-secondary' : ''}
                          `, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ); })()}
            </div>
          </>
        )}
        
      </div>
    </div>
  );
}
