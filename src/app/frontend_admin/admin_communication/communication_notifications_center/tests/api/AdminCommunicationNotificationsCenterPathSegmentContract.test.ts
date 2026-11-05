import { describe, expect, it } from 'vitest';
import { ADMIN_NOTIFICATIONS_MARK_READ_URL } from '@/app/frontend_admin/admin_communication/communication_notifications_center/config/admin_communication_notifications_center.url_config';

describe('AdminCommunicationNotificationsCenter URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_NOTIFICATIONS_MARK_READ_URL('valid-1')).toBe("/admin/notifications/valid-1/read");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_NOTIFICATIONS_MARK_READ_URL('a/b?x#y')).toBe("/admin/notifications/a%2Fb%3Fx%23y/read");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_NOTIFICATIONS_MARK_READ_URL(id)).toThrow(TypeError);
  });
});
