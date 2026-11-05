// RESPONSIBILITY: Defines regression tests for AdminCommunicationNoticesAndAnnouncementsDateTime.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/utils/AdminCommunicationNoticesAndAnnouncementsDateTime.test.ts)

import { describe, expect, it } from 'vitest';
import { adminAnnouncementLocalDateTimeToUtc, adminAnnouncementUtcToLocalDateTime } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsDateTime';

describe('announcement datetime boundary conversions', () => {
  it('serializes browser-local datetime-local input as an explicit UTC ISO instant', () => {
    const local = '2026-10-18T14:30';
    expect(adminAnnouncementLocalDateTimeToUtc(local)).toBe(new Date(local).toISOString());
    expect(adminAnnouncementLocalDateTimeToUtc(local)).toMatch(/Z$/);
  });

  it('round-trips an instant through the browser-local input representation', () => {
    const originalInstant = new Date(2026, 9, 18, 14, 30).toISOString();
    const local = adminAnnouncementUtcToLocalDateTime(originalInstant);
    expect(adminAnnouncementLocalDateTimeToUtc(local)).toBe(originalInstant);
  });

  it('rejects malformed local input and handles invalid API dates safely', () => {
    expect(() => adminAnnouncementLocalDateTimeToUtc('not-a-date')).toThrow(RangeError);
    expect(adminAnnouncementUtcToLocalDateTime('invalid')).toBe('');
  });
});
