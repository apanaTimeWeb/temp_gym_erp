"use client";
// RESPONSIBILITY: Renders the TrainerEarningsMain UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { AlertCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerEarningsDateFilterDropdown from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsDateFilterDropdown';

import TrainerEarningsHistory from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsHistory';

import TrainerEarningsKPIs from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsKPIs';

import TrainerEarningsPending from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsPending';

import { useTrainerEarningsQuery } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/useTrainerEarningsOverviewAndLedgerEarningsQuery';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureSkeletonBlock';










/**
 * @description Renders the TrainerEarningsMain UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the earnings feature UI responsibility represented by TrainerEarningsMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsMain() {
  const t = useTranslations('TRAINER_EARNINGS');
  const earningsQuery = useTrainerEarningsQuery();
  const { isPending, isError, isFetching, refetch, isInvalidRange } = earningsQuery;
  const pageHeader = (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
      <h1 className="text-page-title font-bold">{t("TEXT_EARNINGS")}</h1>
      <TrainerEarningsDateFilterDropdown />
    </div>
  );

  if (isInvalidRange) {
    return <main className="min-h-full pb-10"><div className="p-6 space-y-6">{pageHeader}</div></main>;
  }

  if (isPending) {
    return (
      <main className="min-h-full pb-10" data-testid="trainer_earnings-main-loading-state">
        <div className="p-6 space-y-6">{pageHeader}
          <div className="flex items-center justify-center pt-8" aria-busy="true">
            <div className="w-full max-w-4xl space-y-4"><TrainerInfrastructureSkeletonBlock className="h-28 rounded-xl border border-border" /><TrainerInfrastructureSkeletonBlock className="h-72 rounded-xl border border-border" /></div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-full pb-10">
        <div className="p-6 space-y-6">{pageHeader}
          <div className="bg-danger-bg border border-border rounded-xl p-4 flex items-center gap-3 text-danger max-w-md" role="alert" data-testid="trainer_earnings-trainer_earnings-main-danger-state-32-1">
            <AlertCircle size={18} strokeWidth={2}/>
            <div>
              <p className="font-bold">{t("TEXT_FAILED_TO_LOAD_EARNINGS_DATA")}</p>
              <p className="text-sm mt-1">{t("TEXT_UNABLE_TO_LOAD_EARNINGS_RIGHT_NOW_PLEASE_RETRY")}</p>
              <button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60">{isFetching ? t('TEXT_RETRYING') : t('TEXT_RETRY')}</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        {pageHeader}
        <TrainerEarningsKPIs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><TrainerEarningsHistory /></div>
          <div className="lg:col-span-1"><TrainerEarningsPending /></div>
        </div>
      </div>
    </main>
  );
}
