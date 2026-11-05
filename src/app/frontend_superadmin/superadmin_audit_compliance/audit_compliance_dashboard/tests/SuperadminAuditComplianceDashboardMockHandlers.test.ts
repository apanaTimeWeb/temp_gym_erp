import { describe, expect, it } from 'vitest';
import { getSuperadminAuditComplianceMockBody } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/mocks/handlers/SuperadminAuditComplianceDashboardMockHandlers';

describe('Compliance mock scenarios', () => {
  it('returns contract-complete populated data', () => {
    const response = getSuperadminAuditComplianceMockBody('success');
    expect(response.success).toBe(true);
    expect(response.data?.summary.registeredTenants).toBeGreaterThan(0);
    expect(response.data?.documents.length).toBeGreaterThan(0);
  });
  it('models a real empty result without invented fallback rows', () => {
    const response = getSuperadminAuditComplianceMockBody('empty');
    expect(response.data?.regions).toEqual([]);
    expect(response.data?.documents).toEqual([]);
    expect(response.data?.summary.registeredTenants).toBe(0);
  });
});
