"use client";
// Route entry for the independently navigable Membership report.
import { useTranslations } from 'next-intl';
import { Download, Loader2 } from 'lucide-react';
import AdminSalesMembershipGrowthReportAnalyticsMembership from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/membership/AdminSalesMembershipGrowthReportMembership';
import { AdminSalesMembershipGrowthReportAnalyticsDateFilterDropdown } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/date_filter/AdminSalesMembershipGrowthReportDateFilterDropdown';
import { useAdminSalesMembershipGrowthReportBranchReference } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/hooks/useAdminSalesMembershipGrowthReportBranchReference';
import { useAdminSalesMembershipGrowthReportStore } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/state/useAdminSalesMembershipGrowthReportStore';
import { useAdminSalesMembershipGrowthReportLogic } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/hooks/useAdminSalesMembershipGrowthReportLogic';
import { EXPORT_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/constants/AdminSalesMembershipGrowthReportConstants';
import type { AdminSalesMembershipGrowthReportBranchReference } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportBranchReferenceTypes';
import { AdminSalesMembershipGrowthReportSearchableDropdown } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/searchable_dropdown/AdminSalesMembershipGrowthReportSearchableDropdown';

export default function AdminMembershipReportPage() {
  const t = useTranslations();
  const { selectedGymId, setSelectedGymId } = useAdminSalesMembershipGrowthReportStore();
  const { data: branches = [] } = useAdminSalesMembershipGrowthReportBranchReference();
  const { exportStatus, handleExport, isDateRangeValid } = useAdminSalesMembershipGrowthReportLogic();
  const options = [{ value: 'all', label: t('reports.AdminAuditRepair.allGyms') }, ...(branches as AdminSalesMembershipGrowthReportBranchReference[]).map((b) => ({ value: b.id, label: b.name }))];
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('reports.static.membership_growth')}</h1>
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4" aria-label={t('reports.admin_reports_membership.accessibility.filters')}>
      <div className="flex flex-wrap items-center gap-3"><div className="w-52"><AdminSalesMembershipGrowthReportSearchableDropdown options={options} value={selectedGymId} onChange={(value) => setSelectedGymId(String(value))} placeholder={t('reports.admin_reports_main.text_1ea6687cfe')} testId="admin-reports-scope-branch" /></div><AdminSalesMembershipGrowthReportAnalyticsDateFilterDropdown /></div>
      <div className="flex flex-wrap gap-2 items-center">
        {EXPORT_FORMAT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => { void handleExport(option.value); }} disabled={exportStatus === 'pending' || !isDateRangeValid} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm font-medium text-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`admin-reports-export-${option.value}`}>{exportStatus === 'pending' ? <Loader2 size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}{t(option.value === 'pdf' ? 'reports.AdminReportsMain.exportPdf' : 'reports.AdminReportsMain.exportCsv')}</button>)}
      </div>
    </section>
    {!isDateRangeValid && <p role="alert" className="rounded-lg border border-border bg-warning-bg p-3 text-warning">{t('reports.admin_reports_main.dateRangeInvalid')}</p>}
    <section aria-label={t('reports.admin_reports_membership.accessibility.data')}><AdminSalesMembershipGrowthReportAnalyticsMembership /></section>
  </main>;
}
