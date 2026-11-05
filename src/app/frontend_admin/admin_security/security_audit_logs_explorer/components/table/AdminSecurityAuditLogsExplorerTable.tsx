"use client";
// RESPONSIBILITY: Renders the immutable, server-paginated Audit Logs table and opens the detail drawer from row interaction.
// DATA FLOW: feature data/state and user input → AdminSecurityAuditLogsExplorerTable → accessible UI/events routed to owning hooks (admin_audit_logs/audit_logs_explorer/components/table/AdminSecurityAuditLogsExplorerTable.tsx)

/**
 * @description AdminSecurityAuditLogsExplorerTable: Renders the immutable, server-paginated Audit Logs table and opens the detail drawer from row interaction.
 * @dependencies Consumes AdminAuditLogsFormatters, AdminNavigationLayoutPagination, AdminNavigationLayoutTableSkeleton, AdminAuditLogsEmptyState, AdminAuditLogsDetailDrawer.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { formatDateTime } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerFormatters';
import { useLocale } from 'next-intl';
import { AlertCircle, CreditCard, Edit3, LogIn, PlusCircle, Settings, Trash2, Users } from 'lucide-react';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/AdminSecurityAuditLogsExplorerPagination';
import AdminNavigationLayoutTableSkeleton from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/AdminSecurityAuditLogsExplorerTableSkeleton';
import AdminAuditLogsEmptyState from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/empty_state/AdminSecurityAuditLogsExplorerEmptyState';
import AdminAuditLogsDetailDrawer from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/detail_drawer/AdminSecurityAuditLogsExplorerDetailDrawer';
import { useAdminAuditLogsLogic } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerLogic';
import { AUDIT_SEVERITY_STYLES } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/constants/AdminSecurityAuditLogsExplorerConstants';
import { redactAdminAuditText } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata';
import type { AuditLog } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes';

function getActionIcon(action: string) {
  if (action.includes('DELETE') || action.includes('REFUND')) return <Trash2 size={18} strokeWidth={2} className="text-danger" />;
  if (action.includes('UPDATE') || action.includes('SETTINGS') || action.includes('CHANGED')) return <Settings size={18} strokeWidth={2} className="text-warning" />;
  if (action.includes('ADD') || action.includes('CREATE') || action.includes('IMPORT')) return <PlusCircle size={18} strokeWidth={2} className="text-success" />;
  if (action.includes('FAIL')) return <AlertCircle size={18} strokeWidth={2} className="text-danger" />;
  if (action.includes('LOGIN') || action.includes('AUTH')) return <LogIn size={18} strokeWidth={2} className="text-info" />;
  if (action.includes('MEMBER') || action.includes('STAFF')) return <Users size={18} strokeWidth={2} className="text-primary" />;
  if (action.includes('PAYMENT') || action.includes('PAYROLL') || action.includes('EXPENSE')) return <CreditCard size={18} strokeWidth={2} className="text-success" />;
  return <Edit3 size={18} strokeWidth={2} className="text-primary" />;
}

/** Keeps row navigation and inline content together while leaving mutations out of this immutable feature.
 */
/**
 * @description Renders the / AuditLogs table and its documented loading, empty, error, and interaction states.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityAuditLogsExplorerTable() {
  const t = useTranslations();
  const locale = useLocale();

  const { logs, status, currentPage, setCurrentPage, totalPages, totalItems, openDetail, selectedLogId, closeDetail, detail, retryList } = useAdminAuditLogsLogic();
  if (status === 'pending') return <AdminNavigationLayoutTableSkeleton rows={8} cols={6} />;
  if (status === 'error') return <div role="alert" className="rounded-xl border border-border bg-danger-bg p-6 text-sm text-danger"><p>{t('audit_logs.admin_audit_logs_table.text_8631a11f58')}</p><button type="button" onClick={() => void retryList()} className="mt-3 min-h-11 rounded-lg border border-border px-4" data-testid="audit-logs-explorer-audit-logs-explorer-table-retry-list">{t('audit_logs.AdminAuditRepair.retry')}</button></div>;
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left">
            <thead><tr className="border-b border-border bg-surface-highlight">
              {['audit_logs.admin_audit_logs_table.auto_timestamp', 'audit_logs.admin_audit_logs_table.auto_action', 'audit_logs.admin_audit_logs_table.auto_actor', 'audit_logs.admin_audit_logs_table.auto_entity', 'audit_logs.admin_audit_logs_table.auto_details', 'audit_logs.admin_audit_logs_table.auto_severity'].map((heading) => <th key={heading} scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-secondary">{t(heading)}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {logs.length === 0 ? <tr><td colSpan={6}><AdminAuditLogsEmptyState /></td></tr> : logs.map((log: AuditLog) => (
                <tr
                  key={log.id}
                  className="motion-safe:transition-colors motion-safe:duration-base hover:bg-surface-hover"
                  data-testid={`admin_audit_logs-admin_audit_logs-table-row-${log.id}`}>
                  <td data-label={t('audit_logs.admin_audit_logs_table.auto_timestamp')} className="px-4 py-4 text-xs text-secondary whitespace-nowrap"><button type="button" onClick={() => openDetail(log.id)} className="underline underline-offset-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`${t('audit_logs.admin_audit_logs_table.auto_timestamp')}: ${formatDateTime(log.timestamp, locale)}`} data-testid="audit-logs-explorer-audit-logs-explorer-table-open-detail">{formatDateTime(log.timestamp, locale)}</button></td>
                  <td data-label={t('audit_logs.admin_audit_logs_table.auto_action')} className="px-4 py-4"><div className="flex items-center gap-2.5"><span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-border bg-input">{getActionIcon(log.action)}</span><div><p className="text-sm font-semibold text-primary">{redactAdminAuditText(log.action.replace(/_/g, ' '))}</p><p className="text-xs text-secondary">{redactAdminAuditText(log.entityType)}</p></div></div></td>
                  <td data-label={t('audit_logs.admin_audit_logs_table.auto_actor')} className="px-4 py-4 text-sm text-primary">{redactAdminAuditText(log.actor)}</td>
                  <td data-label={t('audit_logs.admin_audit_logs_table.auto_entity')} className="px-4 py-4 text-sm text-secondary">{redactAdminAuditText(`${log.entityType}${log.entityId ? ` · ${log.entityId}` : ''}`)}</td>
                  <td data-label={t('audit_logs.admin_audit_logs_table.auto_details')} className="max-w-sm truncate px-4 py-4 text-sm text-secondary" title={redactAdminAuditText(log.details)}>{redactAdminAuditText(log.details)}</td>
                  <td data-label={t('audit_logs.admin_audit_logs_table.auto_severity')} className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${AUDIT_SEVERITY_STYLES[log.severity]}`} data-testid="audit-logs-explorer-audit-logs-explorer-table-status-badge">{log.severity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminNavigationLayoutPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={totalItems} itemsPerPage={10} />
      </div>
      {selectedLogId && <AdminAuditLogsDetailDrawer log={detail} isOpen={Boolean(selectedLogId)} onClose={closeDetail} />}
    </>
  );
}
