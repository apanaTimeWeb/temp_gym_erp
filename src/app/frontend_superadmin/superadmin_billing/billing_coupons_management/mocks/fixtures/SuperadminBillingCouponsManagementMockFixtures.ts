/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingCouponsMockFixtures owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';

import type { Coupon } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';



export const MOCK_SUPERADMIN_BILLING_COUPONS: Coupon[] = [
    { id: 'c1', code: 'WELCOME50', discountType: 'PERCENTAGE', discountValue: 50, maxUses: 100, currentUses: 2, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2026-10-31', isDeleted: false, redemptions: [{ id: 'r1', tenantName: 'Iron Paradise', redeemedAt: '2026-09-16T10:00:00.000Z', planName: 'PRO', discountApplied: 750000 }, { id: 'r2', tenantName: 'Fit Life Studio', redeemedAt: '2026-09-15T12:30:00.000Z', planName: 'BASIC', discountApplied: 500000 }] },
    { id: 'c2', code: 'PRO500', discountType: 'EXACT', discountValue: 50000, maxUses: 50, currentUses: 1, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2026-09-30', isDeleted: false, redemptions: [{ id: 'r3', tenantName: 'CrossFit Box', redeemedAt: '2026-09-14T09:00:00.000Z', planName: 'PRO', discountApplied: 50000 }] },
    { id: 'c3', code: 'SUMMER20', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 200, currentUses: 10, status: SUPERADMIN_COUPON_STATUS_CODES.EXPIRED, expiryDate: '2026-08-15', isDeleted: false },
    { id: 'c4', code: 'FULLYEAR10', discountType: 'PERCENTAGE', discountValue: 10, maxUses: 75, currentUses: 0, status: SUPERADMIN_COUPON_STATUS_CODES.INACTIVE, expiryDate: '2026-12-31', isDeleted: false },
    { id: 'c5', code: 'ENTERPRISE25', discountType: 'PERCENTAGE', discountValue: 25, maxUses: 25, currentUses: 25, status: SUPERADMIN_COUPON_STATUS_CODES.DEPLETED, expiryDate: '2026-10-15', isDeleted: false },
    { id: 'c6', code: 'FOUNDER1000', discountType: 'EXACT', discountValue: 100000, maxUses: 10, currentUses: 4, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2026-11-15', isDeleted: false },
    { id: 'c7', code: 'AUGUST15', discountType: 'PERCENTAGE', discountValue: 15, maxUses: 100, currentUses: 95, status: SUPERADMIN_COUPON_STATUS_CODES.DEPLETED, expiryDate: '2026-09-20', isDeleted: false },
    { id: 'c8', code: 'OLDYEAR5', discountType: 'PERCENTAGE', discountValue: 5, maxUses: 100, currentUses: 2, status: SUPERADMIN_COUPON_STATUS_CODES.EXPIRED, expiryDate: '2026-08-01', isDeleted: false },
    { id: 'c9', code: 'PAUSE20', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 40, currentUses: 0, status: SUPERADMIN_COUPON_STATUS_CODES.INACTIVE, expiryDate: '2026-12-15', isDeleted: false },
    { id: 'c10', code: 'FITSTART30', discountType: 'PERCENTAGE', discountValue: 30, maxUses: 60, currentUses: 18, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2026-10-10', isDeleted: false },

    { id: 'c11', code: 'TESTCOUPON11', discountType: 'PERCENTAGE', discountValue: 30, maxUses: 100, currentUses: 11, status: SUPERADMIN_COUPON_STATUS_CODES.DEPLETED, expiryDate: '2027-03-15', isDeleted: false, redemptions: [] },
    { id: 'c12', code: 'TESTCOUPON12', discountType: 'PERCENTAGE', discountValue: 5, maxUses: 100, currentUses: 12, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2027-04-15', isDeleted: false, redemptions: [] },
    { id: 'c13', code: 'TESTCOUPON13', discountType: 'PERCENTAGE', discountValue: 10, maxUses: 100, currentUses: 13, status: SUPERADMIN_COUPON_STATUS_CODES.INACTIVE, expiryDate: '2027-05-15', isDeleted: false, redemptions: [] },
    { id: 'c14', code: 'TESTCOUPON14', discountType: 'PERCENTAGE', discountValue: 15, maxUses: 100, currentUses: 14, status: SUPERADMIN_COUPON_STATUS_CODES.EXPIRED, expiryDate: '2027-06-15', isDeleted: false, redemptions: [] },
    { id: 'c15', code: 'TESTCOUPON15', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 100, currentUses: 15, status: SUPERADMIN_COUPON_STATUS_CODES.DEPLETED, expiryDate: '2027-07-15', isDeleted: false, redemptions: [] },
    { id: 'c16', code: 'TESTCOUPON16', discountType: 'PERCENTAGE', discountValue: 25, maxUses: 100, currentUses: 16, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2027-08-15', isDeleted: false, redemptions: [] },
    { id: 'c17', code: 'TESTCOUPON17', discountType: 'PERCENTAGE', discountValue: 30, maxUses: 100, currentUses: 17, status: SUPERADMIN_COUPON_STATUS_CODES.INACTIVE, expiryDate: '2027-09-15', isDeleted: false, redemptions: [] },
    { id: 'c18', code: 'TESTCOUPON18', discountType: 'PERCENTAGE', discountValue: 5, maxUses: 100, currentUses: 0, status: SUPERADMIN_COUPON_STATUS_CODES.EXPIRED, expiryDate: '2027-01-15', isDeleted: false, redemptions: [] },
    { id: 'c19', code: 'TESTCOUPON19', discountType: 'PERCENTAGE', discountValue: 10, maxUses: 100, currentUses: 1, status: SUPERADMIN_COUPON_STATUS_CODES.DEPLETED, expiryDate: '2027-02-15', isDeleted: false, redemptions: [] },
    { id: 'c20', code: 'TESTCOUPON20', discountType: 'PERCENTAGE', discountValue: 15, maxUses: 100, currentUses: 2, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2027-03-15', isDeleted: false, redemptions: [] },
    { id: 'c21', code: 'TESTCOUPON21', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 100, currentUses: 3, status: SUPERADMIN_COUPON_STATUS_CODES.INACTIVE, expiryDate: '2027-04-15', isDeleted: false, redemptions: [] },
    { id: 'c22', code: 'TESTCOUPON22', discountType: 'PERCENTAGE', discountValue: 25, maxUses: 100, currentUses: 4, status: SUPERADMIN_COUPON_STATUS_CODES.EXPIRED, expiryDate: '2027-05-15', isDeleted: false, redemptions: [] },
    { id: 'c23', code: 'TESTCOUPON23', discountType: 'PERCENTAGE', discountValue: 30, maxUses: 100, currentUses: 5, status: SUPERADMIN_COUPON_STATUS_CODES.DEPLETED, expiryDate: '2027-06-15', isDeleted: false, redemptions: [] },
    { id: 'c24', code: 'TESTCOUPON24', discountType: 'PERCENTAGE', discountValue: 5, maxUses: 100, currentUses: 6, status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, expiryDate: '2027-07-15', isDeleted: false, redemptions: [] },
    { id: 'c25', code: 'TESTCOUPON25', discountType: 'PERCENTAGE', discountValue: 10, maxUses: 100, currentUses: 7, status: SUPERADMIN_COUPON_STATUS_CODES.INACTIVE, expiryDate: '2027-08-15', isDeleted: false, redemptions: [] },
];
