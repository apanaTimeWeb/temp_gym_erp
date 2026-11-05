import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsBackupsSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsSchedule';



const mockQuery = { schedule: { enabled: true }, isPending: false, isError: false, error: null, refetch: vi.fn() };
const mockMutation = { mutateAsync: vi.fn(), isPending: false, error: null };
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsScheduleQuery", () => ({ useSuperadminSystemOpsBackupsScheduleQuery: vi.fn(() => mockQuery) }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation", () => ({ useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation: vi.fn(() => mockMutation) }));

describe('useSuperadminSystemOpsBackupsSchedule', () => {
  it('exposes the query state and dedicated mutation boundary without reimplementing either', () => {
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsSchedule(true));
    expect(result.current.schedule).toEqual({ enabled: true });
    expect(result.current.isPending).toBe(false);
    expect(result.current.saveSchedule).toBe(mockMutation.mutateAsync);
    expect(result.current.retry).toBe(mockQuery.refetch);
  });
});
