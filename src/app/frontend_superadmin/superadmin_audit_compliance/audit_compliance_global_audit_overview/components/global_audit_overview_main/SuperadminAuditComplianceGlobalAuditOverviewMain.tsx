// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Main using its declared props and feature-local hooks.
'use client';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminAuditComplianceGlobalAuditTable from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/components/global_audit_overview_tables_and_lists/SuperadminAuditComplianceGlobalAuditOverviewTable';
import SuperadminAuditComplianceGlobalAuditFilters from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/components/SuperadminAuditComplianceGlobalAuditOverviewFilters';
import { useSuperadminAuditComplianceGlobalAuditOverviewMain } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewMain';


/**
 * @description Renders the Superadmin global audit main interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminAuditComplianceGlobalAuditOverviewMain() {
  const t = useTranslations('superadmin_audit_compliance_global_audit');
  const vm = useSuperadminAuditComplianceGlobalAuditOverviewMain();
  const exportLogs = () => { void vm.requestExport().catch(() => undefined); };
  if (vm.isPending) return <div className="space-y-6 w-full" aria-busy="true" data-testid="superadmin-global-audit-loading"><div className="h-8 w-56 max-w-full rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="h-14 rounded border border-border bg-skeleton-base motion-safe:animate-pulse"/><div className="h-112 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"/></div>;
  if (vm.queryError) return <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin-global-audit-error"><p className="font-medium text-danger">{t('ui.global_audit_logs_could_not_be_loaded_a4731105')}</p><button type="button" onClick={() => void vm.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>;
  return <div className="space-y-6 w-full" data-testid="superadmin-global-audit-ready">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h1 className="text-2xl font-bold text-primary">{t('ui.global_audit_logs_84dfccdf')}</h1><p className="mt-1 text-secondary">{t('ui.immutable_security_ledger_for_system_wide_in_cf9942a7')}</p></div><div className="flex flex-wrap items-center gap-3"><button type="button" onClick={() => void vm.refetch()} disabled={vm.isFetching} className="min-h-11 rounded-lg border border-border bg-input px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{vm.isFetching ? t('ui.refreshing_3c7a1d2e') : t('ui.refresh_5b2e9d1c')}</button><button type="button" onClick={exportLogs} disabled={vm.isExporting} aria-busy={vm.isExporting} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin-global-audit-export"><Download size={18} aria-hidden="true"/>{vm.isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.request_csv_export')}</button></div></div>
    {vm.exportError ? <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-danger-bg bg-danger-bg p-3 text-danger"><p>{t('ui.export_failed_retry')}</p><button type="button" className="min-h-11 rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onClick={exportLogs}>{t('ui.retry_6327b4e5')}</button></div> : null}
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card"><SuperadminAuditComplianceGlobalAuditFilters search={vm.search} severityFilter={vm.severityFilter} actorTypeFilter={vm.actorTypeFilter} severityOptions={vm.severityOptions} actorTypeOptions={vm.actorTypeOptions} setSearch={vm.setSearch} setSeverityFilter={vm.setSeverityFilter} setActorTypeFilter={vm.setActorTypeFilter}/><SuperadminAuditComplianceGlobalAuditTable logs={vm.logs}/><div className="border-t border-border p-4"><Pagination currentPage={vm.currentPage} totalPages={vm.totalPages} onPageChange={vm.setCurrentPage} data-testid="superadmin-global-audit-pagination"/></div></div>
  </div>;
}
