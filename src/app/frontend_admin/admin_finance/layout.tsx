"use client";
// Domain shell only: exposes autonomous finance submodules as responsive secondary navigation.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
  return (
    <div className="min-h-full bg-page text-text-primary trainer-aurora-canvas">
      <nav aria-label={t('admin_navigation.AdminNavigation.financeNavigation')} className="border-b border-border/80 bg-header/95 dark:bg-[#0B0F19]/85 backdrop-blur-md px-3 py-2.5 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto trainer-shell-scrollbar">
          {NAV_GROUPS.map((group, groupIndex) => {
            const groupActive = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <div key={group.key} className="flex items-center gap-1.5 shrink-0">
                {groupIndex > 0 && <span className="h-5 w-px bg-border mx-1 shrink-0" aria-hidden="true" />}
                {group.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`inline-flex min-h-10 shrink-0 items-center rounded-xl border px-3.5 py-1.5 text-xs sm:text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ${
                        active
                          ? 'border-orange-500/45 bg-orange-500/15 text-orange-600 dark:text-orange-300 shadow-[0_2px_10px_rgba(255,90,31,0.16)]'
                          : 'border-transparent text-secondary hover:bg-surface-hover hover:text-text-primary'
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
                {groupActive ? <span className="sr-only">{t('admin_navigation.AdminNavigation.activeDomain')}</span> : null}
              </div>
            );
          })}
        </div>
      </nav>
      {children}
    </div>
  );
}
