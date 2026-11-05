// RESPONSIBILITY: Defines regression tests for useAdminBillingPlansCatalogMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/hooks/useAdminBillingPlansCatalogMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminPlansApi } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/api/admin_billing_plans_catalog_api';
import { useAdminPlansMutations } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogMutations';

import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogToastStore';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogToastStore', () => ({ useAdminNavigationLayoutToastStore: vi.fn(() => ({ showToast: vi.fn() })) }));

vi.mock('@/app/frontend_admin/admin_billing/billing_plans_catalog/api/admin_billing_plans_catalog_api', () => ({
  AdminPlansApi: {
    createPlan: vi.fn().mockResolvedValue({ message: 'ok' }),
    updatePlan: vi.fn().mockResolvedValue({ message: 'ok' }),
    deletePlan: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminPlansMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminPlansMutations(), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ payload: { name: 'Pro', tier: 'Gold' }, idempotencyKey: 'idem-1' }); });
    await waitFor(() => expect(AdminPlansApi.createPlan).toHaveBeenCalledWith({ name: 'Pro', tier: 'Gold' }, 'idem-1'));
  });

  it('does not show internal backend traces when a plan write fails', async () => {
    const rawMessage = 'private plan ledger secret: 123';
    vi.mocked(AdminPlansApi.createPlan).mockRejectedValueOnce(new Error(rawMessage));
    const toast = vi.fn();
    vi.mocked(useAdminNavigationLayoutToastStore).mockReturnValue({ showToast: toast } as never);
    const { result } = renderHook(() => useAdminPlansMutations(), { wrapper });
    await act(async () => { await expect(result.current.createMutation.mutateAsync({ payload: { name: 'Pro' }, idempotencyKey: 'plan-private' } as never)).rejects.toThrow(rawMessage); });
    await waitFor(() => expect(toast).toHaveBeenCalledWith('plans.AdminRepair.requestFailed', 'error', 'plans-create-error'));
    expect(JSON.stringify(toast.mock.calls)).not.toContain('private plan ledger');
  });
});
