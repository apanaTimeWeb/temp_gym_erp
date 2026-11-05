import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingCouponsManagementMain } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMain';



vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagement', () => ({ useSuperadminBillingCouponsManagement: () => ({ coupons: [], status: 'success' }) }));

describe('useSuperadminBillingCouponsManagementMain', () => {
  it('opens the history drawer from the feature-scoped browser event and cleans up on unmount', () => {
    const coupon = { id: 'CPN-1', code: 'SAVE', status: 'ACTIVE' } as never;
    const { result, unmount } = renderHook(() => useSuperadminBillingCouponsManagementMain());
    act(() => document.dispatchEvent(new CustomEvent('open-coupon-history', { detail: coupon })));
    expect(result.current.isDrawerOpen).toBe(true);
    expect(result.current.drawerCoupon).toEqual(coupon);
    unmount();
  });
});
