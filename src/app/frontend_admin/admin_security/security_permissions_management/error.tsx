"use client";
// RESPONSIBILITY: Route-segment error boundary for the permissions feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_permissions/permissions_management/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_security/security_permissions_management/components/AdminSecurityPermissionsManagementErrorFallback';
import type { AdminPermissionsErrorProps } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementErrorPropsTypes';

/**
 * AdminPermissionsError provides the route-level error boundary for the permissions feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminPermissionsError({ error, reset }: AdminPermissionsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="permissions" />;
}
