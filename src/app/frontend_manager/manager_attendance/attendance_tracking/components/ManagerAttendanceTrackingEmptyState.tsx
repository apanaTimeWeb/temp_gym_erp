// RESPONSIBILITY: Renders the Manager Attendance entity-specific empty state; the parent table owns data/query state.
'use client';
import { CalendarCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';


/** @description Empty-state presentation for an Attendance records table when no rows match the active request. */
/**
 * @description Renders ManagerAttendanceTrackingEmptyState, the manager attendance UI responsibility owned by this module.
 * @dependencies Consumes module-owned hooks/state and approved zero-business UI primitives; no business behavior is delegated to global components.
 * @edge-case Handles the documented loading, empty, error, disabled, keyboard, responsive, and recovery states without introducing cross-feature ownership.
 */
export default function ManagerAttendanceTrackingEmptyState() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');
  return <div data-testid="manager_attendance-attendance-empty-state" className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-8 text-center"><div className="mb-1 text-muted-foreground" aria-hidden="true"><CalendarCheck size={18} strokeWidth={2} /></div><h3 className="text-sm font-semibold text-foreground">{t('COPY_NO_ATTENDANCE_RECORDS')}</h3><p className="max-w-md text-sm text-muted-foreground">{t('COPY_THERE_NO_CHECK_INS_DATE_FILTER_YET')}</p></div>;
}
