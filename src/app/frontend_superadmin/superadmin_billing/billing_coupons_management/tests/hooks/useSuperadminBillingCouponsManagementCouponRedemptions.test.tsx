import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api';
import { useSuperadminBillingCouponsManagementCouponRedemptions } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementCouponRedemptions';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api', () => ({ couponsApi: { fetchRedemptions: vi.fn() } }));

describe('useSuperadminBillingCouponsManagementCouponRedemptions', () => {
  it('fetches redemptions for a selected coupon using the API facade object contract', async () => {
    vi.mocked(couponsApi.fetchRedemptions).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingCouponsManagementCouponRedemptions('coupon-test-1'), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(couponsApi.fetchRedemptions).toHaveBeenCalledWith('coupon-test-1');
    expect(result.current.data?.data).toEqual([]);
  });

  it('does not request redemptions while the coupon ID is null', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    renderHook(() => useSuperadminBillingCouponsManagementCouponRedemptions(null), { wrapper });
    expect(couponsApi.fetchRedemptions).not.toHaveBeenCalled();
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(couponsApi.fetchRedemptions).mockResolvedValue({ success: false, message: 'redemptions unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-redemptions' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingCouponsManagementCouponRedemptions('coupon-test-1'), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
