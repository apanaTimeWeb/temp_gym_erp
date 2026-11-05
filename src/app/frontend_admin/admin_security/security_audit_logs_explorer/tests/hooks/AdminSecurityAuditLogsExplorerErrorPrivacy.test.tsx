// RESPONSIBILITY: Regression evidence that Audit Logs errors never disclose backend diagnostic messages.
import { describe, expect, it, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';
import { AdminAuditLogsApi } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/api/admin_security_audit_logs_explorer_api';
import { adminToast } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/feedback/AdminSecurityAuditLogsExplorerToastService';
import { useAdminAuditLogsMutations } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/hooks/useAdminSecurityAuditLogsExplorerMutations';
vi.mock('@/app/frontend_admin/admin_security/security_audit_logs_explorer/components/feedback/AdminSecurityAuditLogsExplorerToastService', () => ({ adminToast: { error: vi.fn(), success: vi.fn() } }));
const messages = { audit_logs: { admin_audit_logs_toolbar: { exportError: 'Audit log export could not be completed.' } } };
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale="en" messages={messages}><QueryClientProvider client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}>{children}</QueryClientProvider></NextIntlClientProvider>
);
describe('Audit Logs error privacy', () => {
  it('shows localized failure copy, never raw backend details', async () => {
    vi.spyOn(AdminAuditLogsApi, 'exportAuditLogs').mockRejectedValueOnce(new Error('secret-token=should-not-be-rendered'));
    const { result } = renderHook(() => useAdminAuditLogsMutations(), { wrapper });
    await act(async () => { await result.current.exportMutation.mutateAsync({ action: 'login' }).catch(() => undefined); });
    await waitFor(() => expect(adminToast.error).toHaveBeenCalledWith(messages.audit_logs.admin_audit_logs_toolbar.exportError, 'admin-audit-export-error'));
    expect(adminToast.error).not.toHaveBeenCalledWith(expect.stringContaining('secret-token'), expect.anything());
  });
});
