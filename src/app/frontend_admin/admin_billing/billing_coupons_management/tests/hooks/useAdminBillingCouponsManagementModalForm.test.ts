// RESPONSIBILITY: Defines regression tests for useAdminBillingCouponsManagementModalForm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/hooks/useAdminBillingCouponsManagementModalForm.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminCouponsModalForm } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementModalForm';

const clearIntentKey = vi.fn();
const store = { showModal: true, setShowModal: vi.fn(), editId: 'c1', form: { code: 'SAVE10', assignedGyms: ['g1'] }, saveCoupon: vi.fn(), saving: false, clearIntentKey };
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic', () => ({ useAdminCouponsLogic: () => store }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUnsavedChangesGuard', () => ({ useAdminBillingCouponsManagementUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminCouponsModalForm', () => {
  it('clears the edit idempotency intent after confirmed abandonment when no mutation is pending', async () => {
    const { result } = renderHook(() => useAdminCouponsModalForm());
    await act(async () => { await result.current.handleClose(); });
    expect(clearIntentKey).toHaveBeenCalledWith('update-coupon:c1');
    expect(store.setShowModal).toHaveBeenCalledWith(false);
  });

  it('preserves edit identity and supports gym selection with an all fallback', () => {
    const { result } = renderHook(() => useAdminCouponsModalForm());
    expect(result.current.editId).toBe('c1');
    expect(result.current.selectedGyms).toEqual(['g1']);
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual(['g1', 'g2']);
    act(() => result.current.toggleGym('g1'));
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual(['all']);
  });
});
