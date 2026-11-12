// RESPONSIBILITY: Preserves legacy ?view= entry points but redirects leaf screens to their autonomous routes.
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SuperadminSystemOpsOverview from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverview';
import SuperadminSystemOpsOverviewPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverviewPageSuspenseSkeleton';
import { SUPERADMIN_SYSTEM_OPS_OVERVIEW_ROUTES as SUPERADMIN_SYSTEM_OPS_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/config/superadmin_system_ops_overview.url_config';

const LEGACY_TO_CANONICAL_ROUTE = {
  infrastructure: SUPERADMIN_SYSTEM_OPS_ROUTES.CANONICAL_INFRASTRUCTURE,
  backups: SUPERADMIN_SYSTEM_OPS_ROUTES.CANONICAL_BACKUPS,
  jobs: SUPERADMIN_SYSTEM_OPS_ROUTES.CANONICAL_JOBS,
  migrations: SUPERADMIN_SYSTEM_OPS_ROUTES.CANONICAL_MIGRATIONS,
  cache_management: '/frontend_superadmin/superadmin_system_ops/system_ops_cache_management',
  cache: '/frontend_superadmin/superadmin_system_ops/system_ops_cache_management',
} as const;
type LegacyLeafView = keyof typeof LEGACY_TO_CANONICAL_ROUTE;

/** Preserves legacy ?view= entry points but redirects leaf screens to their autonomous routes. */
export default function SuperadminSystemOpsOverviewMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedView = searchParams.get('view');
  const target = requestedView && Object.hasOwn(LEGACY_TO_CANONICAL_ROUTE, requestedView)
    ? LEGACY_TO_CANONICAL_ROUTE[requestedView as LegacyLeafView]
    : null;

  useEffect(() => {
    if (target) router.replace(target);
  }, [router, target]);

  if (target) return <SuperadminSystemOpsOverviewPageSuspenseSkeleton />;
  return <SuperadminSystemOpsOverview />;
}
