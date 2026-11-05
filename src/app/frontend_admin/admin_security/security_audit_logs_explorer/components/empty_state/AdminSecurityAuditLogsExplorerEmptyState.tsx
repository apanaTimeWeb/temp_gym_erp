"use client";
// RESPONSIBILITY: Renders the empty state for the Admin audit log table.
// DATA FLOW: feature data/state and user input → AdminSecurityAuditLogsExplorerEmptyState → accessible UI/events routed to owning hooks (admin_audit_logs/audit_logs_explorer/components/empty_state/AdminSecurityAuditLogsExplorerEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { ShieldAlert } from 'lucide-react';

/**
 * AdminSecurityAuditLogsExplorerEmptyState renders the admin audit logs empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSecurityAuditLogsExplorerEmptyState: Renders the empty state for the Admin audit log table.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSecurityAuditLogsExplorerEmptyState() {
  const t = useTranslations();
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center" data-testid="admin_audit_logs-admin_audit_logs-empty-state-state">
    <ShieldAlert size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{t('audit_logs.admin_audit_logs_empty_state.text_no_audit_logs')}</h3>
    <p className="text-sm text-secondary">{t('audit_logs.admin_audit_logs_empty_state.text_no_match')}</p>
  </div>;
}
