"use client";
import { useTranslations } from 'next-intl';
// Route entry for Admin Finance Ledger. Workflow logic stays inside this autonomous leaf.
import AdminFinanceStaffLedgerManagementKPIs from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/kpis/AdminFinanceStaffLedgerManagementKPIs';
import AdminFinanceStaffLedgerManagementLedgerTable from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/components/ledger_table/AdminFinanceStaffLedgerManagementLedgerTable';

export default function AdminFinanceStaffLedgerManagementLedgerPage() {
  const t = useTranslations();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header><h1 className="text-2xl font-bold">{t('hr.admin_hr_tabs.tab_ledger')}</h1></header>
      <AdminFinanceStaffLedgerManagementKPIs />
      <AdminFinanceStaffLedgerManagementLedgerTable />
  </main>;
}
