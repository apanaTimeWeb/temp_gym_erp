vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { plansApi } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.api';
import { useSuperadminBillingPlansManagementPlanMutations } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementPlanMutations';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_plans_management/api/superadmin_billing_plans_management.api', () => ({ plansApi: { createPlan: vi.fn(), updatePlan: vi.fn() } }));

describe('useSuperadminBillingPlansManagementPlanMutations', () => {
  it('creates a plan through the API and releases the mutation back to idle after success', async () => {
    vi.mocked(plansApi.createPlan).mockResolvedValue({ success: true, message: 'Created', data: { id: 'plan-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingPlansManagementPlanMutations(), { wrapper });
    await result.current.createPlan({ name: 'Starter' } as never);
    expect(plansApi.createPlan).toHaveBeenCalledWith({ name: 'Starter' }, expect.any(String));
    expect(result.current.isCreating).toBe(false);
  });
  it('does not treat an application-level update failure as success and reuses its idempotency key on retry', async () => {
    vi.mocked(plansApi.updatePlan)
      .mockResolvedValueOnce({ success: false, message: 'Denied' } as never)
      .mockResolvedValueOnce({ success: true, message: 'Updated', data: { id: 'plan-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBillingPlansManagementPlanMutations(), { wrapper });
    const input = { id: 'plan-1', payload: { name: 'Starter' } } as never;
    await expect(result.current.updatePlan(input)).rejects.toThrow('Denied');
    await result.current.updatePlan(input);
    const firstKey = vi.mocked(plansApi.updatePlan).mock.calls[0][2];
    const secondKey = vi.mocked(plansApi.updatePlan).mock.calls[1][2];
    expect(secondKey).toBe(firstKey);
  });

});
