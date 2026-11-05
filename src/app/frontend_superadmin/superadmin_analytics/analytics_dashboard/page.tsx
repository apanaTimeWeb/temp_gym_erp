// RESPONSIBILITY: Renders the page component.
import { Suspense } from 'react';

import SuperadminAnalyticsMain from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_main/SuperadminAnalyticsDashboardMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/SuperadminAnalyticsDashboardPageSuspenseSkeleton';



/**
 * @description Renders the page component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function AnalyticsPage() {
    return (<Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
      <SuperadminAnalyticsMain />
    </Suspense>);
}
