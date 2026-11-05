// RESPONSIBILITY: Proves the audit-log binary export fails closed without a verified apiFetch Blob contract.
// DATA FLOW: exported filter contract → audit API boundary → typed contract-block error (admin_audit_logs/audit_logs_explorer/tests/api/AdminSecurityAuditLogsExplorerBinaryExportContract.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminAuditLogsApi, AdminSecurityAuditLogsExplorerBinaryExportContractError } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/api/admin_security_audit_logs_explorer_api';

describe('AdminAuditLogsApi binary export contract', () => {
  it('fails closed until the centralized host Blob transport contract is available', async () => {
    await expect(AdminAuditLogsApi.exportAuditLogs({ actor: 'admin', action: 'login' })).rejects.toBeInstanceOf(AdminSecurityAuditLogsExplorerBinaryExportContractError);
  });
});
