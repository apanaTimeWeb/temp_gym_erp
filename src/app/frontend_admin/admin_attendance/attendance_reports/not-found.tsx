// RESPONSIBILITY: Renders/orchestrates not-found for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_attendance/attendance_reports/not-found.tsx)

import AdminAttendanceReportsNotFound from '@/app/frontend_admin/admin_attendance/attendance_reports/components/shell/AdminAttendanceReportsNotFound';

/**
 * NotFound is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function NotFound() {
  return <AdminAttendanceReportsNotFound />;
}

