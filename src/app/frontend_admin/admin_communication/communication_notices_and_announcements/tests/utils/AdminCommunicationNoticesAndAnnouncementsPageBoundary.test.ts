import { describe, expect, it } from 'vitest';
import { normalizeAdminAnnouncementsPage, normalizeAdminAnnouncementsMockLimit } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsPageBoundary';

describe('Announcements strict URL/MSW pagination', () => {
  it.each(['', '0', '-1', '1.5', '2abc', '1e3', '0x10', 'Infinity', 'NaN', '01', '9999999999999999999999'])(
    'defaults unsafe page %s', (raw) => expect(normalizeAdminAnnouncementsPage(raw)).toBe(1),
  );
  it('accepts decimal positive pages and clamps the frontend bound', () => {
    expect(normalizeAdminAnnouncementsPage('7')).toBe(7);
    expect(normalizeAdminAnnouncementsPage(7)).toBe(7);
    expect(normalizeAdminAnnouncementsPage('100001')).toBe(100000);
    expect(normalizeAdminAnnouncementsPage(null)).toBe(1);
  });
  it('protects mock page size', () => {
    expect(normalizeAdminAnnouncementsMockLimit('1e2')).toBe(10);
    expect(normalizeAdminAnnouncementsMockLimit('150')).toBe(100);
    expect(normalizeAdminAnnouncementsMockLimit('5')).toBe(5);
    expect(normalizeAdminAnnouncementsMockLimit(null)).toBe(10);
  });
});
