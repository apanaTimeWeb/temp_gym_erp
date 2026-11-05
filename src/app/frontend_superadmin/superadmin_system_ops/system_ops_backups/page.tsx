import { Suspense } from 'react';

import { SuperadminSystemOpsBackupsErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/components/SuperadminSystemOpsBackupsErrorBoundary';
import SuperadminSystemOpsBackupsMain from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/components/SuperadminSystemOpsBackupsMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/components/SuperadminSystemOpsBackupsPageSuspenseSkeleton';


/** Canonical route entry: renders the autonomous backups leaf without loading sibling feature components. */
export default function SystemOpsBackupsLeafPage() {
  return <SuperadminSystemOpsBackupsErrorBoundary><Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}><SuperadminSystemOpsBackupsMain /></Suspense></SuperadminSystemOpsBackupsErrorBoundary>;
}
