// RESPONSIBILITY: Verifies Global Audit configuration values and invariants consumed by its filters.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_AUDIT_PAGE_SIZE, SUPERADMIN_AUDIT_SEVERITY_OPTIONS, SUPERADMIN_AUDIT_ACTOR_OPTIONS, SUPERADMIN_AUDIT_FILTER_ALL, SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';



describe('SuperadminAuditComplianceGlobalAuditConstants', () => {
  it('uses the documented page size and all-filter sentinel', () => {
    expect(SUPERADMIN_AUDIT_PAGE_SIZE).toBe(20);
    expect(SUPERADMIN_AUDIT_FILTER_ALL).toBe('ALL');
  });
  it('defines every selectable severity with semantic badge classes', () => {
    expect(SUPERADMIN_AUDIT_SEVERITY_OPTIONS).toEqual(['ALL', 'INFO', 'WARNING', 'CRITICAL']);
    expect(Object.keys(SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES).sort()).toEqual(['CRITICAL', 'INFO', 'WARNING']);
  });
  it('defines actor options with the expected tenant/system scopes', () => {
    expect(SUPERADMIN_AUDIT_ACTOR_OPTIONS).toEqual(['ALL', 'SUPERADMIN', 'SYSTEM', 'TENANT']);
  });
});
