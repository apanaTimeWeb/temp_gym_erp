// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryMethodBreakdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { FINANCE_METHOD_STYLES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
import { ManagerFinancePaymentsAndSummaryFormatCurrency } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';
import type { ManagerFinancePaymentsAndSummaryMethodBreakdownProps } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_component_props.types';


/** @description Renders the ManagerFinancePaymentsAndSummaryMethodBreakdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerFinancePaymentsAndSummaryMethodBreakdown({ data }: ManagerFinancePaymentsAndSummaryMethodBreakdownProps) {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  const locale = useLocale();

  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <p className="text-sm font-semibold text-text-primary">{t("COPY_REVENUE_METHOD")}</p>
      {Object.entries(data).map(([method, amount], __testIdIndex0) => {
        const pct = Math.round((amount / total) * 100);
        const s = FINANCE_METHOD_STYLES[method] ?? { bg: 'bg-input', text: 'text-text-secondary' };
        return (
          <div key={method} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className={`font-semibold ${s.text}`}>{method}</span>
              <span className="text-text-secondary">{ManagerFinancePaymentsAndSummaryFormatCurrency(amount, ManagerEnvConfig.currencyCode, locale)} ({pct}%)</span>
            </div>
            <div className="h-2 bg-input rounded-full overflow-hidden">
              <progress data-testid={`manager_finance-manager-finance-method-breakdown-button-close-${__testIdIndex0}`} value={pct} max={100} aria-label={`${method}: ${t("COPY_PAYMENT_METHOD_SHARE")}`} aria-valuetext={`${pct}%`} className={`h-full w-full overflow-hidden rounded-full ${s.bg.replace('/10', '')} motion-safe:transition-all motion-safe:duration-300`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
