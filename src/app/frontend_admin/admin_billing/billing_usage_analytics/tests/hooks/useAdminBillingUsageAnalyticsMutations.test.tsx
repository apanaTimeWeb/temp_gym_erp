// RESPONSIBILITY: Defines regression tests for useAdminBillingUsageAnalyticsMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/hooks/useAdminBillingUsageAnalyticsMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminUsageApi } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
import { useAdminUsageMutations } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsMutations';

vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api', () => ({
  AdminUsageApi: {
    requestUpgrade: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminUsageMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminUsageMutations(), { wrapper });
    await act(async () => { await result.current.upgradeMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminUsageApi.requestUpgrade).toHaveBeenCalled());
  });
});
