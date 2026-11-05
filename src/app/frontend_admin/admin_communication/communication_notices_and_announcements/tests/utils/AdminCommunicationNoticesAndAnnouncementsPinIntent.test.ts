import { describe, expect, it } from 'vitest';
import { adminAnnouncementPinIntent } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsPinIntent';
describe('announcement pin retry intent', () => {
  it('keeps failed same-direction retries stable', () => {
    expect(adminAnnouncementPinIntent('a-1', false)).toBe(adminAnnouncementPinIntent('a-1', false));
    expect(adminAnnouncementPinIntent('a-1', true)).toBe(adminAnnouncementPinIntent('a-1', true));
  });
  it('does not reuse keys across pin and unpin or IDs with separators', () => {
    expect(adminAnnouncementPinIntent('a-1', false)).not.toBe(adminAnnouncementPinIntent('a-1', true));
    expect(adminAnnouncementPinIntent('a:b', false)).not.toBe(adminAnnouncementPinIntent('a', false));
    expect(adminAnnouncementPinIntent('a:b', false)).not.toBe(adminAnnouncementPinIntent('a', true));
  });
});
