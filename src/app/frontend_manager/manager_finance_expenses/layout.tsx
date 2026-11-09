'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/frontend_manager/manager_finance_expenses/finance_payments_and_summary', labelKey: 'FINANCE', testId: 'manager_manager_finance_expenses-layout-link-finance_payments_and_summary' },
  { href: '/frontend_manager/manager_finance_expenses/expense_register_and_reporting', labelKey: 'EXPENSES', testId: 'manager_manager_finance_expenses-layout-link-expense_register_and_reporting' },
] as const;

export default function ManagerFinanceExpensesDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_FINANCE_EXPENSES_NAVIGATION');
  const pathname = usePathname();

  return (
    <section aria-label={t('DOMAIN_LABEL')} className="min-h-full">
      <nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary-subtle text-primary border-primary' : 'text-text-secondary hover:text-text-primary hover:bg-input'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`}
              data-testid={item.testId}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      {children}
    </section>
  );
}
