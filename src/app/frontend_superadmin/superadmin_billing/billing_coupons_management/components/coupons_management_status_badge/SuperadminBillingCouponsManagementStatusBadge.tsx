// RESPONSIBILITY: Renders/orchestrates SuperadminBillingCouponsStatusBadge within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingCouponsStatusBadge owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_status_badge.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors.
import { useTranslations } from 'next-intl';

import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';

import type { SuperadminBillingCouponsStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_status_badge.types';



/**
 * @description Renders CouponsStatusBadge within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminBillingCouponsManagementStatusBadge({ status }: SuperadminBillingCouponsStatusBadgeProps) {
  const t = useTranslations('superadmin_coupons');
    switch (status) {
        case SUPERADMIN_COUPON_STATUS_CODES.ACTIVE:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success" data-testid="superadmin_coupons-superadmin-coupons-status-badge-coupons-status-badge-status">{t('ui.active_18ff74f4')}</span>;
        case SUPERADMIN_COUPON_STATUS_CODES.INACTIVE:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary" data-testid="superadmin_coupons-couponsstatusbadge-state">{t('ui.inactive_6b273343')}</span>;
        case SUPERADMIN_COUPON_STATUS_CODES.EXPIRED:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">{t('ui.expired_38afd7ae')}</span>;
        case SUPERADMIN_COUPON_STATUS_CODES.DEPLETED:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning">{t('ui.depleted_e3b87190')}</span>;
        default:
            return null;
    }
}
