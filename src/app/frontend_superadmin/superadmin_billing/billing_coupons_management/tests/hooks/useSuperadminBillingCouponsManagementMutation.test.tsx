import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { SUPERADMIN_BILLING_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.query_keys';
import { useSuperadminBillingCouponsManagementMutation } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementMutation';

import type { ReactNode } from 'react';


vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('useSuperadminBillingCouponsManagementMutation', () => {
  beforeEach(() => vi.clearAllMocks());

  const setup = () => {
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateQueries = vi.spyOn(client, 'invalidateQueries').mockResolvedValue(undefined);
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSuperadminBillingCouponsManagementMutation(), { wrapper });
    return { result, invalidateQueries, onSuccess };
  };

  it('executes a mutation, returns response data, and runs the consumer success callback', async () => {
    const { result, invalidateQueries, onSuccess } = setup();
    let output: unknown;
    await act(async () => { output = await result.current.mutate(async () => ({ success: true, message: 'Saved', data: { id: 'c-1' } } as never), { toastId: 'coupon-test', onSuccess }); });
    expect(output).toEqual({ id: 'c-1' });
    expect(onSuccess).toHaveBeenCalledWith({ id: 'c-1' });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: SUPERADMIN_BILLING_COUPONS_QUERY_KEYS.all });
  });

  it('preserves API-envelope business messages for actionable feedback', async () => {
    const { result } = setup();
    await act(async () => {
      await expect(result.current.mutate(async () => ({ success: false, message: 'Coupon code already exists', data: null } as never), { toastId: 'coupon-domain-error' })).rejects.toThrow('Coupon code already exists');
    });
    expect(toast.error).toHaveBeenCalledWith('Coupon code already exists', { id: 'coupon-domain-error' });
  });

  it('does not expose unknown runtime exception details to users', async () => {
    const { result } = setup();
    await act(async () => {
      await expect(result.current.mutate(async () => { throw new Error('TypeError: raw internal fetch stack detail'); }, { toastId: 'coupon-runtime-error' })).rejects.toThrow('TypeError: raw internal fetch stack detail');
    });
    expect(toast.error).toHaveBeenCalledWith('ui.mutation_error_fallback', { id: 'coupon-runtime-error' });
    expect(toast.error).not.toHaveBeenCalledWith(expect.stringContaining('raw internal fetch stack detail'), expect.anything());
  });
});
