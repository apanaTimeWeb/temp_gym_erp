vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SUPERADMIN_AFFILIATES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/api/superadmin_affiliates_management.query_keys';

import { useSuperadminAffiliatesManagementMutation } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementMutation';

import type { ReactNode } from 'react';



describe('useSuperadminAffiliatesManagementMutation', () => {
  it('executes a successful mutation, calls the consumer callback, and invalidates the module cache', async () => {
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateQueries = vi.spyOn(client, 'invalidateQueries').mockResolvedValue();
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSuperadminAffiliatesManagementMutation(), { wrapper });
    await act(async () => {
      await result.current.mutate(async () => ({ success: true, message: 'Created', data: { id: 'a-1' } } as never), { toastId: 'affiliate-test', onSuccess });
    });
    expect(onSuccess).toHaveBeenCalledWith({ id: 'a-1' });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: SUPERADMIN_AFFILIATES_QUERY_KEYS.all });
  });
});
