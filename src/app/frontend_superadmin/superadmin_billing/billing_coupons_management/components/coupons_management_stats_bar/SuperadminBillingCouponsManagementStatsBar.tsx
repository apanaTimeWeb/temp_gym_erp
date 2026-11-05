// RESPONSIBILITY: Renders/orchestrates SuperadminBillingCouponsStatsBar within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Tag, CheckCircle2, Ticket } from 'lucide-react';
import { useLocale as useFormatterLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { useDateRangeSuffix } from '@/hooks/useDateRangeSuffix';

import { SUPERADMIN_BILLING_COUPONS_KPI_TYPES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementPresentationFormatters';

import type { SuperadminBillingCouponsStatsBarProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_stats_bar.types';

/**
 * RESPONSIBILITY: React component SuperadminBillingCouponsStatsBar owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useDateRangeSuffix, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/hooks/useDateRangeSuffix, @/lib/formatters, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_stats_bar.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the KPI stat cards (Active Coupons, Total Redeemed) for the Coupons page. Purely presentational â€” receives data via props.


/** @description Displays coupon KPI/stat cards and delegates KPI selection back to the owning module. @dependencies Receives already-derived statistics and the KPI click handler. @edge-case Read-only presentation must remain usable when individual counts are zero. */
export default function SuperadminBillingCouponsManagementStatsBar({ activeCoupons, totalRedeemed, totalCoupons, activeKpi, onKpiClick }: SuperadminBillingCouponsStatsBarProps) {
 const formatterLocale = useFormatterLocale();

  const t = useTranslations('superadmin_coupons');
    const dateSuffix = useDateRangeSuffix();
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button type="button" onClick={() => onKpiClick(SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0])} aria-pressed={activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0]}
     className={`bg-card border rounded-xl p-5 text-start flex flex-col justify-center cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card ${activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0] ? 'border-focus ring-2 ring-primary' : 'border-border'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid="superadmin_coupons-superadmin-coupons-stats-bar-coupons-stats-bar-button">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-surface-highlight flex items-center justify-center">
            <Ticket size={18} className="text-secondary"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">{t('ui.total_coupons_73002288')}{dateSuffix}</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">{totalCoupons}</div>
      </button>

      <button type="button" onClick={() => onKpiClick(activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1] ? SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0] : SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1])} aria-pressed={activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1]} className={`bg-card border rounded-xl p-5 text-start flex flex-col justify-center cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card ${activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[1] ? 'border-focus ring-2 ring-primary' : 'border-border'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid="superadmin_coupons-stats-bar-active-kpi">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-subtle flex items-center justify-center">
            <CheckCircle2 size={18} className="text-primary"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">{t('ui.active_coupons_772fd036')}{dateSuffix}</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">{activeCoupons}</div>
      </button>

      <button type="button" onClick={() => onKpiClick(activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2] ? SUPERADMIN_BILLING_COUPONS_KPI_TYPES[0] : SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2])} aria-pressed={activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2]} className={`bg-card border rounded-xl p-5 text-start flex flex-col justify-center cursor-pointer motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card ${activeKpi === SUPERADMIN_BILLING_COUPONS_KPI_TYPES[2] ? 'border-success ring-2 ring-success' : 'border-border'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid="superadmin_coupons-stats-bar-redeemed-kpi">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-success-bg flex items-center justify-center">
            <Tag size={18} className="text-success"/>
          </div>
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">{t('ui.total_redeemed_77063424')}{dateSuffix}</span>
        </div>
        <div className="text-3xl font-bold text-primary mt-1">{formatNumber(totalRedeemed, formatterLocale)}</div>
      </button>
    </div>);
}
