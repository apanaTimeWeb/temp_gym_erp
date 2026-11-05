// RESPONSIBILITY: Provides a sanitized adapter boundary for host-owned frontend error monitoring.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/utils/AdminNavigationLayoutMonitoring.ts)

import type { AdminMonitoringEvent } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementMonitoringTypes';
import type { AdminMonitoringAdapter } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementMonitoringTypes';



let monitoringAdapter: AdminMonitoringAdapter | null = null;

/**
 * Registers the host application's approved observability adapter. The adapter implementation and
 * credentials remain host-owned; the role package never posts diagnostics to a page route or sends
 * raw error messages/stacks/PII to an invented endpoint.
 */
export function configureAdminMonitoringAdapter(adapter: AdminMonitoringAdapter | null): void {
  monitoringAdapter = adapter;
}

/** Reports only the allow-listed diagnostic fields when the host has installed its approved adapter. */
export function logErrorToMonitoring(error: Error & { digest?: string }, context: { module: string; route?: string }): void {
  if (!monitoringAdapter) return;
  monitoringAdapter.captureException({
    errorName: error.name || 'Error',
    ...(error.digest ? { digest: error.digest } : {}),
    module: context.module,
    ...(context.route ? { route: context.route } : {}),
    timestamp: new Date().toISOString(),
  });
}
