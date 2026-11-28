// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';


import ManagerFinancePaymentsAndSummaryDateFilterDropdown from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryDateFilterDropdown';
import ManagerFinancePaymentsAndSummaryKpiCards from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryKpiCards';
import ManagerFinancePaymentsAndSummaryPaymentModal from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryPaymentModal';
import { FINANCE_TABS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_view.constants';
import ManagerFinancePaymentsAndSummaryPaymentsView from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryPaymentsView';
import ManagerFinancePaymentsAndSummarySummaryView from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummarySummaryView';
import { useManagerFinancePaymentsAndSummaryLogic } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryLogic';
import { useManagerFinancePaymentsAndSummaryUiStore } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore';

/** @description Renders the ManagerFinancePaymentsAndSummaryContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves error state. */
export function ManagerFinancePaymentsAndSummaryContent() {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  const ui = useManagerFinancePaymentsAndSummaryUiStore();

  const { tab, setTab, payments, isPending, isError, reload } = useManagerFinancePaymentsAndSummaryLogic();

  return (
    <div className="min-h-full pb-10">
      

      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-page-title font-extrabold text-text-primary">{t('COPY_BRANCH_FINANCE')}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ManagerFinancePaymentsAndSummaryDateFilterDropdown />
            <button type="button" onClick={() => ui.setShowModal(true)} data-testid="manager_finance-managerfinancecontent-button-record-payment" className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"> <Plus size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_RECORD_PAYMENT')}</button>
          </div>
        </div>
        {/* KPIs */}
        <ManagerFinancePaymentsAndSummaryKpiCards />

        {/* Tabs */}
        <div className="flex gap-1.5 bg-card dark:bg-[#0E1526] border border-border dark:border-white/15 rounded-2xl p-1.5 w-full sm:w-fit overflow-x-auto shadow-card">
          {FINANCE_TABS.map((tabValue, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-10 whitespace-nowrap px-5 py-2 text-sm font-semibold rounded-xl motion-safe:transition-all ${
                tab === tabValue ? 'bg-primary text-on-primary shadow-sm shadow-orange-500/25' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 cursor-pointer`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_finance-finance-managerfinancecontent-button-${tabValue}-${mapIndex}`}
              key={tabValue}
              onClick={() => setTab(tabValue)}
              
             type="button">
              {tabValue === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW ? t('COPY_PAYMENTS') : t('COPY_SUMMARY')}
            </button>
          ))}
        </div>

        {/* Screen selection is URL-backed; each screen body is owned by the module views folder. */}
        {tab === MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAYMENTS_VIEW ? (
          <ManagerFinancePaymentsAndSummaryPaymentsView isPending={isPending} isError={isError} hasPayments={payments.length > 0} onRetry={reload} />
        ) : <ManagerFinancePaymentsAndSummarySummaryView />}
        {ui.showModal ? <ManagerFinancePaymentsAndSummaryPaymentModal /> : null}
      </div>
    </div>
  );
}
