// RESPONSIBILITY: Defines regression tests for AdminMembersBlacklistManagementDateFormatter.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/utils/AdminMembersBlacklistManagementDateFormatter.test.ts)

import { describe, expect, it } from 'vitest';
import { formatAdminBlacklistDate } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementDateFormatter';

describe('formatAdminBlacklistDate', () => {
  it('returns a placeholder for missing or invalid values', () => {
    expect(formatAdminBlacklistDate(undefined, 'en')).toBe('—');
    expect(formatAdminBlacklistDate('not-a-date', 'hi')).toBe('—');
  });
  it('returns localized formatted output for a valid ISO value', () => {
    expect(formatAdminBlacklistDate('2025-04-12T00:00:00.000Z', 'en')).not.toBe('—');
    expect(formatAdminBlacklistDate('2025-04-12T00:00:00.000Z', 'hi')).not.toBe('—');
  });
});
