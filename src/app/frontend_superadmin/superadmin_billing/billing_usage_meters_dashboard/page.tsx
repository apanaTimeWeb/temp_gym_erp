// RESPONSIBILITY: Renders the page component.
import { Suspense } from 'react';

import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/components/SuperadminBillingUsageMetersDashboardPageSuspenseSkeleton';
import SuperadminBillingUsageMetersMain from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/components/usage_meters_dashboard_main/SuperadminBillingUsageMetersDashboardMain';


/**
 * @description Renders the page component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function UsageMetersPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBillingUsageMetersMain />
    </Suspense>);
}
