import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsInfrastructureFlushTenantMutation } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation';

import type { SuperadminInfrastructureFlushIntent } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_mutation.types';
import type { ReactNode } from 'react';

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('useSuperadminSystemOpsInfrastructureFlushTenantMutation', () => {
  it('does not flush when confirmation is rejected and flushes selected tenants after confirmation', async () => {
    const onFlush = vi.fn().mockResolvedValue({ success: true , requestId: 'test-request-id'});
    const confirmAction = vi.fn().mockResolvedValue(false);
    const onSuccess = vi.fn();
    const intentRef = { current: null as SuperadminInfrastructureFlushIntent | null };
    const { result, rerender } = renderHook(() => useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush, ['tenant-1'], intentRef, confirmAction, onSuccess), { wrapper: createWrapper() });
    await act(async () => { await result.current.mutateAsync(); });
    expect(onFlush).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith(false);

    confirmAction.mockResolvedValue(true);
    rerender();
    await act(async () => { await result.current.mutateAsync(); });
    expect(onFlush).toHaveBeenCalledWith(['tenant-1'], expect.any(String));
    expect(onSuccess).toHaveBeenLastCalledWith(true);
  });

  it('reuses the key on retry but rotates it when the selected tenant identity changes', async () => {
    let selectedTenantIds = ['tenant-1'];
    const onFlush = vi.fn().mockRejectedValueOnce(new Error('Network unavailable')).mockResolvedValue(undefined);
    const confirmAction = vi.fn().mockResolvedValue(true);
    const intentRef = { current: null as SuperadminInfrastructureFlushIntent | null };
    const { result, rerender } = renderHook(() => useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush, selectedTenantIds, intentRef, confirmAction, vi.fn()), { wrapper: createWrapper() });

    await act(async () => { await expect(result.current.mutateAsync()).rejects.toThrow('Network unavailable'); });
    const firstKey = onFlush.mock.calls[0]?.[1];
    await act(async () => { await result.current.mutateAsync(); });
    const retryKey = onFlush.mock.calls[1]?.[1];
    expect(retryKey).toBe(firstKey);

    selectedTenantIds = ['tenant-2'];
    rerender();
    await act(async () => { await result.current.mutateAsync(); });
    const changedTargetKey = onFlush.mock.calls[2]?.[1];
    expect(changedTargetKey).not.toBe(firstKey);
  });
});
