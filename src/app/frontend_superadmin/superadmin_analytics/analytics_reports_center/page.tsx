// RESPONSIBILITY: Renders the page component and its associated UI logic.
import { Suspense } from 'react';

import SuperadminAnalyticsReportsMain from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_main/SuperadminAnalyticsReportsCenterMain';
import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/SuperadminAnalyticsReportsCenterPageSuspenseSkeleton';


/**
 * @description Renders the page component and its associated UI logic.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function ReportsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminAnalyticsReportsMain />
    </Suspense>);
}
