"use client";
// RESPONSIBILITY: Renders the not-found route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { SearchX } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { TRAINER_EARNINGS_PAGE_DASHBOARD } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';






/**
 * @description Renders the not-found route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the earnings feature's in-module not-found state with safe recovery/navigation behavior.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export function TrainerEarningsNotFoundView() {
  const t = useTranslations('TRAINER_EARNINGS');
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 text-center">
      <div className="bg-primary-subtle p-4 rounded-full mb-4">
        <SearchX size={18} className="text-primary"  strokeWidth={2}/>
      </div>
      <h2 className="text-section-title font-bold text-primary mb-2">{t("TEXT_PAGE_NOT_FOUND")}</h2>
      <p className="text-secondary max-w-md mb-6">{t("TEXT_PAGE_NOT_FOUND_DESCRIPTION")}</p>
      <Link 
        href={TRAINER_EARNINGS_PAGE_DASHBOARD}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-6 py-2 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base" data-testid="trainer_earnings-earnings-not_found_back">
        {t("TEXT_RETURN_TO_DASHBOARD")}
      </Link>
    </div>
  );
}


export default TrainerEarningsNotFoundView;
