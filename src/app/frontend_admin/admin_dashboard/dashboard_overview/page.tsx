// RESPONSIBILITY: Server Component entry point for the admin dashboard.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_dashboard/dashboard_overview/page.tsx)

import AdminDashboardMain from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/main_view/AdminDashboardOverviewMain';

/**
 * DashboardPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function DashboardPage() {
  return (
      <AdminDashboardMain />
  );
}
