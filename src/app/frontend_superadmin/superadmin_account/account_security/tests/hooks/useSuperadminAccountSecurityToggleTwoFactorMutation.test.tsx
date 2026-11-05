import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminProfileApi } from '@/app/frontend_superadmin/superadmin_account/account_security/api/superadmin_account_security.api';
import { useSuperadminAccountSecurityToggleTwoFactorMutation } from '@/app/frontend_superadmin/superadmin_account/account_security/hooks/useSuperadminAccountSecurityToggleTwoFactorMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_account/account_security/api/superadmin_account_security.api', () => ({ superadminProfileApi: { updateTwoFactor: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminAccountSecurityToggleTwoFactorMutation', () => {
  it('passes the payload and idempotency key through the feature API', async () => {
    vi.mocked(superadminProfileApi.updateTwoFactor).mockResolvedValue({ success: true, message: 'Updated', data: null , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminAccountSecurityToggleTwoFactorMutation(), { wrapper });
    const input = { payload: {} as never, idempotencyKey: 'key-1' };
    await result.current.mutateAsync(input as never);
    expect(superadminProfileApi.updateTwoFactor).toHaveBeenCalledWith(input.payload, 'key-1');
  });
});
