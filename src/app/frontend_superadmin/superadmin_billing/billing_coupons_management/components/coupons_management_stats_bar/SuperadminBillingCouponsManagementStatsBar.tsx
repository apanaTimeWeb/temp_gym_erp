// RESPONSIBILITY: Renders/orchestrates SuperadminBillingCouponsStatsBar within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Tag, CheckCircle2, Ticket } from 'lucide-react';
import { useLocale as useFormatterLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { useDateRangeSuffix } from '@/hooks/useDateRangeSuffix';

import { SUPERADMIN_BILLING_COUPONS_KPI_TYPES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementPresentationFormatters';

import type { SuperadminBillingCouponsStatsBarProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_stats_bar.types';

export default function SuperadminBillingCouponsManagementStatsBar({ activeCoupons, totalRedeemed, totalCoupons, activeKpi, onKpiClick }: SuperadminBillingCouponsStatsBarProps) {
  const formatterLocale = useFormatterLocale();
  const t = useTranslations('superadmin_coupons');
  const dateSuffix = useDateRangeSuffix();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        type="button"
        onClick={() => onKpiClick(SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0])}
        aria-pressed={activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0]}
        className={`relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220] border rounded-2xl p-5 text-start flex flex-col justify-center cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 shadow-card ${activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0] ? 'border-sky-400 ring-2 ring-sky-500/40' : 'border-border dark:border-sky-500/35'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        data-testid="superadmin_coupons-superadmin-coupons-stats-bar-coupons-stats-bar-button"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-transparent" />
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.total_coupons_73002288')}{dateSuffix}</span>
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/35 flex items-center justify-center shrink-0">
            <Ticket size={17} className="text-sky-500 dark:text-sky-400" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">{totalCoupons}</div>
      </button>

      <button
        type="button"
        onClick={() => onKpiClick(activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1] ? SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0] : SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1])}
        aria-pressed={activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1]}
        className={`relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220] border rounded-2xl p-5 text-start flex flex-col justify-center cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 shadow-card ${activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1] ? 'border-orange-400 ring-2 ring-orange-500/40' : 'border-border dark:border-orange-500/35'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        data-testid="superadmin_coupons-stats-bar-active-kpi"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FB923C] to-transparent" />
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.active_coupons_772fd036')}{dateSuffix}</span>
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center shrink-0">
            <CheckCircle2 size={17} className="text-primary" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">{activeCoupons}</div>
      </button>

      <button
        type="button"
        onClick={() => onKpiClick(activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2] ? SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0] : SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2])}
        aria-pressed={activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2]}
        className={`relative overflow-hidden bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220] border rounded-2xl p-5 text-start flex flex-col justify-center cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 shadow-card ${activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2] ? 'border-emerald-400 ring-2 ring-emerald-500/40' : 'border-border dark:border-emerald-500/35'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        data-testid="superadmin_coupons-stats-bar-redeemed-kpi"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-transparent" />
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{t('ui.total_redeemed_77063424')}{dateSuffix}</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center shrink-0">
            <Tag size={17} className="text-success" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">{formatNumber(totalRedeemed, formatterLocale)}</div>
      </button>
    </div>
  );
}
