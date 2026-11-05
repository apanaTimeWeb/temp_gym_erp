"use client";
// RESPONSIBILITY: Renders a consistent empty state for an Admin reports data section.
// DATA FLOW: feature data/state and user input → AdminAttendanceReportsEmptyState → accessible UI/events routed to owning hooks (admin_attendance/attendance_reports/components/empty_state/AdminAttendanceReportsEmptyState.tsx)

import { BarChart3 } from 'lucide-react';

import type { AdminAttendanceReportsEmptyStateProps } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsEmptyStatePropsTypes';


/**
 * AdminAttendanceReportsEmptyState renders the admin reports empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceReportsEmptyState: Renders a consistent empty state for an Admin reports data section.
 * @dependencies Consumes AdminAttendanceReportsEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminAttendanceReportsEmptyState({ title, description }: AdminAttendanceReportsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center" data-testid="admin_attendance-admin_attendance-empty-state-state">
      <BarChart3 size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
