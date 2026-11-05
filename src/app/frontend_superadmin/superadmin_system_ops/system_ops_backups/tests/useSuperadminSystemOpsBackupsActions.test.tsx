import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createBackupSnapshot, restoreBackupSnapshot, fetchBackupDownloadUrl } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsActions';

import type { ReactNode } from 'react';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api", () => ({ createBackupSnapshot: vi.fn(), restoreBackupSnapshot: vi.fn(), fetchBackupDownloadUrl: vi.fn() }));

describe('useSuperadminSystemOpsBackupsActions', () => {
  it('generates one intent-scoped idempotency key and sends it to the feature API', async () => {
    vi.mocked(createBackupSnapshot).mockResolvedValue({ success: true, message: 'Started', data: null });
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const randomUUID = vi.spyOn(crypto, 'randomUUID').mockReturnValue('key-1');
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsActions(), { wrapper });
    await result.current.triggerBackup();
    expect(createBackupSnapshot).toHaveBeenCalledWith('key-1');
    randomUUID.mockRestore();
  });
  it('reuses the same restore idempotency key after a rejected attempt', async () => {
    vi.mocked(restoreBackupSnapshot).mockRejectedValueOnce(new Error('temporary failure')).mockResolvedValueOnce({ success: true, message: 'Restored', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const randomUUID = vi.spyOn(crypto, 'randomUUID').mockReturnValue('restore-key');
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsActions(), { wrapper });
    await expect(result.current.restoreBackup('bk-1')).rejects.toThrow('temporary failure');
    await result.current.restoreBackup('bk-1');
    expect(restoreBackupSnapshot).toHaveBeenNthCalledWith(1, 'bk-1', 'restore-key');
    expect(restoreBackupSnapshot).toHaveBeenNthCalledWith(2, 'bk-1', 'restore-key');
    randomUUID.mockRestore();
  });

  it('rejects an incomplete download response instead of navigating to an undefined URL', async () => {
    vi.mocked(fetchBackupDownloadUrl).mockResolvedValue({ success: true, message: 'No URL', data: null } as unknown as Awaited<ReturnType<typeof fetchBackupDownloadUrl>>);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsActions(), { wrapper });
    await expect(result.current.downloadBackup('bk-1')).rejects.toThrow('No URL');
  });

});
