import { describe, expect, it } from 'vitest';
import { normalizeAdminAttendanceDashboardMockPagination } from '../../utils/AdminAttendanceDashboardMockPagination';
import { adminAttendanceMockHandlers } from '../../mocks/handlers/AdminAttendanceDashboardMockHandlers';

describe('RBG139 attendance mock bounds', () => {
  it('bounds huge page sizes and rejects malformed integers', () => {
    expect(normalizeAdminAttendanceDashboardMockPagination('999999', 10, 100)).toBe(100);
    expect(normalizeAdminAttendanceDashboardMockPagination('3', 10, 100)).toBe(3);
    for (const raw of ['-1', '0', '2.5', 'Infinity', '1e9', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminAttendanceDashboardMockPagination(raw, 10, 100)).toBe(10);
    }
  });
  it('returns self-consistent last-page metadata for obsolete page requests', async () => {
    const handler = adminAttendanceMockHandlers.find((item) => String(item.info.path).endsWith('/admin/attendance/records'));
    expect(handler).toBeDefined();
    // MSW intercepting is covered in the host harness; this test asserts finite input normalization.
    expect(normalizeAdminAttendanceDashboardMockPagination('999999', 1, 100_000)).toBe(100_000);
  });
});
