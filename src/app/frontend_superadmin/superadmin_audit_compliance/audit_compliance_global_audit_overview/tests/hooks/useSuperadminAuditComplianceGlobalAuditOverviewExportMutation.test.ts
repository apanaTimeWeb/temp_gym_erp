vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
import { createElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { superadminGlobalAuditExportApi } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_export.api';
import { useSuperadminAuditComplianceGlobalAuditOverviewExportMutation } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewExportMutation';
vi.mock('@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview_export.api', () => ({ superadminGlobalAuditExportApi: { requestExport: vi.fn() } }));
describe('useSuperadminAuditComplianceGlobalAuditOverviewExportMutation', () => {
  it('reuses the intent idempotency key after failure and clears it after success', async () => {
    vi.mocked(superadminGlobalAuditExportApi.requestExport).mockRejectedValueOnce(new Error('offline')).mockResolvedValue({ success: true, message: 'started', data: null , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminAuditComplianceGlobalAuditOverviewExportMutation(), { wrapper });
    await act(async () => { await expect(result.current.requestExport()).rejects.toThrow('offline'); });
    const firstKey = vi.mocked(superadminGlobalAuditExportApi.requestExport).mock.calls[0]?.[0];
    await act(async () => { await result.current.requestExport(); });
    const secondKey = vi.mocked(superadminGlobalAuditExportApi.requestExport).mock.calls[1]?.[0];
    expect(firstKey).toBeTruthy();
    expect(secondKey).toBe(firstKey);
    await act(async () => { await result.current.requestExport(); });
    expect(vi.mocked(superadminGlobalAuditExportApi.requestExport).mock.calls[2]?.[0]).not.toBe(firstKey);
  });
});
