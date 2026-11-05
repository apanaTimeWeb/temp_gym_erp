"use client";
// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementQueries.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_invoices/tests/hooks/useAdminSubscriptionsManagementQueries.test.ts)

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSubscriptionsQueries } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesQueries';

const { useQueryMock } = vi.hoisted(() => ({ useQueryMock: vi.fn() }));
vi.mock('@tanstack/react-query', () => ({ useQuery: (...args: unknown[]) => useQueryMock(...args) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/api/admin_billing_subscription_invoices_api', () => ({ AdminSubscriptionsApi: { fetchSubscription: vi.fn(), fetchPlans: vi.fn(), fetchInvoices: vi.fn(), fetchPaymentMethods: vi.fn(), fetchKPIs: vi.fn() } }));

beforeEach(() => {
  useQueryMock.mockReset();
  useQueryMock.mockImplementation((options: { queryKey: unknown[]; enabled?: boolean }) => {
    if (options.enabled === false) {
      return { data: undefined, status: 'pending', fetchStatus: 'idle', isPending: true, error: null, refetch: vi.fn() };
    }
    const key = JSON.stringify(options.queryKey);
    if (key.includes('invoices')) {
      return { data: { data: [{ id: 'inv-1' }], meta: { total: 25, totalPages: 3 } }, status: 'success', fetchStatus: 'idle', isPending: false, error: null, refetch: vi.fn() };
    }
    throw new Error(`Unexpected enabled query in invoices leaf: ${key}`);
  });
});

describe('useAdminSubscriptionsQueries — invoices leaf', () => {
  it('only enables invoices and leaves all disabled resources unfetched', () => {
    const { result } = renderHook(() => useAdminSubscriptionsQueries(2));
    expect(result.current.subscription).toBeUndefined();
    expect(result.current.plans).toEqual([]);
    expect(result.current.invoices).toEqual([{ id: 'inv-1' }]);
    expect(result.current.invoiceTotal).toBe(25);
    expect(result.current.invoiceTotalPages).toBe(3);
    expect(result.current.paymentMethods).toEqual([]);
    expect(result.current.kpis).toBeUndefined();
    expect(result.current.subscriptionStatus).toBe('pending');
    expect(result.current.status).toBe('success');
    expect(useQueryMock).toHaveBeenCalledTimes(5);
    const queried = useQueryMock.mock.calls.map(([options]) => ({
      key: JSON.stringify(options.queryKey), enabled: options.enabled,
    }));
    expect(queried.filter((query) => query.enabled === true)).toHaveLength(1);
    expect(queried.filter((query) => query.enabled === false)).toHaveLength(4);
    expect(queried.find((query) => query.enabled === true)?.key).toContain('invoices');
    expect(queried.find((query) => query.enabled === true)?.key).toContain('2');
  });
});
