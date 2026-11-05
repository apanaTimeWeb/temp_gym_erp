import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.api';
import { useSuperadminSystemOpsMigrationsPage } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/hooks/useSuperadminSystemOpsMigrationsPage';

import type { ReactNode } from 'react';

vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.api", () => ({ migrationsApi: { fetchMigrations: vi.fn(), startMigration: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, string>) => values ? `${key} ${values.version}` : key }));
const confirmMock = vi.hoisted(() => vi.fn().mockResolvedValue(true));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: confirmMock }) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
}

beforeEach(() => { vi.clearAllMocks(); confirmMock.mockResolvedValue(true); });

describe('useSuperadminSystemOpsMigrationsPage', () => {
  it('executes the API query contract and reaches a successful query state', async () => {
    vi.mocked(migrationsApi.fetchMigrations).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsPage(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.migrations).toEqual([]);
  });

  it('requires an explicit warning acknowledgement before sending an all-tenant irreversible rollout', async () => {
    vi.mocked(migrationsApi.fetchMigrations).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    vi.mocked(migrationsApi.startMigration).mockResolvedValue({ success: true, message: 'Migration triggered', data: { id: 'migration-1', version: 'v2.0', status: 'pending' } } as never);
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsPage(), { wrapper: createWrapper() });

    await act(async () => { await result.current.requestDeployment('v2.0'); });

    expect(confirmMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'ui.confirm_deploy_schema_title',
      message: 'ui.confirm_deploy_schema_message v2.0',
      confirmText: 'ui.deploy_schema_action',
      type: 'warning',
    }));
    expect(migrationsApi.startMigration).toHaveBeenCalledTimes(1);
  });

  it('retains a failed deployment key for the same version and rotates it for a different version', async () => {
    vi.mocked(migrationsApi.fetchMigrations).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    vi.mocked(migrationsApi.startMigration)
      .mockResolvedValueOnce({ success: false, message: 'Deployment failed', data: null } as never)
      .mockResolvedValueOnce({ success: false, message: 'Deployment failed', data: null } as never)
      .mockResolvedValueOnce({ success: true, message: 'Migration triggered', data: { id: 'migration-1', version: 'v2.0', status: 'pending' } } as never);
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsPage(), { wrapper: createWrapper() });

    let firstResult = false;
    await act(async () => { firstResult = await result.current.requestDeployment('v1.0'); });
    expect(firstResult).toBe(false);
    let secondResult = false;
    await act(async () => { secondResult = await result.current.requestDeployment('v2.0'); });
    expect(secondResult).toBe(false);
    let thirdResult = false;
    await act(async () => { thirdResult = await result.current.requestDeployment('v2.0'); });
    expect(thirdResult).toBe(true);

    const calls = vi.mocked(migrationsApi.startMigration).mock.calls;
    expect(calls[0]?.[1]).not.toBe(calls[1]?.[1]);
    expect(calls[1]?.[1]).toBe(calls[2]?.[1]);
  });
});
