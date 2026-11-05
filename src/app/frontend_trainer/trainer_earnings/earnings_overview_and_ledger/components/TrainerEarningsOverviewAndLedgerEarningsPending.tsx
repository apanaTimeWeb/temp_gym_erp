"use client";
// RESPONSIBILITY: Renders the TrainerEarningsPending UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { CalendarClock } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { TRAINER_EARNINGS_PAYOUT_STATUS_STYLES } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';

import { useTrainerEarningsQuery } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/useTrainerEarningsOverviewAndLedgerEarningsQuery';

import { TrainerEarningsFormatDate } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters';

import { TrainerEarningsFormatCurrency } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureSkeletonBlock';









/**
 * @description Renders the TrainerEarningsPending UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the earnings feature UI responsibility represented by TrainerEarningsPending, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsPending() {
  const t = useTranslations('TRAINER_EARNINGS');
  const locale = useLocale();
  const { data } = useTrainerEarningsQuery();
  const pendingPayouts = data?.pendingPayouts || [];

  if (!data) {
    return <TrainerInfrastructureSkeletonBlock className="h-72 rounded-xl border border-border" />;
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-header">
        <h2 className="text-section-title font-semibold text-primary">{t("TEXT_UPCOMING_PAYOUTS")}</h2>
      </div>
      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar space-y-4">
        {pendingPayouts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <CalendarClock size={18} className="text-disabled mb-3"  strokeWidth={2}/>
            <p className="text-sm font-semibold text-primary">{t("TEXT_NO_PENDING_PAYOUTS")}</p>
            <p className="text-xs text-secondary mt-1">{t("TEXT_YOU_ARE_ALL_CAUGHT_UP")}</p>
          </div>
        ) : (
          pendingPayouts.map(p => {
            const style = TRAINER_EARNINGS_PAYOUT_STATUS_STYLES[p.status];
            return (
              <div key={p.id} className="p-4 rounded-xl border border-border bg-page flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-primary">{TrainerEarningsFormatCurrency(p.amount, p.currency, locale)}</p>
                    <p className="text-xs text-secondary mt-0.5">{p.period}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${style?.bg || 'bg-input'} ${style?.text || 'text-secondary'}`} data-testid={`trainer_earnings-earnings-pending-status-${p.id}`}>
                    {style ? t(style.labelKey) : t('TEXT_STATUS_UNKNOWN')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-secondary pt-3 border-t border-border">
                  <CalendarClock size={18}  strokeWidth={2}/>
                  <span>{t("TEXT_DUE_BY")}{TrainerEarningsFormatDate(p.dueDate, locale)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
