import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { normalizeInfrastructureStatusFilter, useSuperadminSystemOpsInfrastructureMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureMainViewModel';

const mocks = vi.hoisted(() => ({
  getParam: vi.fn(), setParam: vi.fn(), confirm: vi.fn(), flushGlobalCache: vi.fn(), flushTenantCache: vi.fn(),
  data: vi.fn(), toastSuccess: vi.fn(), toastError: vi.fn(),
  nodesQuery: { data: { data: [] }, isPending: false, isError: false, refetch: vi.fn(), isFetching: false },
  redisQuery: { data: { data: {} }, isPending: false, isError: false, refetch: vi.fn(), isFetching: false },
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: mocks.toastSuccess, error: mocks.toastError } }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: mocks.getParam, setParam: mocks.setParam }) }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureData", () => ({ useSuperadminSystemOpsInfrastructureData: mocks.data }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureActions", () => ({ useSuperadminSystemOpsInfrastructureActions: () => ({ flushGlobalCache: mocks.flushGlobalCache, isFlushingGlobal: false, flushTenantCache: mocks.flushTenantCache }) }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureMainModel", () => ({ useSuperadminSystemOpsInfrastructureMainModel: () => ({}) }));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getParam.mockImplementation((_key: string, fallback: string) => fallback);
  mocks.confirm.mockResolvedValue(false);
  mocks.flushGlobalCache.mockResolvedValue({ message: 'done' });
  mocks.data.mockReturnValue({ nodesQuery: mocks.nodesQuery, redisQuery: mocks.redisQuery });
});

describe('Infrastructure main view model', () => {
  it('normalizes unsupported URL status values to ALL before issuing queries', () => {
    expect(normalizeInfrastructureStatusFilter('UNKNOWN')).toBe('ALL');
    expect(normalizeInfrastructureStatusFilter(null)).toBe('ALL');
    expect(normalizeInfrastructureStatusFilter('HEALTHY')).toBe('HEALTHY');
    mocks.getParam.mockReturnValue('UNKNOWN');
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureMainViewModel());
    expect(result.current.statusFilter).toBe('ALL');
    expect(mocks.data).toHaveBeenCalledWith({});
  });

  it('writes only supported status filters to URL state', () => {
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureMainViewModel());
    act(() => result.current.setStatusFilter('NOT_A_STATUS'));
    expect(mocks.setParam).toHaveBeenCalledWith('statusFilter', 'ALL');
    act(() => result.current.setStatusFilter('DOWN'));
    expect(mocks.setParam).toHaveBeenLastCalledWith('statusFilter', 'DOWN');
  });

  it('does not flush global cache when confirmation is cancelled', async () => {
    mocks.confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureMainViewModel());
    await act(async () => { await result.current.handleFlushAll(); });
    expect(mocks.flushGlobalCache).not.toHaveBeenCalled();
  });

  it('reuses the global flush key after a failed request and clears it after success', async () => {
    const uuid = vi.fn().mockReturnValueOnce('global-flush-intent-1').mockReturnValue('global-flush-intent-2');
    vi.stubGlobal('crypto', { randomUUID: uuid });
    mocks.confirm.mockResolvedValue(true);
    mocks.flushGlobalCache.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce({ message: 'done' });
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureMainViewModel());
    await act(async () => { await result.current.handleFlushAll(); });
    await act(async () => { await result.current.handleFlushAll(); });
    await act(async () => { await result.current.handleFlushAll(); });
    expect(mocks.flushGlobalCache.mock.calls[0][0]).toBe('global-flush-intent-1');
    expect(mocks.flushGlobalCache.mock.calls[1][0]).toBe('global-flush-intent-1');
    expect(mocks.flushGlobalCache.mock.calls[2][0]).not.toBe('global-flush-intent-1');
    vi.unstubAllGlobals();
  });
});
