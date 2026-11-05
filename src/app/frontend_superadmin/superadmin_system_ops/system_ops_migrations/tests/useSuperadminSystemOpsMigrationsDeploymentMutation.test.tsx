import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.api';
import { MigrationDomainActionError, useSuperadminSystemOpsMigrationsDeploymentMutation } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/hooks/useSuperadminSystemOpsMigrationsDeploymentMutation';

import type { ReactNode } from 'react';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/api/superadmin_system_ops_migrations.api", () => ({ migrationsApi: { startMigration: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminSystemOpsMigrationsDeploymentMutation', () => {
  it('starts the requested migration with the caller-provided idempotency key', async () => {
    vi.mocked(migrationsApi.startMigration).mockResolvedValue({ success: true, message: 'Started', data: { id: 'migration-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsDeploymentMutation(), { wrapper });
    await result.current.mutateAsync({ targetVersion: '2026.10.1', idempotencyKey: 'key-1' });
    expect(migrationsApi.startMigration).toHaveBeenCalledWith('2026.10.1', 'key-1');
  });

  it('preserves domain error messages and distinguishes transport failures', async () => {
    const { toast } = await import('sonner');
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsDeploymentMutation(), { wrapper });
    vi.mocked(migrationsApi.startMigration).mockResolvedValueOnce({ success: false, message: 'Tenant database is locked' } as never);
    await expect(result.current.mutateAsync({ targetVersion: 'v1.6.0', idempotencyKey: 'domain-key' })).rejects.toBeInstanceOf(MigrationDomainActionError);
    expect(toast.error).toHaveBeenCalledWith('Tenant database is locked', expect.objectContaining({ id: expect.stringContaining('superadmin-migrations-deploy-error-') }));
    vi.mocked(migrationsApi.startMigration).mockRejectedValueOnce(new Error('internal transport details'));
    await expect(result.current.mutateAsync({ targetVersion: 'v1.6.0', idempotencyKey: 'transport-key' })).rejects.toThrow('internal transport details');
    expect(toast.error).toHaveBeenCalledWith('ui.action_failed_retry', expect.any(Object));
  });

});
