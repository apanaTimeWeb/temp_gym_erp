import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { auditLogsApi } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview.api';
import { SUPERADMIN_AUDIT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview.query_keys';
import { SUPERADMIN_AUDIT_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';
import { useSuperadminAuditComplianceGlobalAuditOverviewData } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewData';
import { MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/fixtures/SuperadminAuditComplianceGlobalAuditOverviewMockFixtures';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/api/superadmin_audit_compliance_global_audit_overview.api', () => ({ auditLogsApi: { fetchGlobalLogs: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('useSuperadminAuditComplianceGlobalAuditOverviewData', () => {
  it('uses namespaced query keys and schema-complete log data', async () => {
    vi.mocked(auditLogsApi.fetchGlobalLogs).mockResolvedValue({ success: true, message: 'Loaded', data: [MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT[0]!], meta: { total: 41, page: 2, limit: 20, totalPages: 3 } , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminAuditComplianceGlobalAuditOverviewData('search', SUPERADMIN_AUDIT_FILTER_ALL, SUPERADMIN_AUDIT_FILTER_ALL, 2, 20), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(auditLogsApi.fetchGlobalLogs).toHaveBeenCalledWith({ page: '2', limit: '20', search: 'search' });
    expect(result.current.totalPages).toBe(3);
    expect(result.current.logs).toEqual([MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT[0]]);
    expect(SUPERADMIN_AUDIT_QUERY_KEYS.list({ page: '2' })).toEqual(['superadmin_audit_compliance_global_audit', 'list', { page: '2' }]);
    expect(SUPERADMIN_AUDIT_QUERY_KEYS.list({ page: '2' })).toEqual(expect.arrayContaining(SUPERADMIN_AUDIT_QUERY_KEYS.all));
  });
});
