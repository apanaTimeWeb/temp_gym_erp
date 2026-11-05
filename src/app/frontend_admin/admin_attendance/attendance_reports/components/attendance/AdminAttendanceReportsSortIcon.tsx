"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for an Admin Reports attendance header.
// DATA FLOW: feature data/state and user input → AdminAttendanceReportsSortIcon → accessible UI/events routed to owning hooks (admin_attendance/attendance_reports/components/attendance/AdminAttendanceReportsSortIcon.tsx)

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AttendanceSortDirection, AttendanceSortKey } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTableTypes';

import type { AdminAttendanceReportsSortIconProps } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsSortIconPropsTypes';


/**
 * AdminAttendanceReportsSortIcon renders the admin reports attendance sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceReportsSortIcon: Renders the sortable-direction icon for an Admin Reports attendance header.
 * @dependencies Consumes AdminAttendanceReportsTypes, AdminAttendanceReportsSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceReportsSortIcon({ column, sortKey, sortDir }: AdminAttendanceReportsSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
