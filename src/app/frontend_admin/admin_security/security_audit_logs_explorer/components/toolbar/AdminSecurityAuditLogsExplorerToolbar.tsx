"use client";
// RESPONSIBILITY: Owns only Audit Logs filters and the compliance CSV export control.
// DATA FLOW: feature data/state and user input → AdminSecurityAuditLogsExplorerToolbar → accessible UI/events routed to owning hooks (admin_audit_logs/audit_logs_explorer/components/toolbar/AdminSecurityAuditLogsExplorerToolbar.tsx)

/**
 * @description AdminSecurityAuditLogsExplorerToolbar: Owns only Audit Logs filters and the compliance CSV export control.
 * @dependencies Consumes useAdminAuditLogsLogic, AdminAuditLogsConstants, AdminNavigationLayoutSearchableDropdown.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { Download, RotateCcw, Search } from 'lucide-react';
import { useAdminAuditLogsLogic } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerLogic';
import { AUDIT_ACTION_OPTIONS, AUDIT_ENTITY_OPTIONS } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/constants/AdminSecurityAuditLogsExplorerConstants';
import { redactAdminAuditText } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/searchable_dropdown/AdminSecurityAuditLogsExplorerSearchableDropdown';

/** Renders actor/API-backed filtering plus documented action/entity/date filters and export.
 */
/**
 * @description Renders the / AuditLogsToolbar UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminSecurityAuditLogsExplorerToolbar() {
  const t = useTranslations();

  const {
    actors, actorFilter, setActorFilter, actionFilter, setActionFilter, entityFilter, setEntityFilter,
    dateFrom, setDateFrom, dateTo, setDateTo, isExporting, exportAuditLogs,
  } = useAdminAuditLogsLogic();
  const actorOptions = [{ value: 'all', label: t('audit_logs.AdminAuditRepair.allActors') }, ...actors.map((actor) => ({ value: actor, label: redactAdminAuditText(actor) }))];
  const reset = () => {
    setActorFilter('all'); setActionFilter('all'); setEntityFilter('all'); setDateFrom(''); setDateTo('');
  };
  const dirty = actorFilter !== 'all' || actionFilter !== 'all' || entityFilter !== 'all' || Boolean(dateFrom || dateTo);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex flex-col xl:flex-row xl:items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search size={18} strokeWidth={2} className="pointer-events-none absolute inset-y-0 left-3 my-auto text-secondary" aria-hidden="true" />
          <input
            type="text"
            placeholder={t('audit_logs.admin_audit_logs_toolbar.text_70dcc312af')}
            value={actorFilter === 'all' ? '' : actorFilter}
            onChange={(e) => setActorFilter(e.target.value.trim() ? e.target.value : 'all')}
            aria-label={t('audit_logs.admin_audit_logs_toolbar.text_30c9e16a86')}
            className="min-h-11 w-full rounded-lg border border-border bg-input pl-10 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"
            data-testid="admin_audit_logs-admin_audit_logs-toolbar-search"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AdminNavigationLayoutSearchableDropdown options={actorOptions} value={actorFilter} onChange={(val) => setActorFilter(val as string)} placeholder={t('audit_logs.admin_audit_logs_toolbar.text_44e196a029')} testId="admin_audit_logs-admin_audit_logs-toolbar-change" />
          <AdminNavigationLayoutSearchableDropdown options={AUDIT_ACTION_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={actionFilter} onChange={(val) => setActionFilter(val as string)} placeholder={t('audit_logs.admin_audit_logs_toolbar.text_902f1999fb')} testId="admin_audit_logs-admin_audit_logs-toolbar-filter" />
          <AdminNavigationLayoutSearchableDropdown options={AUDIT_ENTITY_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={entityFilter} onChange={(val) => setEntityFilter(val as string)} placeholder={t('audit_logs.admin_audit_logs_toolbar.text_235465db3e')} testId="admin_audit_logs-admin_audit_logs-toolbar-change-2" />
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm text-secondary">
            {t('audit_logs.admin_audit_logs_toolbar.text_3f66052a10')}<input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} aria-label={t('audit_logs.admin_audit_logs_toolbar.text_2ca6f39dcc')} className="bg-transparent text-primary outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" data-testid="admin_audit_logs-admin_audit_logs-toolbar-control" />
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm text-secondary">
            {t('audit_logs.admin_audit_logs_toolbar.text_ae79ea1e9c')}<input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} aria-label={t('audit_logs.admin_audit_logs_toolbar.text_b5df674721')} className="bg-transparent text-primary outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" data-testid="admin_audit_logs-admin_audit_logs-toolbar-control-2" />
          </label>
          {dirty && <button type="button" onClick={reset} aria-label={t('audit_logs.admin_audit_logs_toolbar.text_a93eba1850')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="admin_audit_logs-admin_audit_logs-toolbar-control-3"><RotateCcw size={18} strokeWidth={2} /></button>}
          <button type="button" onClick={exportAuditLogs} disabled={isExporting} className="min-h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-w-11 motion-safe:active:scale-95" data-testid="admin_audit_logs-admin_audit_logs-toolbar-export">
            <Download size={18} strokeWidth={2} /> {isExporting ? t('audit_logs.admin_audit_logs_toolbar.auto_cedcd4dda4') : t('audit_logs.admin_audit_logs_toolbar.auto_75f7af8b9c')}
          </button>
        </div>
      </div>
    </div>
  );
}
