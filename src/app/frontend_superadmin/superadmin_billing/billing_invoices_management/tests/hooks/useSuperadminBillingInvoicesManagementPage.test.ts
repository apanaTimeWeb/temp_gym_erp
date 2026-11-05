import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api';
import { SUPERADMIN_BILLING_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.query_keys';
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/constants/superadmin_billing_invoices_management.constants';
import { useSuperadminBillingInvoicesManagementPage } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementPage';

import type { SaaSInvoice, SuperadminBillingInvoicesTenant } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management.types';


vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })),
    usePathname: vi.fn(() => '/superadmin/saas-billing/invoices'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@/hooks/useUrlState', () => ({
    useUrlState: vi.fn(() => ({
        getParam: (_key: string, fallback: string) => fallback,
        setParam: vi.fn(),
    })),
}));

vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPayment', () => ({
    useSuperadminBillingInvoicesManagementManualPayment: vi.fn(() => ({
        isLoggingPayment: false,
        handleLogManualPayment: vi.fn(),
    })),
}));

vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/api/superadmin_billing_invoices_management.api', () => ({
    invoicesApi: {
        fetchInvoices: vi.fn(),
        fetchTenants: vi.fn(),
    },
}));

const invoicesResponse = {
    success: true,
    message: 'Invoices loaded',
    data: [
        { id: 'INV-001', tenantId: 'gym-001', tenantName: 'Gold Gym', amount: 5000, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PAID, issuedAt: '2026-09-01', dueDate: '2026-09-07', invoiceType: 'RECURRING', planName: 'Pro' },
        { id: 'INV-002', tenantId: 'gym-002', tenantName: 'Blue Gym', amount: 3000, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PENDING, issuedAt: '2026-09-01', dueDate: '2026-09-07', invoiceType: 'RECURRING', planName: 'Basic' },
        { id: 'INV-003', tenantId: 'gym-003', tenantName: 'Green Gym', amount: 2000, currency: 'INR', status: SUPERADMIN_INVOICE_STATUS_CODES.PAID, issuedAt: '2026-09-01', dueDate: '2026-09-07', invoiceType: 'RECURRING', planName: 'Pro' },
    ] satisfies SaaSInvoice[],
    meta: { total: 3 },
};

const tenantsResponse = {
    success: true,
    message: 'Tenants loaded',
    data: [
        { id: 'gym-001', name: 'Gold Gym', plan: 'Pro' },
        { id: 'gym-002', name: 'Blue Gym', plan: 'Basic' },
    ] satisfies SuperadminBillingInvoicesTenant[],
};

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminBillingInvoicesManagementPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(invoicesApi.fetchInvoices).mockResolvedValue(invoicesResponse as never);
        vi.mocked(invoicesApi.fetchTenants).mockResolvedValue(tenantsResponse as never);
    });

    it('loads invoices through the real TanStack Query path and exposes server data', async () => {
        const { result } = renderHook(() => useSuperadminBillingInvoicesManagementPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(invoicesApi.fetchInvoices).toHaveBeenCalledWith({ range: 'this_month', page: '1', limit: '10' });
        expect(result.current.invoices).toEqual(invoicesResponse.data);
        expect(result.current.total).toBe(3);
    });

    it('preserves the feature query-key contract in the actual QueryClient cache', async () => {
        const wrapper = createWrapper();
        const { result } = renderHook(() => useSuperadminBillingInvoicesManagementPage(), { wrapper });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        const queryKey = SUPERADMIN_BILLING_INVOICES_QUERY_KEYS.list({ range: 'this_month', page: '1', limit: '10' });
        expect(invoicesApi.fetchInvoices).toHaveBeenCalledTimes(1);
        expect(queryKey).toEqual(['superadmin_billing_invoices', 'list', { range: 'this_month', page: '1', limit: '10' }]);
    });

    it('calculates derived revenue metrics from the API response', async () => {
        const { result } = renderHook(() => useSuperadminBillingInvoicesManagementPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.totalsByCurrency.INR.totalRevenue).toBe(7000));

        expect(result.current.totalsByCurrency.INR.failedRevenue).toBe(0);
        expect(result.current.totalsByCurrency.INR.pendingRevenue).toBe(3000);
        expect(result.current.overdueCount).toBe(0);
    });

    it('surfaces a failed invoice request through the hook error state', async () => {
        vi.mocked(invoicesApi.fetchInvoices).mockRejectedValueOnce(new Error('invoice-api-failed'));

        const { result } = renderHook(() => useSuperadminBillingInvoicesManagementPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBe('invoice-api-failed');
        expect(result.current.invoices).toEqual([]);
    });

    it('handles an empty server response without creating fake fallback rows', async () => {
        vi.mocked(invoicesApi.fetchInvoices).mockResolvedValueOnce({
            ...invoicesResponse,
            data: [],
            meta: { total: 0 },
        } as never);

        const { result } = renderHook(() => useSuperadminBillingInvoicesManagementPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(result.current.invoices).toEqual([]);
        expect(result.current.filteredInvoices).toEqual([]);
        expect(result.current.total).toBe(0);
    });
});
