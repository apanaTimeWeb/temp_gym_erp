// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin coupons feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.

import { MOCK_COUPONS_EXPANDED } from '@/app/frontend_admin/admin_billing/billing_coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockFixtures';
import type { Coupon } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';

/**
 * cloneCouponRecords is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function cloneCouponRecords(records: Coupon[]): Coupon[] {
  return records.map((record) => ({
    ...record,
    assignedGyms: [...record.assignedGyms],
    assignedGymNames: [...record.assignedGymNames],
  }));
}

let adminCouponsMockState = cloneCouponRecords(MOCK_COUPONS_EXPANDED);

/**
 * getAdminCouponsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminCouponsMockState(): Coupon[] {
  return adminCouponsMockState;
}

/**
 * resetAdminCouponsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function resetAdminCouponsMockState(): void {
  adminCouponsMockState = cloneCouponRecords(MOCK_COUPONS_EXPANDED);
}
