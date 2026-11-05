"use client";
// RESPONSIBILITY: Empty state shown when attendance table has zero rows matching current filters.
// DATA FLOW: feature data/state and user input → AdminAttendanceDashboardEmptyState → accessible UI/events routed to owning hooks (admin_attendance/attendance_dashboard/components/empty_state/AdminAttendanceDashboardEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { CalendarX } from 'lucide-react';

import type { AdminAttendanceEmptyStateProps } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardEmptyStatePropsTypes';


/**
 * AdminAttendanceDashboardEmptyState renders the admin attendance empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceDashboardEmptyState: Empty state shown when attendance table has zero rows matching current filters.
 * @dependencies Consumes AdminAttendanceEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceDashboardEmptyState({ hasFilters }: AdminAttendanceEmptyStateProps) {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3" data-testid="admin_attendance-admin_attendance-empty-state-state">
      <div className="w-14 h-14 rounded-full bg-input flex items-center justify-center">
        <CalendarX size={18} strokeWidth={2} className="text-secondary" />
      </div>
      <p className="text-base font-semibold text-primary">
        {hasFilters ? t('attendance.admin_attendance_empty_state.auto_78cd6b3dc7') : t('attendance.admin_attendance_empty_state.auto_8da6855922')}
      </p>
      <p className="text-sm text-secondary text-center max-w-xs">
        {hasFilters
          ? t('attendance.admin_attendance_empty_state.auto_7727fbc5ff')
          : t('attendance.admin_attendance_empty_state.auto_c615f80782')}
      </p>
    </div>
  );
}
