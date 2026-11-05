import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { useSuperadminBillingCouponsManagement } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagement';

let params: Record<string, string> = {};
vi.mock('next-intl', () => ({ useTranslations: vi.fn(() => (key: string) => key) }));
vi.mock('next/navigation', () => ({ useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })), usePathname: vi.fn(() => '/superadmin/coupons'), useSearchParams: vi.fn(() => new URLSearchParams()) }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUrlState', () => ({ useSuperadminBillingCouponsManagementUrlState: vi.fn(() => ({ getParam: (key: string, fallback: string) => params[key] ?? fallback, setParam: vi.fn() })) }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUnsavedChangesGuard', () => ({ useSuperadminBillingCouponsManagementUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMutations', () => ({
    useSuperadminBillingCouponsManagementMutations: vi.fn(() => ({
        isMutating: false,
        handleCreateCoupon: vi.fn(),
        handleUpdateCoupon: vi.fn(),
        handleDeleteCoupon: vi.fn(),
        handleToggleRestore: vi.fn(),
        handleToggleStatus: vi.fn(),
    })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api', () => ({
    couponsApi: { fetchCoupons: vi.fn() },
}));
function createWrapper() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminBillingCouponsManagement', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        params = {};
        vi.mocked(couponsApi.fetchCoupons).mockResolvedValue({
            success: true,
            message: 'Coupons loaded',
            data: [{ id: 'CPN-001', code: 'LAUNCH50', status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE, discountType: 'PERCENTAGE', discountValue: 50, currentUses: 2, isDeleted: false }],
        } as never);
    });

    it('loads coupons through the actual QueryClient and calculates KPI state', async () => {
        const { result } = renderHook(() => useSuperadminBillingCouponsManagement(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.status).toBe('success'));
        expect(result.current.coupons).toHaveLength(1);
        expect(result.current.activeCoupons).toBe(1);
        expect(result.current.totalRedeemed).toBe(2);
        expect(result.current.totalCoupons).toBe(1);
    });

    it('propagates active URL filters into the server query', async () => {
        params = { search: 'launch', status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE };
        const { result } = renderHook(() => useSuperadminBillingCouponsManagement(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.status).toBe('success'));
        expect(couponsApi.fetchCoupons).toHaveBeenCalledWith(expect.objectContaining({ search: 'launch', status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE }));
    });

    it('surfaces the server query error state', async () => {
        vi.mocked(couponsApi.fetchCoupons).mockRejectedValueOnce(new Error('coupon-api-failed'));
        const { result } = renderHook(() => useSuperadminBillingCouponsManagement(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.status).toBe('error'));
        expect(result.current.coupons).toEqual([]);
    });

    it('does not fabricate records for an empty API response', async () => {
        vi.mocked(couponsApi.fetchCoupons).mockResolvedValueOnce({ success: true, message: 'No coupons', data: [] } as never);
        const { result } = renderHook(() => useSuperadminBillingCouponsManagement(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.status).toBe('success'));
        expect(result.current.coupons).toEqual([]);
        expect(result.current.totalCoupons).toBe(0);
    });
});
