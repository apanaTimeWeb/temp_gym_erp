"use client";
// Route entry for the independently navigable Revenue report.
import { useTranslations } from 'next-intl';
import { Download, Loader2 } from 'lucide-react';
import AdminFinanceRevenueReportRevenue from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/revenue/AdminFinanceRevenueReportRevenue';
import { AdminFinanceRevenueReportDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/date_filter/AdminFinanceRevenueReportDateFilterDropdown';
import { useAdminFinanceRevenueReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportBranchReference';
import { useAdminFinanceRevenueReportStore } from '@/app/frontend_admin/admin_finance/finance_revenue_report/state/useAdminFinanceRevenueReportStore';
import { useAdminFinanceRevenueReportLogic } from '@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportLogic';
import { EXPORT_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_revenue_report/constants/AdminFinanceRevenueReportConstants';
import type { AdminFinanceRevenueReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportBranchReferenceTypes';
import { AdminFinanceRevenueReportSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/searchable_dropdown/AdminFinanceRevenueReportSearchableDropdown';

export default function AdminRevenueReportPage() {
  const t = useTranslations();
  const { selectedGymId, setSelectedGymId } = useAdminFinanceRevenueReportStore();
  const { data: branches = [], isPending: branchesPending, isError: branchesError, refetch: retryBranches } = useAdminFinanceRevenueReportBranchReference();
  const { exportStatus, handleExport, isDateRangeValid } = useAdminFinanceRevenueReportLogic();
  const options = [{ value: 'all', label: t('reports.AdminAuditRepair.allGyms') }, ...(branches as AdminFinanceRevenueReportBranchReference[]).map((b) => ({ value: b.id, label: b.name }))];
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('reports.static.revenue')}</h1>
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4" aria-label={t('reports.admin_finance_revenue_report.accessibility.filters')}>
      <div className="flex flex-wrap items-center gap-3"><div className="w-52"><AdminFinanceRevenueReportSearchableDropdown disabled={branchesPending || branchesError} options={options} value={selectedGymId} onChange={(value) => setSelectedGymId(String(value))} placeholder={t('reports.admin_reports_main.text_1ea6687cfe')} testId="admin-reports-scope-branch" /></div><AdminFinanceRevenueReportDateFilterDropdown /></div>
      <div className="flex flex-wrap gap-2 items-center">
        {EXPORT_FORMAT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => { void handleExport(option.value); }} disabled={exportStatus === 'pending' || !isDateRangeValid} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm font-medium text-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`admin-reports-export-${option.value}`}>{exportStatus === 'pending' ? <Loader2 size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}{t(option.value === 'pdf' ? 'reports.AdminReportsMain.exportPdf' : 'reports.AdminReportsMain.exportCsv')}</button>)}
      </div>
    </section>
    {branchesPending && <p role="status" className="text-sm text-secondary">{t('reports.admin_reports_main.loadingSection')}</p>}
    {branchesError && <div role="alert" className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-danger-bg p-3 text-danger"><span>{t('reports.admin_reports_main.loadError')}</span><button type="button" onClick={() => { void retryBranches(); }} className="min-h-11 rounded-lg border border-border px-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('reports.admin_reports_main.retry')}</button></div>}
    {!isDateRangeValid && <p role="alert" className="rounded-lg border border-border bg-warning-bg p-3 text-warning">{t('reports.admin_reports_main.dateRangeInvalid')}</p>}
    <section aria-label={t('reports.admin_finance_revenue_report.accessibility.data')}><AdminFinanceRevenueReportRevenue /></section>
  </main>;
}
