import { redirect } from 'next/navigation';

export default function FrontendAdminIndexPage() {
  redirect('/frontend_admin/admin_dashboard/dashboard_overview');
}

