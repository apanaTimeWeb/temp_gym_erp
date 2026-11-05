import { describe, expect, it } from 'vitest';

import { SuperadminSystemOpsSystemOpsFormatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/utils/SuperadminSystemOpsOverviewFormatDateTime';


describe('SuperadminSystemOpsSystemOpsFormatDateTime', () => {
  it('formats a valid UTC date into a user-visible value', () => {
    const value = SuperadminSystemOpsSystemOpsFormatDateTime('2026-10-01T10:30:00Z', 'en-IN');
    expect(value).not.toBe('—');
    expect(value).toContain('2026');
  });
  it('uses the empty fallback for missing timestamps', () => {
    expect(SuperadminSystemOpsSystemOpsFormatDateTime(null, 'en-IN')).toBe('—');
  });
});
