import { redirect } from 'next/navigation';

/** Compatibility entry: preserve the legacy domain URL and send users to its canonical leaf. */
export default function ManagerDashboardPage() {
  redirect('/frontend_manager/manager_dashboard/dashboard_overview');
}
