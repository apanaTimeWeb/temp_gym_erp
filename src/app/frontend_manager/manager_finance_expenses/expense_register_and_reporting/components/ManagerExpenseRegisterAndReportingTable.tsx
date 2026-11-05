// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { Edit, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';

import ManagerExpenseRegisterAndReportingEmptyState from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingEmptyState';
import { EXPENSE_ALL_STATUS_FILTER } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import { EXPENSE_PENDING_STATUS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import { EXPENSES_TABLE_HEADERS, EXPENSE_STATUS_STYLES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import { useManagerExpenseRegisterAndReportingLogic } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingLogic';
import { useExpensesListQuery } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingQueries';
import { ManagerExpenseRegisterAndReportingFormatCurrency, ManagerExpenseRegisterAndReportingFormatDate } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/utils/ManagerExpenseRegisterAndReportingFormatters';


/** @description Renders the ManagerExpenseRegisterAndReportingTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerExpenseRegisterAndReportingTable() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  const locale = useLocale();

  const { confirm } = useConfirm();
  const { search, statusFilter, currentPage, setCurrentPage, openEdit, deleteExpense, markAsPaid } = useManagerExpenseRegisterAndReportingLogic();
  
  const { data, isPending, isError, error, refetch } = useExpensesListQuery({
    search,
    status: statusFilter !== EXPENSE_ALL_STATUS_FILTER ? statusFilter : '',
    page: currentPage.toString() });

  const expenses = data?.expenses || [];
  const totalExpenses = data?.total || 0;

  const totalPages = Math.ceil(totalExpenses / MANAGER_ITEMS_PER_PAGE);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      {isPending ? (
        <ManagerTableSkeleton rows={6} />
      ) : isError ? (
        <div role="alert" className="p-8 text-center text-danger-text">{error instanceof Error ? error.message : t('TEXT_GENERIC_ERROR')} <button type="button" className="min-h-11 px-4 underline" onClick={() => void refetch()}>{t('COPY_RETRY')}</button></div>
      ) : (
        <>
          <div className="overflow-x-auto flex-1">
            <ManagerInfrastructureResponsiveTable labels={EXPENSES_TABLE_HEADERS}>
<table className="w-full">
              <thead className="bg-primary-subtle border-b border-border">
                <tr>
                  {EXPENSES_TABLE_HEADERS.map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.map((e, mapIndex) => {
                  const statusStyle = EXPENSE_STATUS_STYLES[e.status] || { bg: 'bg-input', text: 'text-text-secondary' };
                  return (
                    <tr key={e.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                      <td className="px-5 py-3.5 text-sm font-bold text-text-primary whitespace-nowrap">{e.id}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-text-primary whitespace-nowrap">
                        {e.title}
                        {e.referenceNo && <span className="block text-xs font-normal text-text-secondary mt-0.5">{t("COPY_REF")}{e.referenceNo}</span>}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary whitespace-nowrap">{e.category === 'Electricity' ? t('COPY_CATEGORY_ELECTRICITY') : e.category === 'Rent' ? t('COPY_CATEGORY_RENT') : e.category === 'Water Bill' ? t('COPY_CATEGORY_WATER_BILL') : e.category === 'Equipment Maintenance' ? t('COPY_CATEGORY_EQUIPMENT_MAINTENANCE') : e.category === 'Salary/Payroll' ? t('COPY_CATEGORY_SALARY_PAYROLL') : e.category === 'Marketing' ? t('COPY_CATEGORY_MARKETING') : e.category === 'Office Supplies' ? t('COPY_CATEGORY_OFFICE_SUPPLIES') : t('COPY_CATEGORY_MISCELLANEOUS')}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-text-primary whitespace-nowrap">{ManagerExpenseRegisterAndReportingFormatCurrency(e.amount, ManagerEnvConfig.currencyCode, locale)}</td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary whitespace-nowrap">
                        {ManagerExpenseRegisterAndReportingFormatDate(e.date)}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span data-testid={`manager_expenses-manager-expenses-table-status-${e.id}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                          {e.status === 'PAID' ? t('COPY_STATUS_PAID') : t('COPY_STATUS_PENDING')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {e.status === EXPENSE_PENDING_STATUS && (
                            <button aria-label={t("COPY_MARK_AS_PAID_1")} className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-1.5 rounded-lg bg-success-bg text-success-text hover:bg-success-bg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensestable-button-mark-as-paid-${mapIndex}`}
                              onClick={async () => {
                                const ok = await confirm({
                                  title: t("COPY_MARK_AS_PAID_2"),
                                  message: t("TEXT_MARK_EXPENSE_PAID_MESSAGE", { value: e.title }),
                                  confirmText: t("COPY_MARK_PAID") });
                                if (ok && markAsPaid) markAsPaid(e.id);
                              }}
                              
                              title={t("COPY_MARK_AS_PAID_1")}
                             type="button">
                              <CheckCircle2 size={18} strokeWidth={2}/>
                            </button>
                          )}
                          {e.receiptUrl && (
                            <a data-testid={`manager_expenses-expenses-managerexpensestable-a-view-receipt-${mapIndex}`} href={e.receiptUrl} target="_blank" rel="noopener noreferrer" aria-label={t("COPY_VIEW_RECEIPT")} className="min-h-11 min-w-11 p-1.5 rounded-lg bg-input text-text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t("COPY_VIEW_RECEIPT")}>
                              <ExternalLink size={18} strokeWidth={2}/>
                            </a>
                          )}
                          <button aria-label={t("COPY_EDIT")} className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-1.5 rounded-lg bg-input text-text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensestable-button-edit-${mapIndex}`} onClick={() => openEdit(e)}  title={t("COPY_EDIT")} type="button"><Edit size={18} strokeWidth={2}/></button>
                          <button aria-label={t("COPY_DELETE_1")} className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-1.5 rounded-lg bg-danger text-on-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensestable-button-delete-${mapIndex}`} onClick={async () => { 
                            const ok = await confirm({
                              title: t("COPY_DELETE_EXPENSE"),
                              message: t("TEXT_DELETE_EXPENSE_CONFIRM_MESSAGE", { value: e.title }),
                              type: 'danger',
                              confirmText: t("COPY_DELETE_2")
                            });
                            if (ok) { try { await deleteExpense(e.id); } catch { /* The owning mutation reports the failure; keep the row available for retry. */ } } 
                          }}  title={t("COPY_DELETE_1")} type="button"><Trash2 size={18} strokeWidth={2}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {expenses.length === 0 && !isPending && (
                  <tr>
                    <td colSpan={EXPENSES_TABLE_HEADERS.length} className="p-0 border-b-0">
                      <ManagerExpenseRegisterAndReportingEmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</ManagerInfrastructureResponsiveTable>
          </div>
          {totalPages > 1 && (
            <ManagerPagination data-testid="manager_expenses-managerexpensestable-managerpagination-1" 
              currentPage={currentPage} 
              totalPages={totalPages} 
              totalItems={totalExpenses} 
              itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
              onPageChange={setCurrentPage} 
            />
          )}
        </>
      )}
    </div>
  );
}
