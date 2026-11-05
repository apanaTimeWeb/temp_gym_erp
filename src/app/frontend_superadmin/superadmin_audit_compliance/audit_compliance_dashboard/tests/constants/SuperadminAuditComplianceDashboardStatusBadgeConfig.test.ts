import { describe, expect, it } from 'vitest';
import { getSuperadminAuditComplianceStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/constants/superadmin_audit_compliance_dashboard_status_badge_config.constants';

describe('getSuperadminAuditComplianceStatusBadgeClasses', () => {
  it('maps the documented document and region statuses to semantic design tokens', () => {
    expect(getSuperadminAuditComplianceStatusBadgeClasses('VALID')).toContain('bg-success-bg');
    expect(getSuperadminAuditComplianceStatusBadgeClasses('READY')).toContain('bg-success-bg');
    expect(getSuperadminAuditComplianceStatusBadgeClasses('EXPIRING')).toContain('bg-warning-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminAuditComplianceStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
