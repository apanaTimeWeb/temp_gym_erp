"use client";
// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementQueries.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_payment_methods/tests/hooks/useAdminSubscriptionsManagementQueries.test.ts)

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsQueries';

const useQueryMock = vi.fn();
const storeMock = vi.fn();
vi.mock('@tanstack/react-query', () => ({ useQuery: (...args: unknown[]) => useQueryMock(...args) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/state/useAdminBillingSubscriptionPaymentMethodsStore', () => ({ useAdminSubscriptionsStore: () => storeMock() }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/api/admin_billing_subscription_payment_methods_api', () => ({ AdminSubscriptionsApi: { fetchSubscription: vi.fn(), fetchPlans: vi.fn(), fetchInvoices: vi.fn(), fetchPaymentMethods: vi.fn(), fetchKPIs: vi.fn() } }));

beforeEach(() => {
  storeMock.mockReturnValue({ currentInvoicePage: 2 });
  useQueryMock.mockImplementation((options: { queryKey: unknown[] }) => {
    const key = JSON.stringify(options.queryKey);
    if (key.includes('subscription')) return { data: { id: 'sub-1' }, status: 'success', isPending: false };
    if (key.includes('plans')) return { data: [{ id: 'plan-1' }], status: 'success', isPending: false };
    if (key.includes('invoices')) return { data: { data: [{ id: 'inv-1' }], meta: { total: 25, totalPages: 3 } }, status: 'success', isPending: false };
    if (key.includes('payment-methods')) return { data: [{ id: 'pm-1' }], status: 'success', isPending: false };
    return { data: { total: 10 }, status: 'success', isPending: false };
  });
});

describe('useAdminSubscriptionsQueries', () => {
  it('maps query responses into server-state view data and preserves invoice pagination', () => {
    const { result } = renderHook(() => useAdminSubscriptionsQueries());
    expect(result.current.subscription?.id).toBe('sub-1');
    expect(result.current.plans).toHaveLength(1);
    expect(result.current.invoices).toHaveLength(1);
    expect(result.current.invoiceTotal).toBe(25);
    expect(result.current.invoiceTotalPages).toBe(3);
    expect(result.current.paymentMethods).toHaveLength(1);
  });
});
