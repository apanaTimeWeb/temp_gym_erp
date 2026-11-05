import { redirect } from 'next/navigation';

export default function FrontendManagerIndexPage() {
  redirect('/frontend_manager/manager_dashboard/dashboard_overview');
}

