"use client";
// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
// DATA FLOW: feature data/state and user input → AdminFinanceSalaryAdvanceManagementKPIs → accessible UI/events routed to owning hooks (admin_finance/finance_salary_advance_management/components/kpis/AdminFinanceSalaryAdvanceManagementKPIs.tsx)

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AdminFinanceSalaryAdvanceManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementFormatCurrency';

import { useAdminFinanceSalaryAdvanceManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementViewModel';
import { DollarSign, UserCheck, FileText, RefreshCw } from 'lucide-react';

/**
 * AdminFinanceSalaryAdvanceManagementKPIs renders the Finance SalaryAdvanceManagement kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceSalaryAdvanceManagementKPIs: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
 * @dependencies Consumes AdminFinanceSalaryAdvanceManagementFormatCurrency, useAdminFinanceSalaryAdvanceManagementViewModel.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceSalaryAdvanceManagementKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { summary, summaryStatus, retrySummary } = useAdminFinanceSalaryAdvanceManagementViewModel();


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
    { label: t('hr.AdminAuditRepair.totalSalaryGenerated'), value: AdminFinanceSalaryAdvanceManagementFormatCurrency(summary.totalSalaryThisMonth, undefined, locale), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary-subtle', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]', border: 'border-orange-500/40', topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent' },
    { label: t('hr.AdminAuditRepair.totalPaid'), value: AdminFinanceSalaryAdvanceManagementFormatCurrency(summary.totalSalaryPaid, undefined, locale), icon: UserCheck, colorClass: 'text-success', bgClass: 'bg-success-bg', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]', border: 'border-emerald-500/40', topBar: 'from-[#10B981] via-[#34D399] to-transparent' },
    { label: t('hr.AdminAuditRepair.outstandingDue'), value: AdminFinanceSalaryAdvanceManagementFormatCurrency(summary.totalSalaryDue, undefined, locale), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning-bg', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]', border: 'border-amber-500/40', topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent' },
    { label: t('hr.AdminAuditRepair.advanceGiven'), value: AdminFinanceSalaryAdvanceManagementFormatCurrency(summary.totalAdvanceGiven, undefined, locale), icon: DollarSign, colorClass: 'text-danger', bgClass: 'bg-danger-bg', surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]', border: 'border-rose-500/40', topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_hr-adminhrkpis-summary">
      {kpis.map((k) => (
        <div key={k.label} className={`relative overflow-hidden rounded-2xl p-5 shadow-card border ${k.surface} ${k.border} flex items-center justify-between gap-3`}>
          <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${k.topBar}`} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary truncate">{k.label}</p>
            <p className="text-kpi font-extrabold text-text-primary tabular-nums mt-1 truncate">{k.value}</p>
          </div>
          <div className={`p-2.5 rounded-xl border border-white/10 shrink-0 flex items-center justify-center ${k.bgClass}`}>
            <k.icon size={18} className={k.colorClass} />
          </div>
        </div>
      ))}
    </div>
  );
}
