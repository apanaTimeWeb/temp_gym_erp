import { describe, expect, it } from 'vitest';
import { announcementFormValuesSchema, announcementSchema } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/schemas/AdminCommunicationNoticesAndAnnouncementsSchemas';
const base = { title: 'Notice', body: 'Body', priority: 'medium', audience: ['members'], gymIds: ['g1'], publishedAt: '2026-11-01T12:00:00Z', expiresAt: '2026-11-02T12:00:00Z', isPinned: false };
describe('announcement audience and branch safety', () => {
  it('rejects Managers in admin authoring without discarding existing DTO fields', () => {
    expect(announcementFormValuesSchema.safeParse(base).success).toBe(true);
    expect(announcementFormValuesSchema.safeParse({ ...base, audience: ['managers'] }).success).toBe(false);
    expect(announcementSchema.safeParse({ ...base, id: 'id', status: 'active', audience: ['managers'], gymNames: ['Branch'], createdBy: 'admin', createdAt: '2026-11-01T12:00:00Z', viewCount: 0 }).success).toBe(true);
  });
  it('still requires at least one target gym', () => {
    expect(announcementFormValuesSchema.safeParse({ ...base, gymIds: [] }).success).toBe(false);
  });
});
