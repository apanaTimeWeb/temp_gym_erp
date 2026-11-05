import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

export default function ManagerFinanceExpensesDomainLayout({ children }: { children: ReactNode }) {
  const t = useTranslations('MANAGER_FINANCE_EXPENSES_NAVIGATION');
 return <section aria-label={t('DOMAIN_LABEL')} className="min-h-full"><nav aria-label={t('SUBMODULE_NAVIGATION_LABEL')} className="flex flex-wrap gap-2 border-b border-border px-6 py-3 bg-card">
        <a href="/frontend_manager/manager_finance_expenses/finance_payments_and_summary" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_finance_expenses-layout-link-finance_payments_and_summary">{t('FINANCE')}</a>
        <a href="/frontend_manager/manager_finance_expenses/expense_register_and_reporting" className={`inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring`} data-testid="manager_manager_finance_expenses-layout-link-expense_register_and_reporting">{t('EXPENSES')}</a>
</nav>{children}</section>;
}
