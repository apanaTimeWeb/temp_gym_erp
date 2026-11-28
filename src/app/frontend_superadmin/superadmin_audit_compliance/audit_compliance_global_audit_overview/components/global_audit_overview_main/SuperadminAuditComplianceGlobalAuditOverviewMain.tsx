// RESPONSIBILITY: Renders Superadmin Audit Compliance Global Audit Overview Main using its declared props and feature-local hooks.
'use client';
import { Download } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';
import { SUPERADMIN_AUDIT_PAGE_SIZE } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';

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
  const locale = useLocale();
  const vm = useSuperadminAuditComplianceGlobalAuditOverviewMain();
  const exportLogs = () => { void vm.requestExport().catch(() => undefined); };

  const totalRecords = vm.total ?? vm.logs.length;
  const startRow = totalRecords === 0 ? 0 : (vm.currentPage - 1) * SUPERADMIN_AUDIT_PAGE_SIZE + 1;
  const endRow = Math.min(vm.currentPage * SUPERADMIN_AUDIT_PAGE_SIZE, totalRecords);
  const formatCount = (value: number) => new Intl.NumberFormat(locale).format(value);

  if (vm.isPending) return <div className="space-y-6 w-full" aria-busy="true" data-testid="superadmin-global-audit-loading"><div className="h-8 w-56 max-w-full rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="h-14 rounded border border-border bg-skeleton-base motion-safe:animate-pulse"/><div className="h-112 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"/></div>;
  if (vm.queryError) return <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin-global-audit-error"><p className="font-medium text-danger">{t('ui.global_audit_logs_could_not_be_loaded_a4731105')}</p><button type="button" onClick={() => void vm.refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>;
  return <div className="space-y-5 w-full" data-testid="superadmin-global-audit-ready">
    <section className="relative overflow-hidden rounded-2xl border border-purple-500/35 bg-card dark:bg-gradient-to-br dark:from-[#1E132F] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#38BDF8]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary">{t('ui.global_audit_logs_84dfccdf')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('ui.immutable_security_ledger_for_system_wide_in_cf9942a7')}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <button type="button" onClick={() => void vm.refetch()} disabled={vm.isFetching} className="min-h-10 rounded-xl border border-border dark:border-white/15 bg-input px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer">{vm.isFetching ? t('ui.refreshing_3c7a1d2e') : t('ui.refresh_5b2e9d1c')}</button>
        <button type="button" onClick={exportLogs} disabled={vm.isExporting} aria-busy={vm.isExporting} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" data-testid="superadmin-global-audit-export"><Download size={16} aria-hidden="true"/>{vm.isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.request_csv_export')}</button>
      </div>
    </section>
    {vm.exportError ? <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger-bg bg-danger-bg p-3 text-danger"><p>{t('ui.export_failed_retry')}</p><button type="button" className="min-h-10 rounded-xl border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" onClick={exportLogs}>{t('ui.retry_6327b4e5')}</button></div> : null}
    <div className="relative bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] border border-border dark:border-purple-500/30 rounded-2xl shadow-card overflow-hidden flex flex-col">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#A855F7] via-[#38BDF8] to-[#FF5A1F] z-30" />
      <SuperadminAuditComplianceGlobalAuditFilters search={vm.search} severityFilter={vm.severityFilter} actorTypeFilter={vm.actorTypeFilter} severityOptions={vm.severityOptions} actorTypeOptions={vm.actorTypeOptions} setSearch={vm.setSearch} setSeverityFilter={vm.setSeverityFilter} setActorTypeFilter={vm.setActorTypeFilter}/>
      <SuperadminAuditComplianceGlobalAuditTable logs={vm.logs}/>
      <div className="border-t border-border px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card">
        <p className="text-xs text-secondary" aria-live="polite">
          Showing <span className="font-semibold text-primary">{formatCount(startRow)}</span>–<span className="font-semibold text-primary">{formatCount(endRow)}</span> of <span className="font-semibold text-primary">{formatCount(totalRecords)}</span> records
        </p>
        <Pagination currentPage={vm.currentPage} totalPages={vm.totalPages} onPageChange={vm.setCurrentPage} data-testid="superadmin-global-audit-pagination"/>
      </div>
    </div>
  </div>;
}
