// RESPONSIBILITY: Defines regression tests for useAdminSecurityAuditLogsExplorerStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_audit_logs/audit_logs_explorer/tests/store/useAdminSecurityAuditLogsExplorerStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminAuditLogsStore } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/state/useAdminSecurityAuditLogsExplorerStore';

describe('useAdminAuditLogsStore', () => {
  beforeEach(() => useAdminAuditLogsStore.setState({ currentPage: 3, actorFilter: 'all', actionFilter: 'all', entityFilter: 'all', selectedLogId: null }));

  it('resets pagination when a filter changes', () => {
    useAdminAuditLogsStore.getState().setActorFilter('admin-1');
    expect(useAdminAuditLogsStore.getState()).toMatchObject({ actorFilter: 'admin-1', currentPage: 1 });
    useAdminAuditLogsStore.setState({ currentPage: 4 });
    useAdminAuditLogsStore.getState().setActionFilter('UPDATE');
    expect(useAdminAuditLogsStore.getState()).toMatchObject({ actionFilter: 'UPDATE', currentPage: 1 });
  });

  it('tracks a selected log for the detail drawer', () => {
    useAdminAuditLogsStore.getState().setSelectedLogId('audit-42');
    expect(useAdminAuditLogsStore.getState().selectedLogId).toBe('audit-42');
  });
});
