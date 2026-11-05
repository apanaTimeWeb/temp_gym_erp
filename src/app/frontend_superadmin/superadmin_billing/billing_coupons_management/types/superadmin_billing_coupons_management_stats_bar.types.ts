/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingCouponsStatsBarTypes owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Type contract extracted from SuperadminBillingCouponsStatsBar.tsx; no business behavior.

import type { SUPERADMIN_BILLING_COUPONS_KPI_TYPES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
export type SuperadminBillingCouponsKpi = typeof SUPERADMIN_BILLING_COUPONS_KPI_TYPES[number];

export interface SuperadminBillingCouponsStatsBarProps {
    activeCoupons: number;
    totalRedeemed: number;
    totalCoupons: number;
    activeKpi: SuperadminBillingCouponsKpi;
    onKpiClick: (kpi: SuperadminBillingCouponsKpi) => void;
}
