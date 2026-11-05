"use client";
// RESPONSIBILITY: Route-segment error boundary for the attendance feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_attendance/attendance_dashboard/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/AdminAttendanceDashboardErrorFallback';
import type { AdminAttendanceErrorProps } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardErrorPropsTypes';

/**
 * AdminAttendanceError provides the route-level error boundary for the attendance feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminAttendanceError({ error, reset }: AdminAttendanceErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="attendance" />;
}
