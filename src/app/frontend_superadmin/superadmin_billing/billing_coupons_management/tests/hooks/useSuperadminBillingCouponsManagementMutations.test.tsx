import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingCouponsManagementMutations } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMutations';

const mutate = vi.fn(async <T,>(execute: () => Promise<unknown>, options: { onSuccess?: (value: unknown) => void }) => { const result = await execute(); options.onSuccess?.(result); return result as T; });
const deleteCoupon = vi.hoisted(() => vi.fn().mockResolvedValue({ success: true, data: null }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMutation', () => ({ useSuperadminBillingCouponsManagementMutation: () => ({ mutate, isMutating: false }) }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api', () => ({ couponsApi: { createCoupon: vi.fn(), updateCoupon: vi.fn(), deleteCoupon, restoreCoupon: vi.fn(), updateCouponStatus: vi.fn() } }));

describe('useSuperadminBillingCouponsManagementMutations', () => {
  beforeEach(() => { mutate.mockClear(); deleteCoupon.mockClear(); });

  it('relies on shared query invalidation instead of patching a captured filtered coupon page', async () => {
    const form = { reset: vi.fn() } as never;
    const { result } = renderHook(() => useSuperadminBillingCouponsManagementMutations(vi.fn(), vi.fn(), vi.fn(), { id: 'c-1' } as never, form));
    await act(async () => { await result.current.handleDeleteCoupon('c-1'); });
    expect(deleteCoupon).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledTimes(1);
  });
});
