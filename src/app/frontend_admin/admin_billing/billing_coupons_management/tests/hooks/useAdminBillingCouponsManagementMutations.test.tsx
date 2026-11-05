// RESPONSIBILITY: Defines regression tests for useAdminBillingCouponsManagementMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/hooks/useAdminBillingCouponsManagementMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminCouponsApi } from '@/app/frontend_admin/admin_billing/billing_coupons_management/api/admin_billing_coupons_management_api';
import { useAdminCouponsMutations } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementMutations';

import { adminToast } from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementToastService';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/components/feedback/AdminBillingCouponsManagementToastService', () => ({ adminToast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/api/admin_billing_coupons_management_api', () => ({
  AdminCouponsApi: {
    createCoupon: vi.fn().mockResolvedValue({ message: 'ok' }),
    updateCoupon: vi.fn().mockResolvedValue({ message: 'ok' }),
    deleteCoupon: vi.fn().mockResolvedValue({ message: 'ok' }),
    toggleCoupon: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminCouponsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminCouponsMutations(), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminCouponsApi.createCoupon).toHaveBeenCalled());
    // QueryClient is local to the wrapper; the production hook explicitly invalidates both list and KPI query families.
    expect(result.current.createMutation.isSuccess).toBe(true);
  });

  it('uses a localized fallback even when the backend response contains private details', async () => {
    const rawMessage = 'SQL backend trace private credential';
    vi.mocked(AdminCouponsApi.createCoupon).mockRejectedValueOnce(new Error(rawMessage));
    const { result } = renderHook(() => useAdminCouponsMutations(), { wrapper });
    await act(async () => { await expect(result.current.createMutation.mutateAsync({ payload: {}, idempotencyKey: 'coupon-private', intentId: 'create-private' } as never)).rejects.toThrow(rawMessage); });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith('coupons.AdminRepair.requestFailed', 'admin-error-000fe5d6ed'));
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('private credential');
  });
});
