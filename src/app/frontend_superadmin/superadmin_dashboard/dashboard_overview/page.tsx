// RESPONSIBILITY: Renders/orchestrates page within its owning Superadmin feature module; no direct backend implementation.
import { Suspense } from 'react';

import SuperadminDashboardMain from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewMain';
import { SuperadminDashboardOverviewErrorBoundary } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/SuperadminDashboardOverviewErrorBoundary';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/SuperadminDashboardOverviewPageSuspenseSkeleton';


// RESPONSIBILITY: Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardMain.


/**
 * @description Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardMain.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SaaSDashboardPage() {
    return (<SuperadminDashboardOverviewErrorBoundary>
      <Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
        <SuperadminDashboardMain />
      </Suspense>
    </SuperadminDashboardOverviewErrorBoundary>);
}
