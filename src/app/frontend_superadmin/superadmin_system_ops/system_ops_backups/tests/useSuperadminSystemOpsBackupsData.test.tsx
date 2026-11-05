// DATA FLOW: feature API → real TanStack Query cache → useSuperadminSystemOpsBackupsData.
// RESPONSIBILITY: Verifies the hook's real server-state lifecycle without mocking TanStack Query itself.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import * as backupsApi from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { useSuperadminSystemOpsBackupsData } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsData';
import { MOCK_SUPERADMIN_BACKUPS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockFixtures';
import { resetSuperadminBackupsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockHandlers';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api", () => ({
  fetchBackups: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  resetSuperadminBackupsMockState();
});

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useSuperadminSystemOpsBackupsData', () => {
  it('renders loading then success through the real TanStack Query layer', async () => {
    vi.mocked(backupsApi.fetchBackups).mockResolvedValue({
      success: true,
      data: [MOCK_SUPERADMIN_BACKUPS[0]!],
      meta: { total: 1, totalPages: 1 },
      message: 'Backups loaded.',
    });

    const { result } = renderHook(() => useSuperadminSystemOpsBackupsData(), { wrapper: createWrapper() });
    expect(result.current.isPending).toBe(true);
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data).toEqual([MOCK_SUPERADMIN_BACKUPS[0]]);
    expect(result.current.total).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(backupsApi.fetchBackups).toHaveBeenCalledTimes(1);
  });

  it('exposes a real query error after the API boundary rejects', async () => {
    vi.mocked(backupsApi.fetchBackups).mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsData(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeUndefined();
  });

  it('supports an empty authoritative response without crashing', async () => {
    vi.mocked(backupsApi.fetchBackups).mockResolvedValue({
      success: true,
      data: [],
      meta: { total: 0, totalPages: 1 },
      message: 'No backups found.',
    });
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsData(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});
