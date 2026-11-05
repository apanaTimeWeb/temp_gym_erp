import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { updateBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation';

import type { ReactNode } from 'react';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api", () => ({ fetchBackupSchedule: vi.fn(), updateBackupSchedule: vi.fn() }));

describe('useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation', () => {
  it('passes the validated schedule and generated idempotency key to the API', async () => {
    vi.mocked(updateBackupSchedule).mockResolvedValue({ success: true, message: 'Updated', data: { cronExpression: '0 2 * * *', retentionDays: 7, updatedAt: '2026-09-18T02:00:00Z' } });
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation(), { wrapper });
    const input = { cronExpression: '0 2 * * *', retentionDays: 7 };
    await result.current.mutateAsync(input);
    expect(updateBackupSchedule).toHaveBeenCalledWith(input, expect.any(String));
  });
});
