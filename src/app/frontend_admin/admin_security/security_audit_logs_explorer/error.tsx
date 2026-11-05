"use client";
// RESPONSIBILITY: Route-segment error boundary for the audit logs feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_audit_logs/audit_logs_explorer/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/AdminSecurityAuditLogsExplorerErrorFallback';
import type { AdminAuditLogsErrorProps } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerErrorPropsTypes';

/**
 * AdminAuditLogsError provides the route-level error boundary for the audit logs feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminAuditLogsError({ error, reset }: AdminAuditLogsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="audit_logs" />;
}
