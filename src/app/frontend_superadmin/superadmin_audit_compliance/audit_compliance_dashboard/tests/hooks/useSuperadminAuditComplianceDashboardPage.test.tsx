import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchComplianceOverview } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/api/superadmin_audit_compliance_dashboard.api';
import { useSuperadminAuditComplianceDashboardPage } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/hooks/useSuperadminAuditComplianceDashboardPage';
import { SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/mocks/fixtures/SuperadminAuditComplianceDashboardMockFixtures';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/api/superadmin_audit_compliance_dashboard.api', () => ({ fetchComplianceOverview: vi.fn() }));
const mockedFetch = vi.mocked(fetchComplianceOverview);
describe('useSuperadminAuditComplianceDashboardPage integration', () => {
    let queryClient: QueryClient;
    function TestQueryProvider({ children }: {
        children: ReactNode;
    }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        });
        mockedFetch.mockReset();
    });
    it('delivers API response data through TanStack Query', async () => {
        mockedFetch.mockResolvedValue({
            success: true,
            message: 'Loaded successfully.',
            data: SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE,
        });
        const { result } = renderHook(() => useSuperadminAuditComplianceDashboardPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data).toEqual(SUPERADMIN_AUDIT_COMPLIANCE_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(result.current.isError).toBe(false);
    });
    it('exposes request failures through the query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminAuditComplianceDashboardPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });

    it('treats a resolved API failure envelope as a query error', async () => {
        mockedFetch.mockResolvedValue({ success: false, message: 'compliance unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-compliance' } as never);
        const { result } = renderHook(() => useSuperadminAuditComplianceDashboardPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });
});
