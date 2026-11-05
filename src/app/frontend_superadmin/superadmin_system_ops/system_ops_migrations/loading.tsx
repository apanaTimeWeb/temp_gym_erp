// RESPONSIBILITY: App Router loading surface for this System Ops child route.
import SuperadminPlatformShellLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/components/SuperadminSystemOpsMigrationsPageSuspenseSkeleton';

/**
 * @description Shows the shared role loading skeleton while the route content streams.
 * @dependencies Uses the role-level loading primitive only.
 * @edge-case Keeps layout stable during slow navigation without visible hardcoded copy.
 */
export default function Loading() {
  return <SuperadminPlatformShellLayoutPageSuspenseSkeleton />;
}
