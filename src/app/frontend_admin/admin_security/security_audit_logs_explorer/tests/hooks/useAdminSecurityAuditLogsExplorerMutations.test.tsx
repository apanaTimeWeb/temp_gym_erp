// RESPONSIBILITY: Verifies the audit CSV export is safely blocked while host binary transport remains unspecified.
// DATA FLOW: test event → audit export mutation → contract-block error → localized user feedback (admin_audit_logs/audit_logs_explorer/tests/hooks/useAdminSecurityAuditLogsExplorerMutations.test.tsx)

import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { AdminAuditLogsApi, AdminSecurityAuditLogsExplorerBinaryExportContractError } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/api/admin_security_audit_logs_explorer_api';
import { useAdminAuditLogsMutations } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerMutations';
import { adminToast } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/feedback/AdminSecurityAuditLogsExplorerToastService';

vi.mock('@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/feedback/AdminSecurityAuditLogsExplorerToastService', () => ({
  adminToast: { success: vi.fn(), error: vi.fn() },
}));

const messages = { audit_logs: { admin_audit_logs_toolbar: { exportContractBlocked: 'CSV export is unavailable until the host API contract defines safe binary-response handling.', exportError: 'Audit log export could not be completed.', exportSuccess: 'Audit log export is ready.' } } };
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={client}>{children}</QueryClientProvider></NextIntlClientProvider>;
};

describe('useAdminAuditLogsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('blocks unverified binary export and reports the host-contract limitation', async () => {
    vi.spyOn(AdminAuditLogsApi, 'exportAuditLogs').mockRejectedValue(new AdminSecurityAuditLogsExplorerBinaryExportContractError());
    const { result } = renderHook(() => useAdminAuditLogsMutations(), { wrapper });
    await act(async () => {
      await result.current.exportMutation.mutateAsync({ actor: 'admin', action: 'login' }).catch(() => undefined);
    });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith(messages.audit_logs.admin_audit_logs_toolbar.exportContractBlocked, 'admin-audit-export-contract-blocked'));
  });
});
