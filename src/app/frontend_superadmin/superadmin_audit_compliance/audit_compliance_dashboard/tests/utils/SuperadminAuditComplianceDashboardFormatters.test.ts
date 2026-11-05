import { describe, expect, it } from 'vitest';
import { formatCompliancePercentage } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/utils/SuperadminAuditComplianceDashboardFormatters';

describe('formatCompliancePercentage', () => {
  it('preserves accepted fractional tax rates instead of rounding them to whole percentages', () => {
    expect(formatCompliancePercentage(18.5555, 'en-US')).toBe('18.5555');
  });
  it('returns the nullable display fallback for absent or non-finite rates', () => {
    expect(formatCompliancePercentage(null, 'en-US')).toBe('—');
    expect(formatCompliancePercentage(Number.NaN, 'en-US')).toBe('—');
  });
});
