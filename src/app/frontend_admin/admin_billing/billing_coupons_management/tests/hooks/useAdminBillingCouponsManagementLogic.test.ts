// RESPONSIBILITY: Defines regression tests for useAdminBillingCouponsManagementLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/hooks/useAdminBillingCouponsManagementLogic.test.ts)

import { COUPON_STATUS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementLogic';
import type { CouponFormValues } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';

const store = {
  showModal: false, setShowModal: vi.fn(), editId: null, setEditId: vi.fn(), form: {}, setForm: vi.fn(), search: '', statusFilter: 'all', currentPage: 1, setCurrentPage: vi.fn(), dateRange: 'all_time', setDateRange: vi.fn(),
};
const createMutation = { mutateAsync: vi.fn().mockResolvedValue({ message: 'ok' }), isPending: false };
const updateMutation = { mutateAsync: vi.fn().mockResolvedValue({ message: 'ok' }), isPending: false };
const deleteMutation = { mutateAsync: vi.fn().mockResolvedValue({ message: 'ok' }), isPending: false };
const toggleMutation = { mutateAsync: vi.fn().mockResolvedValue({ message: 'ok' }), isPending: false };
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/state/useAdminBillingCouponsManagementStore', () => ({ useAdminCouponsStore: Object.assign(() => store, { getState: () => store }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUrlQuerySync', () => ({ useAdminNavigationLayoutUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementMutations', () => ({ useAdminCouponsMutations: () => ({ getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, toggleMutation }) }));

describe('useAdminCouponsLogic', () => {
  beforeEach(() => {
    store.search = '';
    vi.clearAllMocks();
    store.showModal = false;
    store.editId = null;
    vi.mocked(useQuery).mockReturnValue({ data: { data: [{ id: 'c1', code: 'SAVE10', description: 'Save', type: 'percentage', value: 10, minOrderAmount: 0, maxDiscount: 100, usageLimit: 10, usedCount: 0, assignedGyms: ['all'], assignedGymNames: ['All Gyms'], createdAt: '2026-01-01T10:00:00Z', validFrom: '2026-01-01', validUntil: '2026-12-31', status: COUPON_STATUS.ACTIVE }], meta: { total: 1 } }, status: 'success' } as never);
  });

  afterEach(() => vi.useRealTimers());

  it('holds coupon requests at the last debounced value until 300ms after typing stops', () => {
    vi.useFakeTimers();
    const { rerender } = renderHook(() => useAdminCouponsLogic());
    act(() => { store.search = 'SAVE'; rerender(); });
    const before = vi.mocked(useQuery).mock.calls.at(-2)?.[0] as { queryKey: unknown[]; queryFn: () => unknown };
    expect(JSON.stringify(before.queryKey)).not.toContain('SAVE');
    act(() => vi.advanceTimersByTime(299));
    const last = vi.mocked(useQuery).mock.calls.at(-2)?.[0] as { queryKey: unknown[] };
    expect(JSON.stringify(last.queryKey)).not.toContain('SAVE');
    act(() => vi.advanceTimersByTime(1));
    const after = vi.mocked(useQuery).mock.calls.at(-2)?.[0] as { queryKey: unknown[] };
    expect(JSON.stringify(after.queryKey)).toContain('SAVE');
  });

  it('opens a create form and normalizes coupon payloads before mutation', async () => {
    const { result } = renderHook(() => useAdminCouponsLogic());
    act(() => result.current.openAdd());
    expect(store.setEditId).toHaveBeenCalledWith(null);
    expect(store.setShowModal).toHaveBeenCalledWith(true);
    await act(async () => { await result.current.saveCoupon({ code: 'save20', description: 'Save', type: 'percentage', value: '20', minOrderAmount: '0', maxDiscount: '100', usageLimit: '5', assignedGyms: ['all'], validFrom: '2026-01-01', validUntil: '2026-12-31' } satisfies CouponFormValues); });
    expect(createMutation.mutateAsync).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ code: 'SAVE20', value: 20, usageLimit: 5, assignedGyms: ['all'] }) }));
    const call = createMutation.mutateAsync.mock.calls.at(-1)?.[0] as { payload: Record<string, unknown> };
    expect(call.payload).not.toHaveProperty('assignedGymNames');
  });

  it('isolates create retries for changed payloads while keeping identical payload intent stable', async () => {
    const { result } = renderHook(() => useAdminCouponsLogic());
    const input: CouponFormValues = { code: 'SAVE20', description: 'A coupon', type: 'percentage', value:'20', minOrderAmount:'0', maxDiscount:'100', usageLimit:'5', assignedGyms:['all'],validFrom:'2026-01-01',validUntil:'2026-12-31' };
    await act(async () => { await result.current.saveCoupon(input); });
    await act(async () => { await result.current.saveCoupon(input); });
    await act(async () => { await result.current.saveCoupon({ ...input, value:'21' }); });
    const args = createMutation.mutateAsync.mock.calls.slice(-3).map(([arg]) => (arg as { intentId: string }).intentId);
    expect(args[0]).toBe(args[1]);
    expect(args[2]).not.toBe(args[1]);
    expect(args[0]).toContain('SAVE20');
  });
});
