"use client";
// RESPONSIBILITY: Fetches and presents one immutable Audit Log detail record, including sensitive metadata visible only in this drawer.
// DATA FLOW: feature data/state and user input → AdminSecurityAuditLogsExplorerDetailDrawer → accessible UI/events routed to owning hooks (admin_audit_logs/audit_logs_explorer/components/detail_drawer/AdminSecurityAuditLogsExplorerDetailDrawer.tsx)

/**
 * @description AdminSecurityAuditLogsExplorerDetailDrawer: Fetches and presents one immutable Audit Log detail record, including sensitive metadata visible only in this drawer.
 * @dependencies Consumes AdminAuditLogsFormatters, useAdminAuditLogsLogic, AdminAuditLogsConstants.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useLocale, useTranslations } from 'next-intl';
import { formatDateTime } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerFormatters';
import { AlertCircle, Building2, Clock, Hash, ShieldAlert, User, X } from 'lucide-react';
import { useAdminAuditLogsLogic } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerLogic';
import { AUDIT_SEVERITY_STYLES } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/constants/AdminSecurityAuditLogsExplorerConstants';
import { redactAdminAuditMetadata, redactAdminAuditText, redactAdminAuditIp, redactAdminAuditUserAgent } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata';
import type { AdminAuditLogsDetailDrawerProps } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerDetailDrawerPropsTypes';

/** Renders detail loading/error/success states and restores focus through the shared Admin dialog boundary.
 */
/**
 * @description Renders the / AuditLogsDetailDrawer dialog surface and delegates persistence to feature-owned hooks.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityAuditLogsExplorerDetailDrawer({ onClose }: AdminAuditLogsDetailDrawerProps) {
  const t = useTranslations();
  const locale = useLocale();

  const { detail, detailStatus, detailError, retryDetail } = useAdminAuditLogsLogic();
  const valueRows = detail ? [
    { icon: Clock, label: t('audit_logs.AdminAuditRepair.timestamp'), value: formatDateTime(detail.timestamp, locale, true) },
    { icon: User, label: t('audit_logs.AdminAuditRepair.actor'), value: redactAdminAuditText(detail.actor) },
    { icon: Building2, label: t('audit_logs.AdminAuditRepair.branch'), value: redactAdminAuditText(detail.branchId) },
    { icon: Hash, label: t('audit_logs.AdminAuditRepair.entity'), value: redactAdminAuditText(`${detail.entityType}${detail.entityId ? ` · ${detail.entityId}` : ''}`) },
  ] : [];
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-overlay-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="admin_audit_logs-admin_audit_logs-detail-drawer-control">
      <section data-admin-dialog="true" role="dialog" aria-modal="true" aria-label={t('audit_logs.admin_audit_logs_detail_drawer.text_abbee93bb7')} tabIndex={-1} className="flex h-full w-full max-w-lg flex-col overflow-hidden border-l border-border bg-overlay shadow-dialog" data-testid="admin_audit_logs-admin_audit_logs-detail-drawer-control-2">
        <div className="flex min-h-16 items-center justify-between border-b border-border px-5">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t('audit_logs.admin_audit_logs_detail_drawer.text_13b39459a6')}</p><h2 className="text-base font-bold text-primary">{detail?.action ? redactAdminAuditText(detail.action.replace(/_/g, ' ')) : t('audit_logs.admin_audit_logs_detail_drawer.loading')}</h2></div>
          <button type="button" data-admin-dialog-close="true" onClick={onClose} aria-label={t('audit_logs.admin_audit_logs_detail_drawer.text_e45df43b19')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="admin_audit_logs-admin_audit_logs-detail-drawer-close"><X size={18} strokeWidth={2} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {detailStatus === 'pending' && <div className="space-y-3"><div className="h-16 motion-safe:animate-pulse rounded-lg bg-skeleton-base"/><div className="h-24 motion-safe:animate-pulse rounded-lg bg-skeleton-base"/><div className="h-24 motion-safe:animate-pulse rounded-lg bg-skeleton-base"/></div>}
          {detailStatus === 'error' && <div className="rounded-xl border border-border bg-danger-bg p-4"><div className="flex items-center gap-2 text-danger"><AlertCircle size={18} strokeWidth={2}/><span className="font-semibold">{t('audit_logs.admin_audit_logs_detail_drawer.text_aaaa9e3932')}</span></div><p className="mt-2 text-sm text-danger">{detailError ?? t('audit_logs.admin_audit_logs_detail_drawer.detailFailed')}</p><button type="button" onClick={() => void retryDetail()} className="mt-4 min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_audit_logs-admin_audit_logs-detail-drawer-retry">{t('audit_logs.admin_audit_logs_detail_drawer.text_9f5cd8a2e8')}</button></div>}
          {detailStatus === 'success' && detail && <div className="space-y-5">
            <div className="flex items-center gap-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${AUDIT_SEVERITY_STYLES[detail.severity]}`} data-testid="audit-logs-explorer-audit-logs-explorer-detail-drawer-status-badge">{detail.severity}</span><span className="text-xs text-secondary">{redactAdminAuditText(detail.entityType)}</span></div>
            <div className="grid grid-cols-2 gap-3">{valueRows.map((item) => <div key={item.label} className="rounded-xl border border-border bg-input p-3"><div className="mb-1 flex items-center gap-1.5"><item.icon size={18} strokeWidth={2} className="text-secondary"/><p className="text-xs font-medium uppercase tracking-wider text-secondary">{item.label}</p></div><p className="break-all text-sm font-semibold text-primary">{item.value}</p></div>)}</div>
            <div className="rounded-xl border border-border bg-input p-4"><div className="mb-2 flex items-center gap-2"><ShieldAlert size={18} strokeWidth={2} className="text-secondary"/><p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t('audit_logs.admin_audit_logs_detail_drawer.text_c250d77524')}</p></div><p className="text-sm leading-relaxed text-primary">{String(redactAdminAuditMetadata(detail.details) ?? '')}</p></div>
            <div className="space-y-3"><h3 className="text-sm font-semibold text-primary">{t('audit_logs.admin_audit_logs_detail_drawer.text_79def035e4')}</h3><div className="rounded-xl border border-border bg-input p-4 text-sm text-secondary"><p><span className="font-semibold text-primary">{t('audit_logs.admin_audit_logs_detail_drawer.text_97322c15b2')}</span> {redactAdminAuditIp(detail.ipAddress)}</p><p className="mt-2 break-all"><span className="font-semibold text-primary">{t('audit_logs.admin_audit_logs_detail_drawer.text_875eb14299')}</span> {redactAdminAuditUserAgent(detail.userAgent)}</p></div></div>
            <div className="grid gap-3 md:grid-cols-2"><pre className="max-h-64 overflow-auto rounded-xl border border-border bg-floating p-3 text-xs text-secondary"><strong className="text-primary">{t('audit_logs.admin_audit_logs_detail_drawer.text_74f39697ac')}</strong>{`\n${JSON.stringify(redactAdminAuditMetadata(detail.before ?? {}), null, 2)}`}</pre><pre className="max-h-64 overflow-auto rounded-xl border border-border bg-floating p-3 text-xs text-secondary"><strong className="text-primary">{t('audit_logs.admin_audit_logs_detail_drawer.text_79ba5e1b3f')}</strong>{`\n${JSON.stringify(redactAdminAuditMetadata(detail.after ?? {}), null, 2)}`}</pre></div>
          </div>}
        </div>
      </section>
    </div>
  );
}
