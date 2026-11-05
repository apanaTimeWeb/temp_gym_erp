"use client";
import { useTranslations } from 'next-intl';
// Route entry for Admin Finance Payroll. Workflow logic stays inside this autonomous leaf.
import AdminFinancePayrollManagementKPIs from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/kpis/AdminFinancePayrollManagementKPIs';
import AdminFinancePayrollManagementPayrollTable from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/payroll_table/AdminFinancePayrollManagementPayrollTable';
import AdminFinancePayrollManagementPayrollModal from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/payroll_modal/AdminFinancePayrollManagementPayrollModal';
import AdminFinancePayrollManagementPaymentModal from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/payment_modal/AdminFinancePayrollManagementPaymentModal';
import { AdminNavigationLayoutConfirmProvider as AdminFinancePayrollManagementConfirmProvider } from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/feedback/AdminFinancePayrollManagementConfirmProvider';

export default function AdminFinancePayrollManagementPayrollPage() {
  return <AdminFinancePayrollManagementConfirmProvider><AdminFinancePayrollManagementPageContent /></AdminFinancePayrollManagementConfirmProvider>;
}

function AdminFinancePayrollManagementPageContent() {
  const t = useTranslations();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header><h1 className="text-2xl font-bold">{t('hr.admin_hr_tabs.tab_payroll')}</h1></header>
      <AdminFinancePayrollManagementKPIs />
      <AdminFinancePayrollManagementPayrollTable />
      <AdminFinancePayrollManagementPayrollModal />
      <AdminFinancePayrollManagementPaymentModal />
  </main>;
}
