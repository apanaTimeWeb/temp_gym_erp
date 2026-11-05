"use client";
// Route entry for the independently navigable P&L report.
import { useTranslations } from 'next-intl';
import { Download, Loader2 } from 'lucide-react';
import AdminFinanceProfitAndLossReportPnL from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/pnl/AdminFinanceProfitAndLossReportPnL';
import { AdminFinanceProfitAndLossReportDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/date_filter/AdminFinanceProfitAndLossReportDateFilterDropdown';
import { useAdminFinanceProfitAndLossReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/hooks/useAdminFinanceProfitAndLossReportBranchReference';
import { useAdminFinanceProfitAndLossReportStore } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/state/useAdminFinanceProfitAndLossReportStore';
import { useAdminFinanceProfitAndLossReportLogic } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/hooks/useAdminFinanceProfitAndLossReportLogic';
import { EXPORT_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/constants/AdminFinanceProfitAndLossReportConstants';
import type { AdminFinanceProfitAndLossReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportBranchReferenceTypes';
import { AdminFinanceProfitAndLossReportSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/searchable_dropdown/AdminFinanceProfitAndLossReportSearchableDropdown';

export default function AdminPAndLReportPage() {
  const t = useTranslations();
  const { selectedGymId, setSelectedGymId } = useAdminFinanceProfitAndLossReportStore();
  const { data: branches = [], isPending: branchesPending, isError: branchesError, refetch: retryBranches } = useAdminFinanceProfitAndLossReportBranchReference();
  const { exportStatus, handleExport, isDateRangeValid } = useAdminFinanceProfitAndLossReportLogic();
  const options = [{ value: 'all', label: t('reports.AdminAuditRepair.allGyms') }, ...(branches as AdminFinanceProfitAndLossReportBranchReference[]).map((b) => ({ value: b.id, label: b.name }))];
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('reports.static.p_l')}</h1>
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4" aria-label={t('reports.admin_finance_profit_and_loss_report.accessibility.filters')}>
      <div className="flex flex-wrap items-center gap-3"><div className="w-52"><AdminFinanceProfitAndLossReportSearchableDropdown disabled={branchesPending || branchesError} options={options} value={selectedGymId} onChange={(value) => setSelectedGymId(String(value))} placeholder={t('reports.admin_reports_main.text_1ea6687cfe')} testId="admin-reports-scope-branch" /></div><AdminFinanceProfitAndLossReportDateFilterDropdown /></div>
      <div className="flex flex-wrap gap-2 items-center">
        {EXPORT_FORMAT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => { void handleExport(option.value); }} disabled={exportStatus === 'pending' || !isDateRangeValid} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm font-medium text-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`admin-reports-export-${option.value}`}>{exportStatus === 'pending' ? <Loader2 size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}{t(option.value === 'pdf' ? 'reports.AdminReportsMain.exportPdf' : 'reports.AdminReportsMain.exportCsv')}</button>)}
      </div>
    </section>
    {branchesPending && <p role="status" className="text-sm text-secondary">{t('reports.admin_reports_main.loadingSection')}</p>}
    {branchesError && <div role="alert" className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-danger-bg p-3 text-danger"><span>{t('reports.admin_reports_main.loadError')}</span><button type="button" onClick={() => { void retryBranches(); }} className="min-h-11 rounded-lg border border-border px-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('reports.admin_reports_main.retry')}</button></div>}
    {!isDateRangeValid && <p role="alert" className="rounded-lg border border-border bg-warning-bg p-3 text-warning">{t('reports.admin_reports_main.dateRangeInvalid')}</p>}
    <section aria-label={t('reports.admin_finance_profit_and_loss_report.accessibility.data')}><AdminFinanceProfitAndLossReportPnL /></section>
  </main>;
}
