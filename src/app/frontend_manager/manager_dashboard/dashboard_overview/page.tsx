// Autonomous leaf route for the Manager Dashboard overview.
// The existing parent route remains live as a compatibility entry during migration.
import { Suspense } from 'react';
import ManagerDashboardOverviewMain from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewMain';
import Loading from '@/app/frontend_manager/manager_dashboard/dashboard_overview/loading';

export default function ManagerDashboardOverviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ManagerDashboardOverviewMain />
    </Suspense>
  );
}
