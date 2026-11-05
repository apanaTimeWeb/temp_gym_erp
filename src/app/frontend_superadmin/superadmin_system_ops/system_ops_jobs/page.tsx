import { Suspense } from 'react';

import { SuperadminSystemOpsJobsErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsErrorBoundary';
import SuperadminSystemOpsJobsMain from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsPageSuspenseSkeleton';


/** Canonical route entry: renders the autonomous jobs leaf without loading sibling feature components. */
export default function SystemOpsJobsLeafPage() {
  return <SuperadminSystemOpsJobsErrorBoundary><Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}><SuperadminSystemOpsJobsMain /></Suspense></SuperadminSystemOpsJobsErrorBoundary>;
}
