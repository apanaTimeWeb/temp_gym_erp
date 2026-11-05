import { Suspense } from 'react';

import { SuperadminSystemOpsMigrationsErrorBoundary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/components/SuperadminSystemOpsMigrationsErrorBoundary';
import SuperadminSystemOpsMigrationsMain from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/components/SuperadminSystemOpsMigrationsMain';
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/components/SuperadminSystemOpsMigrationsPageSuspenseSkeleton';


/** Canonical route entry: renders the autonomous migrations leaf without loading sibling feature components. */
export default function SystemOpsMigrationsLeafPage() {
  return <SuperadminSystemOpsMigrationsErrorBoundary><Suspense fallback={<SuperadminPlatformShellLayoutPageSuspenseSkeleton />}><SuperadminSystemOpsMigrationsMain /></Suspense></SuperadminSystemOpsMigrationsErrorBoundary>;
}
