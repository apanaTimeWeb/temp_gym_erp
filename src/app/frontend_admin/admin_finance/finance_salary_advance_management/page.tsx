"use client";
import { useTranslations } from 'next-intl';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/components/feedback/AdminFinanceSalaryAdvanceManagementConfirmProvider';

// Route entry for Admin Finance Advance. Workflow logic stays inside this autonomous leaf.
import AdminFinanceSalaryAdvanceManagementKPIs from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/components/kpis/AdminFinanceSalaryAdvanceManagementKPIs';
import AdminFinanceSalaryAdvanceManagementAdvanceTable from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/components/advance_table/AdminFinanceSalaryAdvanceManagementAdvanceTable';

export default function AdminFinanceSalaryAdvanceManagementAdvancePage() {
  const t = useTranslations();
  return <AdminNavigationLayoutConfirmProvider><main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header><h1 className="text-2xl font-bold">{t('hr.admin_hr_tabs.tab_advance')}</h1></header>
      <AdminFinanceSalaryAdvanceManagementKPIs />
      <AdminFinanceSalaryAdvanceManagementAdvanceTable />
  </main></AdminNavigationLayoutConfirmProvider>;
}
