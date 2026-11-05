// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_audit_logs/audit_logs_explorer/loading.tsx)

import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/AdminSecurityAuditLogsExplorerTableSkeleton';

/**
 * AdminAuditLogsLoading renders the admin audit logs loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminAuditLogsLoading() {
  return (
    <div className="p-6 space-y-5" data-testid="admin_audit_logs-loading-state">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`audit-logs-skeleton-${i}`} className="h-24 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>
      <div className="h-20 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <AdminNavigationLayoutTableSkeleton rows={8} cols={6} />
    </div>
  );
}
