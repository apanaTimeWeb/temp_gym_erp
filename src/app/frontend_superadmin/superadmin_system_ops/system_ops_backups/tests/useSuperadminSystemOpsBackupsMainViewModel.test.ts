import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsActions';
import { useSuperadminSystemOpsBackupsData } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsData';
import { useSuperadminSystemOpsBackupsMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsMainViewModel';


const setParam = vi.fn();
let params: Record<string, string> = {};
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => params[key] ?? fallback, setParam }) }));
vi.mock('@/hooks/useDebouncedValue', () => ({ useDebouncedValue: (value: string) => value }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsData", () => ({ useSuperadminSystemOpsBackupsData: vi.fn() }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsActions", () => ({ useSuperadminSystemOpsBackupsActions: vi.fn() }));

describe('useSuperadminSystemOpsBackupsMainViewModel', () => {
  beforeEach(() => { params = {}; setParam.mockClear(); vi.mocked(useSuperadminSystemOpsBackupsData).mockReturnValue({ data: [], total: 0, totalPages: 1, isPending: false, isError: false, error: null, refetch: vi.fn() }); vi.mocked(useSuperadminSystemOpsBackupsActions).mockReturnValue({ triggerBackup: vi.fn(), isTriggering: false, triggerError: null, restoreBackup: vi.fn(), isRestoring: false, restoreError: null, clearRestoreIntent: vi.fn(), downloadBackup: vi.fn() }); });

  it('normalizes invalid page values and builds canonical page-size parameters', () => {
    params = { page: '-3', search: 'gym', statusFilter: 'FAILED', typeFilter: 'MANUAL' }; // Legacy URL parameter is intentionally ignored until the API contract exists.
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsMainViewModel());
    expect(result.current.currentPage).toBe(1);
    expect(vi.mocked(useSuperadminSystemOpsBackupsData)).toHaveBeenCalledWith({ page: '1', limit: '10', search: 'gym', status: 'FAILED' });
  });

  it('resets pagination whenever a search or filter changes', () => {
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsMainViewModel());
    act(() => result.current.setSearch('north'));
    act(() => result.current.setStatusFilter('FAILED'));
    expect(setParam).toHaveBeenNthCalledWith(1, 'search', 'north');
    expect(setParam).toHaveBeenNthCalledWith(2, 'page', '1');
    expect(setParam).toHaveBeenNthCalledWith(3, 'statusFilter', 'FAILED');
    expect(setParam).toHaveBeenNthCalledWith(4, 'page', '1');
  });
});
