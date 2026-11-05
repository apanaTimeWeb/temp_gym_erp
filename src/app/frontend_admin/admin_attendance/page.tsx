// RESPONSIBILITY: Defines the page route, lifecycle boundary, or module support artifact for page.tsx; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_attendance/page.tsx)

import { redirect } from 'next/navigation';
import { ADMIN_ATTENDANCE_ROUTES } from "@/app/frontend_admin/admin_attendance/attendance_dashboard/config/admin_attendance_dashboard.url_config";

/** Domain entry redirects to its autonomous feature leaf. Only canonical leaf routes are supported. */
export default function AdminAttendanceDomainRedirect() {
  redirect(ADMIN_ATTENDANCE_ROUTES.root);
}
