// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesStatsBar within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders and composes SuperadminAffiliatesStatsBar for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { Users, Coins } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { SuperadminAffiliatesFormatCurrency } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatCurrency';

import type { SuperadminAffiliatesStatsBarProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_stats_bar.types';



/**
 * @description Renders the KPI stat cards (Total Affiliates, Total Commission Paid) for the Affiliates page. Purely presentational — receives data via props.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesManagementStatsBar({ totalAffiliates, totalCommission, currency = 'INR' }: SuperadminAffiliatesStatsBarProps) {
  const t = useTranslations('superadmin_affiliates');
    const locale = useLocale();

    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center motion-safe:hover:-translate-y-1 hover:shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-info-bg flex items-center justify-center">
            <Users size={18} className="text-info"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">{t('ui.total_affiliates_d21460f')}</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">{totalAffiliates}</div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center motion-safe:hover:-translate-y-1 hover:shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-success-bg flex items-center justify-center">
            <Coins size={18} className="text-success"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">{t('ui.current_page_commission_earned')}</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">
          {SuperadminAffiliatesFormatCurrency(totalCommission, currency, locale)}
        </div>
      </div>
    </div>);
}

