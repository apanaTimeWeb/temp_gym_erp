// RESPONSIBILITY: Defines regression tests for AdminBillingCouponsManagementMockState.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/mocks/fixtures/AdminBillingCouponsManagementMockState.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminCouponsMockState, resetAdminCouponsMockState } from '@/app/frontend_admin/admin_billing/billing_coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockState';
import { MOCK_COUPONS_EXPANDED } from '@/app/frontend_admin/admin_billing/billing_coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockFixtures';

describe('Admin coupons mock state', () => {
  it('starts from a cloned seed and can be reset deterministically', () => {
    resetAdminCouponsMockState();
    const state = getAdminCouponsMockState();
    expect(state).toHaveLength(MOCK_COUPONS_EXPANDED.length);
    state.splice(0, 1);
    expect(getAdminCouponsMockState()).toHaveLength(MOCK_COUPONS_EXPANDED.length - 1);
    resetAdminCouponsMockState();
    expect(getAdminCouponsMockState()).toHaveLength(MOCK_COUPONS_EXPANDED.length);
  });
});
