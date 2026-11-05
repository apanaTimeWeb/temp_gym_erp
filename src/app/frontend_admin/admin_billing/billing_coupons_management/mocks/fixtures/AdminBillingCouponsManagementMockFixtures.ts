// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_coupons/coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockFixtures.ts)
import { COUPON_STATUS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin coupons feature.
import type { CouponsKPIData } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin coupons feature.
import type { Coupon, CouponStatus } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';

export const MOCK_COUPONS: Coupon[] = [
  { id: 'c1', code: 'WELCOME20', description: '20% off for new members', type: 'percentage', value: 20, minOrderAmount: 100000, maxDiscount: 50000, usageLimit: 200, usedCount: 87, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2026-01-01', validUntil: '2026-06-30', status: COUPON_STATUS.ACTIVE, createdAt: '2026-01-01' },
  { id: 'c2', code: 'FLAT500', description: '500 flat off on annual plans', type: 'flat', value: 50000, minOrderAmount: 500000, maxDiscount: 50000, usageLimit: 100, usedCount: 43, assignedGyms: ['b1', 'b2'], assignedGymNames: ['Andheri East', 'Bandra West'], validFrom: '2026-01-15', validUntil: '2026-03-31', status: COUPON_STATUS.ACTIVE, createdAt: '2026-01-15' },
  { id: 'c3', code: 'SUMMER15', description: '15% summer discount', type: 'percentage', value: 15, minOrderAmount: 200000, maxDiscount: 80000, usageLimit: 150, usedCount: 150, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2026-05-01', validUntil: '2026-08-31', status: COUPON_STATUS.EXPIRED, createdAt: '2026-04-20' },
  { id: 'c4', code: 'POWAI10', description: '10% off at Powai branch', type: 'percentage', value: 10, minOrderAmount: 0, maxDiscount: 30000, usageLimit: 50, usedCount: 12, assignedGyms: ['b3'], assignedGymNames: ['Powai'], validFrom: '2026-02-01', validUntil: '2026-04-30', status: COUPON_STATUS.ACTIVE, createdAt: '2026-01-28' },
  { id: 'c5', code: 'REFER200', description: '200 off for referrals', type: 'flat', value: 20000, minOrderAmount: 150000, maxDiscount: 20000, usageLimit: 500, usedCount: 231, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], validFrom: '2026-01-01', validUntil: '2026-12-31', status: COUPON_STATUS.ACTIVE, createdAt: '2026-01-01' },
  { id: 'c6', code: 'THANE25', description: '25% off to boost Thane memberships', type: 'percentage', value: 25, minOrderAmount: 0, maxDiscount: 100000, usageLimit: 80, usedCount: 0, assignedGyms: ['b4'], assignedGymNames: ['Thane'], validFrom: '2026-03-01', validUntil: '2026-05-31', status: COUPON_STATUS.INACTIVE, createdAt: '2026-02-20' },
];

export const MOCK_COUPONS_KPI: CouponsKPIData = {
  totalCoupons: 6,
  activeCoupons: 4,
  totalRedeemed: 523,
  revenueLost: 18450000,
};

export const MOCK_COUPONS_EXPANDED: Coupon[] = [
  ...MOCK_COUPONS,
  ...Array.from({ length: 10 }, (_, index) => {
    const n = index + 7;
    const base = MOCK_COUPONS[index % MOCK_COUPONS.length]!;
    return {
      ...base,
      id: `c${n}`,
      code: `GYM${100 + n}`,
      description: ['New member welcome offer', 'Annual renewal discount', 'Weekend promotion', 'Referral reward'][index % 4]!,
      value: base.type === 'flat' ? (5 + (index % 5) * 5) * 100 : 5 + (index % 5) * 5,
      usedCount: index % 6,
      validFrom: `2026-09-${String((index % 12) + 1).padStart(2, '0')}`,
      validUntil: `2026-10-${String((index % 20) + 1).padStart(2, '0')}`,
      status: ['active', 'inactive', 'expired'][index % 3] as CouponStatus,
      createdAt: `2026-09-${String((index % 12) + 1).padStart(2, '0')}T09:00:00Z`,
    };
  }),
];
