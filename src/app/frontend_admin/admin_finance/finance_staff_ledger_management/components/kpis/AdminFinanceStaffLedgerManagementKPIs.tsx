"use client";
// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
// DATA FLOW: feature data/state and user input → AdminFinanceStaffLedgerManagementKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_staff_ledger_management/components/kpis/AdminFinanceStaffLedgerManagementKPIs.tsx)

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AdminFinanceStaffLedgerManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementFormatCurrency';

import { useAdminFinanceStaffLedgerManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementViewModel';
import { DollarSign, UserCheck, FileText, RefreshCw } from 'lucide-react';

/**
 * AdminFinanceStaffLedgerManagementKPIs renders the Finance StaffLedgerManagement kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceStaffLedgerManagementKPIs: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
 * @dependencies Consumes AdminFinanceStaffLedgerManagementFormatCurrency, useAdminFinanceStaffLedgerManagementViewModel.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceStaffLedgerManagementKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { summary, summaryStatus, retrySummary } = useAdminFinanceStaffLedgerManagementViewModel();


  if (summaryStatus === 'pending') {
    return <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-busy="true" aria-label={t('hr.AdminAuditRepair.summaryLoading')} data-testid="admin_hr-adminhrkpis-loading">{['summary-kpi-1', 'summary-kpi-2', 'summary-kpi-3', 'summary-kpi-4'].map((key) => <div key={key} className="h-28 rounded-xl border border-border bg-card motion-safe:animate-pulse" />)}</div>;
  }
  if (summaryStatus === 'error' || !summary) {
    return <div className="rounded-xl border border-border bg-danger-bg p-4 text-sm text-danger" role="alert" data-testid="admin_hr-adminhrkpis-error">
      <p>{t('hr.AdminAuditRepair.summaryFailed')}</p>
      <button type="button" onClick={() => void retrySummary()} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="hr-management-hr-management-kp-is-retry-summary"><RefreshCw size={16} aria-hidden="true" />{t('hr.AdminAuditRepair.retrySummary')}</button>
    </div>;
  }

  const kpis = [
    { label: t('hr.AdminAuditRepair.totalSalaryGenerated'), value: AdminFinanceStaffLedgerManagementFormatCurrency(summary.totalSalaryThisMonth, undefined, locale), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary-subtle' },
    { label: t('hr.AdminAuditRepair.totalPaid'), value: AdminFinanceStaffLedgerManagementFormatCurrency(summary.totalSalaryPaid, undefined, locale), icon: UserCheck, colorClass: 'text-success', bgClass: 'bg-success-bg' },
    { label: t('hr.AdminAuditRepair.outstandingDue'), value: AdminFinanceStaffLedgerManagementFormatCurrency(summary.totalSalaryDue, undefined, locale), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning-bg' },
    { label: t('hr.AdminAuditRepair.advanceGiven'), value: AdminFinanceStaffLedgerManagementFormatCurrency(summary.totalAdvanceGiven, undefined, locale), icon: DollarSign, colorClass: 'text-danger', bgClass: 'bg-danger-bg' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="admin_hr-adminhrkpis-summary">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-xl p-4 shadow-card border border-border bg-card flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.bgClass}`}>
            <k.icon size={18} className={k.colorClass} />
          </div>
          <div>
            <p className="text-xs font-medium text-secondary">{k.label}</p>
            <p className="text-xl font-bold text-primary">{k.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
