import { describe, expect, it } from 'vitest';
import { ADMIN_ANNOUNCEMENTS_DETAIL_URL } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/config/admin_communication_notices_and_announcements.url_config';

describe('AdminCommunicationNoticesAndAnnouncements URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_ANNOUNCEMENTS_DETAIL_URL('valid-1')).toBe("/admin/announcements/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_ANNOUNCEMENTS_DETAIL_URL('a/b?x#y')).toBe("/admin/announcements/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_ANNOUNCEMENTS_DETAIL_URL(id)).toThrow(TypeError);
  });
});
