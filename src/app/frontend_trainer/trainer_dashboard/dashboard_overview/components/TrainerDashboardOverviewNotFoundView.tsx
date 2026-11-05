"use client";
// RESPONSIBILITY: Renders the not-found route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { SearchX } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { TRAINER_DASHBOARD_PAGE_LIST } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';






/**
 * @description Renders the not-found route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the dashboard feature's in-module not-found state with safe recovery/navigation behavior.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export function TrainerDashboardNotFoundView() {
  const t = useTranslations('TRAINER_DASHBOARD');
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 text-center">
      <div className="bg-primary-subtle p-4 rounded-full mb-4">
        <SearchX size={18} className="text-primary"  strokeWidth={2}/>
      </div>
      <h2 className="text-section-title font-bold text-primary mb-2">{t("TEXT_PAGE_NOT_FOUND")}</h2>
      <p className="text-secondary max-w-md mb-6">{t("TEXT_PAGE_NOT_FOUND_DESCRIPTION")}</p>
      <Link 
        href={TRAINER_DASHBOARD_PAGE_LIST}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-6 py-2 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base" data-testid="trainer_dashboard-dashboard-not_found_back">
        {t("TEXT_RETURN_TO_DASHBOARD")}
      </Link>
    </div>
  );
}


export default TrainerDashboardNotFoundView;
