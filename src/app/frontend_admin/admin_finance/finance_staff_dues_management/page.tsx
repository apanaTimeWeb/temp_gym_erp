"use client";
import { useTranslations } from 'next-intl';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/components/feedback/AdminFinanceStaffDuesManagementConfirmProvider';

// Route entry for Admin Finance Dues. Workflow logic stays inside this autonomous leaf.
import AdminFinanceStaffDuesManagementKPIs from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/components/kpis/AdminFinanceStaffDuesManagementKPIs';
import AdminFinanceStaffDuesManagementDueTable from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/components/due_table/AdminFinanceStaffDuesManagementDueTable';

export default function AdminFinanceStaffDuesManagementDuesPage() {
  const t = useTranslations();
  return <AdminNavigationLayoutConfirmProvider><main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header><h1 className="text-2xl font-bold">{t('hr.admin_hr_tabs.tab_dues')}</h1></header>
      <AdminFinanceStaffDuesManagementKPIs />
      <AdminFinanceStaffDuesManagementDueTable />
  </main></AdminNavigationLayoutConfirmProvider>;
}
