import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSuperadminAuditComplianceGlobalAuditOverviewMain } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewMain';
const setParam = vi.fn();
const params: Record<string, string> = { search: 'abc', page: '2' };
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => params[key] ?? fallback, setParam }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewData', () => ({ useSuperadminAuditComplianceGlobalAuditOverviewData: () => ({ logs: [], totalPages: 3, isPending: false, isFetching: false, error: null, refetch: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/hooks/useSuperadminAuditComplianceGlobalAuditOverviewExportMutation', () => ({ useSuperadminAuditComplianceGlobalAuditOverviewExportMutation: () => ({ requestExport: vi.fn(), isRequesting: false, error: null, reset: vi.fn() }) }));
describe('useSuperadminAuditComplianceGlobalAuditOverviewMain', () => {
  beforeEach(() => { Object.keys(params).forEach((key) => delete params[key]); Object.assign(params, { search: 'abc', page: '2' }); setParam.mockClear(); });
  it('reads shareable search and pagination state from the URL contract', () => {
    const { result } = renderHook(() => useSuperadminAuditComplianceGlobalAuditOverviewMain());
    expect(result.current.search).toBe('abc'); expect(result.current.currentPage).toBe(2); expect(result.current.totalPages).toBe(3);
  });
  it('normalizes unknown filters and malformed page numbers without passing them to the query', () => {
    Object.assign(params, { severityFilter: 'P0', actorTypeFilter: 'ROOT', page: '-8' });
    const { result } = renderHook(() => useSuperadminAuditComplianceGlobalAuditOverviewMain());
    expect(result.current.severityFilter).toBe('ALL'); expect(result.current.actorTypeFilter).toBe('ALL'); expect(result.current.currentPage).toBe(1);
  });
});
