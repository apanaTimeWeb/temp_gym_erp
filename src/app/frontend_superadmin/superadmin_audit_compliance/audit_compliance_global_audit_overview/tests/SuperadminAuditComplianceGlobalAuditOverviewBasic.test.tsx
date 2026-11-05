import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/fixtures/SuperadminAuditComplianceGlobalAuditOverviewMockFixtures';



describe('Superadmin GlobalAudit module fixture contract', () => {
  it('provides the minimum fixture contract required by the module data flow', () => {
    expect(MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT).toHaveLength(12);
    const first = MOCK_SUPERADMIN_AUDIT_COMPLIANCE_GLOBAL_AUDIT[0];
    expect(first).toMatchObject({ id: expect.any(String), timestamp: expect.any(String), actor: expect.any(String), action: expect.any(String), resource: expect.any(String), resourceId: expect.any(String), severity: expect.any(String) });
  });

});
