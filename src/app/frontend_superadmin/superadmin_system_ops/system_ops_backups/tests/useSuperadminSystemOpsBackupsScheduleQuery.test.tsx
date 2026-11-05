import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api';
import { useSuperadminSystemOpsBackupsScheduleQuery } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsScheduleQuery';

import type { ReactNode } from 'react';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/api/superadmin_system_ops_backups.api", () => ({ fetchBackupSchedule: vi.fn() }));

describe('useSuperadminSystemOpsBackupsScheduleQuery', () => {
  beforeEach(() => vi.clearAllMocks());
  it('loads the validated schedule only when enabled', async () => {
    vi.mocked(fetchBackupSchedule).mockResolvedValue({ success: true, message: 'Loaded', data: { cronExpression: '0 2 * * *', retentionDays: 7, updatedAt: '2026-09-18T02:00:00Z' } });
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsScheduleQuery(true), { wrapper });
    await waitFor(() => expect(result.current.schedule).toEqual({ cronExpression: '0 2 * * *', retentionDays: 7, updatedAt: '2026-09-18T02:00:00Z' }));
    expect(fetchBackupSchedule).toHaveBeenCalledTimes(1);
  });

  it('does not request the schedule while the modal is disabled', () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    renderHook(() => useSuperadminSystemOpsBackupsScheduleQuery(false), { wrapper });
    expect(fetchBackupSchedule).not.toHaveBeenCalled();
  });
});
