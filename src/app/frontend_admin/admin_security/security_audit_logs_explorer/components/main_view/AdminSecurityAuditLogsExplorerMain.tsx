"use client";
// RESPONSIBILITY: Composes the Audit Logs KPI summary, documented filters, immutable table, and detail drawer flow.
// DATA FLOW: feature data/state and user input → AdminSecurityAuditLogsExplorerMain → accessible UI/events routed to owning hooks (admin_audit_logs/audit_logs_explorer/components/main_view/AdminSecurityAuditLogsExplorerMain.tsx)

/**
 * @description AdminSecurityAuditLogsExplorerMain: Composes the Audit Logs KPI summary, documented filters, immutable table, and detail drawer flow.
 * @dependencies Consumes AdminAuditLogsKPIs, AdminAuditLogsToolbar, AdminAuditLogsTable.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import AdminAuditLogsKPIs from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/kpis/AdminSecurityAuditLogsExplorerKPIs';
import AdminAuditLogsToolbar from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/toolbar/AdminSecurityAuditLogsExplorerToolbar';
import AdminAuditLogsTable from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/table/AdminSecurityAuditLogsExplorerTable';

/** Keeps the Admin Audit Logs page itself free of API calls and server-state ownership.
 */
/**
 * @description Orchestrates the / feature view and composes feature-owned sections without owning API transport or validation.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityAuditLogsExplorerMain() {
  return <div className="min-h-full pb-10"><div className="space-y-5 p-6"><AdminAuditLogsKPIs /><AdminAuditLogsToolbar /><AdminAuditLogsTable /></div></div>;
}
