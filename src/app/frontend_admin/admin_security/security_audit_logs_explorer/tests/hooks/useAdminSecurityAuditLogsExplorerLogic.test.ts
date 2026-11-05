// RESPONSIBILITY: Defines regression tests for useAdminSecurityAuditLogsExplorerLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_audit_logs/audit_logs_explorer/tests/hooks/useAdminSecurityAuditLogsExplorerLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAdminAuditLogsLogic } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerLogic';

const store = {
  actorFilter: 'admin', actionFilter: 'all', entityFilter: 'member', dateFrom: '2026-10-01', dateTo: '2026-10-05', currentPage: 2, selectedLogId: 'log-1',
  setActorFilter: vi.fn(), setActionFilter: vi.fn(), setEntityFilter: vi.fn(), setDateFrom: vi.fn(), setDateTo: vi.fn(), setCurrentPage: vi.fn(), setSelectedLogId: vi.fn(),
};
const exportMutation = { isPending: false, mutate: vi.fn() };
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn(), useQueryClient: () => ({ invalidateQueries: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_security/security_audit_logs_explorer/state/useAdminSecurityAuditLogsExplorerStore', () => ({ useAdminAuditLogsStore: () => store }));
vi.mock('@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerUrlQuerySync', () => ({ useAdminNavigationLayoutUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerMutations', () => ({ useAdminAuditLogsMutations: () => ({ exportMutation }) }));

describe('useAdminAuditLogsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset()
      .mockReturnValueOnce({ data: { data: [{ id: 'log-1' }], meta: { total: 101 } }, status: 'success', refetch: vi.fn() } as never)
      .mockReturnValueOnce({ data: { data: { total: 101 } }, status: 'success' } as never)
      .mockReturnValueOnce({ data: { data: { actors: ['admin'] } }, status: 'success' } as never)
      .mockReturnValueOnce({ data: { data: { id: 'log-1', action: 'UPDATE' } }, status: 'success', error: null, refetch: vi.fn() } as never);
    exportMutation.mutate.mockReset();
  });

  it('preserves filter/detail identity and passes current filters into export', () => {
    const { result } = renderHook(() => useAdminAuditLogsLogic());
    expect(result.current.logs).toEqual([{ id: 'log-1' }]);
    expect(result.current.totalItems).toBe(101);
    expect(result.current.totalPages).toBeGreaterThan(1);
    result.current.exportAuditLogs();
    expect(exportMutation.mutate).toHaveBeenCalledWith({ actor: 'admin', action: undefined, from: '2026-10-01', to: '2026-10-05', entityType: 'member' });
  });
});
