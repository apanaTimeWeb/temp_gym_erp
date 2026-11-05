"use client";
// Domain shell only: exposes autonomous finance submodules as responsive secondary navigation.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const NAV_GROUPS = [
  { key: 'transactionsOperations', labelKey: 'admin_navigation.AdminNavigation.financeGroups.transactionsOperations', items: [
      { href: '/frontend_admin/admin_finance/finance_payments', labelKey: 'admin_navigation.AdminNavigation.financeTabs.payments' },
      { href: '/frontend_admin/admin_finance/finance_expenses', labelKey: 'admin_navigation.AdminNavigation.financeTabs.expenses' },
      { href: '/frontend_admin/admin_finance/finance_summary', labelKey: 'admin_navigation.AdminNavigation.financeTabs.summary' },
      { href: '/frontend_admin/admin_finance/finance_payouts_management', labelKey: 'admin_navigation.AdminNavigation.financeTabs.payouts' }
  ] },
  { key: 'staffFinance', labelKey: 'admin_navigation.AdminNavigation.financeGroups.staffFinance', items: [
      { href: '/frontend_admin/admin_finance/finance_payroll_management', labelKey: 'admin_navigation.AdminNavigation.financeTabs.payroll' },
      { href: '/frontend_admin/admin_finance/finance_salary_advance_management', labelKey: 'admin_navigation.AdminNavigation.financeTabs.salaryAdvances' },
      { href: '/frontend_admin/admin_finance/finance_staff_dues_management', labelKey: 'admin_navigation.AdminNavigation.financeTabs.staffDues' },
      { href: '/frontend_admin/admin_finance/finance_staff_ledger_management', labelKey: 'admin_navigation.AdminNavigation.financeTabs.staffLedger' }
  ] },
  { key: 'financialAnalyticsReports', labelKey: 'admin_navigation.AdminNavigation.financeGroups.financialAnalyticsReports', items: [
      { href: '/frontend_admin/admin_finance/finance_branch_profit_and_loss', labelKey: 'admin_navigation.AdminNavigation.financeTabs.branchPnl' },
      { href: '/frontend_admin/admin_finance/finance_plan_revenue_analytics', labelKey: 'admin_navigation.AdminNavigation.financeTabs.planRevenue' },
      { href: '/frontend_admin/admin_finance/finance_profit_and_loss_report', labelKey: 'admin_navigation.AdminNavigation.financeTabs.pnlReport' },
      { href: '/frontend_admin/admin_finance/finance_revenue_report', labelKey: 'admin_navigation.AdminNavigation.financeTabs.revenueReport' },
      { href: '/frontend_admin/admin_finance/finance_payroll_report', labelKey: 'admin_navigation.AdminNavigation.financeTabs.payrollReport' }
  ] },
] as const;

export default function AdminFinanceDomainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  return <div className="min-h-full bg-page text-primary">
    <nav aria-label={t('admin_navigation.AdminNavigation.financeNavigation')} className="sticky top-0 z-20 border-b border-border bg-header px-3 py-3 sm:px-4">
      <div className="grid gap-2 lg:grid-cols-3">
        {NAV_GROUPS.map((group) => {
          const groupActive = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
          return <details key={group.key} className="min-w-0 rounded-xl border border-border bg-card" open={groupActive || undefined}>
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span>{t(group.labelKey)}</span><ChevronDown aria-hidden="true" size={16} className="shrink-0 text-secondary" />
            </summary>
            <div className="flex flex-wrap gap-2 border-t border-border p-3">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors ${active ? 'border-focus bg-surface-highlight text-primary' : 'border-transparent text-secondary hover:bg-surface-hover hover:text-primary'}`}>{t(item.labelKey)}</Link>;
              })}
            </div>
          </details>;
        })}
      </div>
    </nav>
    {children}
  </div>;
}
