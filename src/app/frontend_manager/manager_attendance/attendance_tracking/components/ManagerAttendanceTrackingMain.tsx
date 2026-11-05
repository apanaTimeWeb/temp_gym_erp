// RESPONSIBILITY: Renders ManagerAttendanceTrackingMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerAttendanceTrackingContent } from '@/app/frontend_manager/manager_attendance/attendance_tracking/components/ManagerAttendanceTrackingContent';

/** @description Entry component for the Attendance module that wraps the UI in the hook-based state facade and handles the core page layout. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerAttendanceTrackingMain() {
  return <ManagerAttendanceTrackingContent />;
}
