import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { plansApi } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.api';
import { useSuperadminBillingPlansManagementList } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementList';
import { useSuperadminBillingPlansManagementStore } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.api', () => ({
  plansApi: { fetchPlans: vi.fn(), deletePlan: vi.fn(), archivePlan: vi.fn() },
}));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));

describe('useSuperadminBillingPlansManagementList', () => {
  it('loads plans through the owning API and exposes a completed query state', async () => {
    vi.mocked(plansApi.fetchPlans).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingPlansManagementList(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.plans).toEqual([]);
    expect(result.current.isError).toBe(false);
  });
  it('treats a resolved ApiFailure envelope as a query error', async () => {
    vi.mocked(plansApi.fetchPlans).mockResolvedValue({ success: false, message: 'denied', data: null } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingPlansManagementList(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.plans).toEqual([]);
  });
  it('exposes the owning-store create action so the empty state can actually open the form', async () => {
    vi.mocked(plansApi.fetchPlans).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingPlansManagementList(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(typeof result.current.openCreateModal).toBe('function');
    result.current.openCreateModal();
    expect(useSuperadminBillingPlansManagementStore.getState().isCreateModalOpen).toBe(true);
    useSuperadminBillingPlansManagementStore.getState().closeCreateModal();
  });

});
