// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';


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
      

      <div className="p-6 space-y-6">
        <div className="flex justify-end"><button type="button" onClick={() => ui.setShowModal(true)} data-testid="manager_finance-managerfinancecontent-button-record-payment" className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"> <Plus size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_RECORD_PAYMENT')}</button></div>
        {/* KPIs */}
        <ManagerFinancePaymentsAndSummaryKpiCards />

        {/* Tabs */}
        <div className="flex gap-1 bg-input rounded-xl p-1 w-fit">
          {FINANCE_TABS.map((tabValue, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-5 py-2 text-sm font-medium rounded-lg motion-safe:transition-all ${
                tab === tabValue ? 'bg-card text-primary shadow-card' : 'text-text-secondary hover:text-primary'
              } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_finance-finance-managerfinancecontent-button-${tabValue}-${mapIndex}`}
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
