// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { Printer, Banknote } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';

import ManagerFinancePaymentsAndSummaryEmptyState from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryEmptyState';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENT_STATUS_PAID, MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENT_STATUS_REFUNDED } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary.constants';
import { PAYMENTS_TABLE_HEADERS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_METHOD_STYLES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
import { useManagerFinancePaymentsAndSummaryLogic } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryLogic';
import { useManagerFinancePaymentsAndSummaryUiStore } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore';
import { ManagerFinancePaymentsAndSummaryDisplayValue, ManagerFinancePaymentsAndSummaryFormatCurrency, ManagerFinancePaymentsAndSummaryFormatDate, ManagerFinancePaymentsAndSummaryMaskSensitiveData } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';


/**
 * @description Renders/orchestrates the ManagerFinancePaymentsAndSummaryTable user interface for the finance module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_finance_utils/ManagerFinancePaymentsAndSummaryFormatters; @/app/frontend_manager/manager_finance_expenses/manager_finance_components/manager_finance_empty_state/ManagerFinancePaymentsAndSummaryEmptyState; @/app/frontend_manager/manager_finance_expenses/manager_finance_hooks/useManagerFinancePaymentsAndSummaryLogic; @/app/frontend_manager/manager_finance_expenses/manager_finance_constants/ManagerFinancePaymentsAndSummarySharedConstants; @/components/ui/manager_pagination/ManagerPagination
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerFinancePaymentsAndSummaryTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerFinancePaymentsAndSummaryTable() {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  const locale = useLocale();

  const { payments, totalPayments, currentPage, setCurrentPage, printReceipt } = useManagerFinancePaymentsAndSummaryLogic();
  const setShowModal = useManagerFinancePaymentsAndSummaryUiStore((s) => s.setShowModal);
  const totalPages = Math.ceil(totalPayments / MANAGER_ITEMS_PER_PAGE);

  return (
    <>
      <ManagerInfrastructureResponsiveTable labels={PAYMENTS_TABLE_HEADERS}>
<table className="w-full">
          <thead className="bg-primary-subtle border-b border-border">
            <tr>
              {PAYMENTS_TABLE_HEADERS.map(h => (
                <th key={`th-${h}`} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(() => { if (payments.length === 0) { return (
              <tr><td colSpan={PAYMENTS_TABLE_HEADERS.length}><ManagerFinancePaymentsAndSummaryEmptyState /></td></tr>
            ); } return payments.map((p, mapIndex) => {
              const ms = MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_METHOD_STYLES[p.method] ?? { bg: 'bg-input', text: 'text-text-secondary' };
              return (
                <tr key={p.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
                  <td className="px-3 py-3 text-sm font-bold text-text-primary whitespace-nowrap">{p.invoiceNumber}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <p className="text-sm font-semibold text-text-primary">{ManagerFinancePaymentsAndSummaryDisplayValue(p.member?.name)}</p>
                    <p className="text-xs text-text-secondary">{ManagerFinancePaymentsAndSummaryMaskSensitiveData(p.member?.email, 'email')}</p>
                  </td>
                  <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">{ManagerFinancePaymentsAndSummaryDisplayValue(p.member?.plan?.name)}</td>
                  <td className="px-3 py-3 text-sm font-semibold text-success-text whitespace-nowrap">{ManagerFinancePaymentsAndSummaryFormatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${ms.bg} ${ms.text}`}>{p.method}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      (() => { if (p.status === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENT_STATUS_PAID) return 'bg-success-bg text-success-text'; return (() => { if (p.status === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENT_STATUS_REFUNDED) return 'bg-warning-bg text-warning-text'; return 'bg-danger-bg text-danger-text'; })(); })()
                    }`} data-testid={`manager_finance-managerfinancetable-status-${p.id}`}>{p.status}</span>
                  </td>
                  <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                    {ManagerFinancePaymentsAndSummaryFormatDate(p.paidAt)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {(p.status === 'DUE' || p.status === 'PARTIAL' || p.status === 'PENDING') && (
                        <button
                          className="min-h-11 min-w-11 md:min-h-8 md:min-w-8 p-1.5 flex items-center justify-center rounded-lg bg-warning-bg text-warning-text hover:bg-warning hover:text-on-warning border border-warning/30 motion-safe:transition-all motion-safe:duration-200 ease-in-out active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none"
                          data-testid={`manager_finance-managerfinancetable-button-collect-due-${p.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowModal(true);
                          }}
                          title="Collect Due Payment"
                          aria-label={`Collect Due for Invoice ${p.invoiceNumber}`}
                          type="button"
                        >
                          <Banknote size={16} strokeWidth={2} />
                        </button>
                      )}
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 md:min-h-8 md:min-w-8 p-1.5 flex items-center justify-center rounded-lg bg-input text-text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_finance-finance-managerfinancetable-button-print-receipt-${mapIndex}`} 
                        onClick={(event) => { event.stopPropagation(); printReceipt(p.id); }}
                         
                        title={t("COPY_PRINT_RECEIPT")} aria-label={t("TEXT_PRINT_RECEIPT_FOR_INVOICE", { value: p.invoiceNumber })}
                       type="button">
                        <Printer size={16} strokeWidth={2}/>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }); })()}
          </tbody>
        </table>
</ManagerInfrastructureResponsiveTable>
      <ManagerPagination data-testid="manager_finance-managerfinancetable-managerpagination-1"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalPayments}
        itemsPerPage={MANAGER_ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
