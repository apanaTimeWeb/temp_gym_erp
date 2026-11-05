// RESPONSIBILITY: Renders the Payments screen body for Manager Finance; view selection is owned by the parent route controller.
'use client';
import { Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
import ManagerFinancePaymentsAndSummaryFilters from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryFilters';
import ManagerFinancePaymentsAndSummaryTable from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryTable';

interface ManagerFinancePaymentsAndSummaryPaymentsViewProps { isPending: boolean; isError: boolean; hasPayments: boolean; onRetry: () => void; }

export default function ManagerFinancePaymentsAndSummaryPaymentsView({ isPending, isError, hasPayments, onRetry }: ManagerFinancePaymentsAndSummaryPaymentsViewProps) {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <ManagerFinancePaymentsAndSummaryFilters />
      {isPending ? <ManagerTableSkeleton rows={6} /> : isError ? (
        <div className="space-y-3 py-16 text-center">
          <p className="text-sm font-medium text-danger-text">{t('TEXT_GENERIC_ERROR')}</p>
          <button data-testid="manager_finance-manager-finance-payments-retry" type="button" onClick={onRetry} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('COPY_TRY_AGAIN_1')}</button>
        </div>
      ) : !hasPayments ? (
        <div className="space-y-2 py-16 text-center">
          <Wallet size={18} strokeWidth={2} className="mx-auto text-text-secondary opacity-40" aria-hidden="true" />
          <p className="text-sm font-medium text-text-secondary">{t('COPY_NO_PAYMENTS_FOUND_1')}</p>
        </div>
      ) : <ManagerFinancePaymentsAndSummaryTable />}
    </div>
  );
}
