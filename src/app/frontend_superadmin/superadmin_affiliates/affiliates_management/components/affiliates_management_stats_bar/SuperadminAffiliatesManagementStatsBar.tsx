// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesStatsBar within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Users, Coins } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { SuperadminAffiliatesFormatCurrency } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatCurrency';

import type { SuperadminAffiliatesStatsBarProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_stats_bar.types';

export default function SuperadminAffiliatesManagementStatsBar({ totalAffiliates, totalCommission, currency = 'INR' }: SuperadminAffiliatesStatsBarProps) {
  const t = useTranslations('superadmin_affiliates');
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220] border border-border dark:border-sky-500/35 rounded-2xl p-5 flex items-center justify-between gap-3 motion-safe:hover:-translate-y-0.5 shadow-card motion-safe:transition-all motion-safe:duration-base">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-transparent" />
        <div className="min-w-0">
          <span className="block text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.total_affiliates_d21460f')}</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums mt-1.5">{totalAffiliates}</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-info-bg border border-sky-500/35 flex items-center justify-center shrink-0">
          <Users size={18} className="text-info" />
        </div>
      </div>
      <div className="relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220] border border-border dark:border-emerald-500/35 rounded-2xl p-5 flex items-center justify-between gap-3 motion-safe:hover:-translate-y-0.5 shadow-card motion-safe:transition-all motion-safe:duration-base">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-transparent" />
        <div className="min-w-0">
          <span className="block text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.current_page_commission_earned')}</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums mt-1.5">
            {SuperadminAffiliatesFormatCurrency(totalCommission, currency, locale)}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-success-bg border border-emerald-500/35 flex items-center justify-center shrink-0">
          <Coins size={18} className="text-success" />
        </div>
      </div>
    </div>
  );
}
