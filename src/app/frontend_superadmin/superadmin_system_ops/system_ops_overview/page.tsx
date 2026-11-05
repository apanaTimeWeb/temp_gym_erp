import { Suspense } from 'react';

import { SuperadminSystemOpsOverviewErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewErrorBoundary';
import SuperadminSystemOpsOverviewMain from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewPageSuspenseSkeleton';

import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'System Operations | Superadmin', description: 'Review system operations, infrastructure, backup, job, and migration status.' };

/** Canonical overview leaf retains the existing infrastructure view while redirecting leaf-level legacy query states. */
export default function SystemOpsOverviewPage() {
  return (
    <SuperadminSystemOpsOverviewErrorBoundary>
      <Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}>
        <SuperadminSystemOpsOverviewMain />
      </Suspense>
    </SuperadminSystemOpsOverviewErrorBoundary>
  );
}
