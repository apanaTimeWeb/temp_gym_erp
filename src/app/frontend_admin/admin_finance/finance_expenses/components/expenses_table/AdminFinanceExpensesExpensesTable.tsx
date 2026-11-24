"use client";
// RESPONSIBILITY: Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewExpensesTable → accessible UI/events routed to owning hooks (admin_finance/finance_expenses/components/expenses_table/AdminFinanceOverviewExpensesTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import type { Expense } from '@/app/frontend_admin/admin_finance/finance_expenses/types/AdminFinanceExpensesTypes';
import { formatDate } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesFormatters';

import { displayValue } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesDisplayValue';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_expenses/hooks/useAdminFinanceExpensesLogic';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesFormatCurrency';
import { maskAdminFinanceListAmount } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesMaskFinancialAmount';

import { EXPENSE_CATEGORIES, FINANCE_EXPENSE_CATEGORY_LABEL_KEYS, FINANCE_EXPENSE_CATEGORY_STYLES, FINANCE_EXPENSE_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_finance/finance_expenses/constants/AdminFinanceExpensesConstants';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_finance/finance_expenses/components/AdminFinanceExpensesPagination';
import AdminFinanceEmptyState from '@/app/frontend_admin/admin_finance/finance_expenses/components/empty_state/AdminFinanceExpensesEmptyState';
import { CopyButton } from '@/components/ui/CopyButton';

const TABLE_COLUMN_COUNT = 6;

/**
 * AdminFinanceOverviewExpensesTable renders the admin finance expenses table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceOverviewExpensesTable: Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination.
 * @dependencies Consumes AdminFinanceFormatters, AdminNavigationLayoutDisplayValue, useAdminFinanceLogic, AdminFinanceFormatCurrency, AdminFinanceConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceOverviewExpensesTable() {
  const locale = useLocale();
  const t = useTranslations();

  const {
    expenses,
    totalExpenses,
    totalExpenseAmount,
    expenseCategory,
    expensePage,
    setExpenseCategory,
    setExpensePage,
    expensesStatus,
    loadAll,
  } = useAdminFinanceLogic();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={expenseCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setExpenseCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-xl text-sm bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            aria-label={t('finance.admin_finance_expenses_table.text_a78210146a')}
           data-testid="admin_finance-admin_finance-expenses-table-control">
            <option value="All" data-testid="admin_finance-admin_finance-expenses-table-control-2">{t('finance.admin_finance_expenses_table.text_1fd266c217')}</option>
            {EXPENSE_CATEGORIES.map((category , __testIdIndex60) => <option key={category} value={category} data-testid={`admin_finance-admin_finance-expenses-table-control-3-map60-${__testIdIndex60}-1`}>{t(FINANCE_EXPENSE_CATEGORY_LABEL_KEYS[category])}</option>)}
          </select>
          <span className="text-sm text-secondary">
            {t('finance.admin_finance_expenses_table.text_d8e7170f94')}<span className="font-bold text-danger">{AdminFinanceFormatCurrency(totalExpenseAmount, undefined, locale)}</span>
          </span>
        </div>
        <span className="text-xs text-secondary">{t('finance.admin_finance_expenses_table.text_51b38f2fd6')}</span>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto max-h-[640px] overflow-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight">
              <tr className="border-b border-border">
                {['finance.admin_finance_expenses_table.date', 'finance.admin_finance_expenses_table.category', 'finance.admin_finance_expenses_table.branch', 'finance.admin_finance_expenses_table.amount', 'finance.admin_finance_expenses_table.notes', 'finance.admin_finance_expenses_table.recordedBy'].map((heading, idx) => (
                  <th
                    key={heading}
                    className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap ${
                      idx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {t(heading)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {expensesStatus === 'pending' ? (
                ['expense-row-1', 'expense-row-2', 'expense-row-3', 'expense-row-4', 'expense-row-5'].map((key) => (
                  <tr key={key} className="motion-safe:animate-pulse motion-safe:duration-base">
                    {['expense-a', 'expense-b', 'expense-c', 'expense-d', 'expense-e', 'expense-f'].map((cell, cIdx) => (
                      <td key={`${key}-${cell}`} className={`px-4 py-4 ${cIdx === 0 ? 'sticky start-0 z-10 bg-card border-e border-border' : ''}`}>
                        <div className="h-4 rounded bg-skeleton-base" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : expensesStatus === 'error' ? (
                <tr><td colSpan={TABLE_COLUMN_COUNT} className="px-4 py-8 text-center"><p role="alert" className="text-danger">{t('finance.AdminFinanceLogic.genericError')}</p><button type="button" onClick={() => void loadAll()} className="mt-2 min-h-11 rounded-lg border border-border px-4 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="finance-overview-finance-overview-expenses-table-admin-finance-tabs-retry">{t('finance.admin_finance_tabs.retry')}</button></td></tr>
              ) : expenses.length === 0 ? (
                <tr><td colSpan={TABLE_COLUMN_COUNT}><AdminFinanceEmptyState title={t('finance.admin_finance_expenses_table.text_15f519954e')} description={t('finance.admin_finance_expenses_table.auto_4508b993fb')} /></td></tr>
              ) : (
                expenses.map((expense: Expense) => (
                  <tr key={expense.id} className="hover:bg-surface-hover transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3 text-sm font-semibold text-primary whitespace-nowrap">{formatDate(expense.date, locale)}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${FINANCE_EXPENSE_CATEGORY_STYLES[expense.category as keyof typeof FINANCE_EXPENSE_CATEGORY_STYLES] ?? 'bg-input text-secondary'}`} data-testid="finance-overview-finance-overview-expenses-table-status-badge">{t(FINANCE_EXPENSE_CATEGORY_LABEL_KEYS[expense.category as keyof typeof FINANCE_EXPENSE_CATEGORY_LABEL_KEYS] ?? 'finance.AdminAuditRepair.other')}</span></td>
                    <td className="px-4 py-3 text-sm text-primary">
                      <div className="flex items-center gap-1.5">
                        <span>{expense.branchName ?? expense.branchId}</span>
                        <CopyButton text={expense.branchName ?? expense.branchId} label={expense.branchName ?? expense.branchId} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-danger">
                      <div>
                        <span>{AdminFinanceFormatCurrency(expense.amount, 'INR', locale) !== '—' ? AdminFinanceFormatCurrency(expense.amount, 'INR', locale) : (Number.isFinite(expense.amount) ? `₹${(expense.amount > 1000 ? expense.amount / 100 : expense.amount).toLocaleString(locale)}` : '—')}</span>
                        {(expense.status || expense.paymentMode) && (
                          <div className="flex items-center gap-1.5 mt-1">
                            {expense.status && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                expense.status.toUpperCase() === 'PAID' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
                              }`}>
                                {expense.status}
                              </span>
                            )}
                            {expense.paymentMode && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-input border border-border rounded text-secondary font-normal">
                                {expense.paymentMode}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary max-w-xs">
                      <p className="truncate">{displayValue(expense.notes)}</p>
                      {(expense.vendor || expense.billNumber || expense.receiptUrl) && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs">
                          {expense.vendor && <span className="text-secondary font-medium">Vendor: {expense.vendor}</span>}
                          {expense.billNumber && <span className="text-secondary">Ref: {expense.billNumber}</span>}
                          {expense.receiptUrl && (
                            <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline text-[11px] font-medium hover:opacity-80">
                              Receipt
                            </a>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">{expense.recordedBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border">
          <AdminNavigationLayoutPagination currentPage={expensePage} totalPages={Math.max(1, Math.ceil(totalExpenses / FINANCE_EXPENSE_ITEMS_PER_PAGE))} onPageChange={setExpensePage} totalItems={totalExpenses} itemsPerPage={FINANCE_EXPENSE_ITEMS_PER_PAGE} />
        </div>
      </div>
    </div>
  );
}
