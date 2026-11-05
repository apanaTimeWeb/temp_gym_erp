// RESPONSIBILITY: Owns typed HTTP access for Admin announcement queries and mutations.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_communication/communication_notices_and_announcements/api/admin_communication_notices_and_announcements_api.ts)

import { z } from 'zod';
import { adminAnnouncementsManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsApiResponse';
import { ADMIN_ANNOUNCEMENTS_API } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/config/admin_communication_notices_and_announcements.url_config';
import type { AdminAnnouncementsQueryParams, Announcement, AnnouncementFormValues, AnnouncementKPIData } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
import { announcementKpiDataSchema, announcementSchema } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/schemas/AdminCommunicationNoticesAndAnnouncementsSchemas';

/** Builds stable URL query parameters for the announcements list contract. */
function buildQuery(params: AdminAnnouncementsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const AdminAnnouncementsApi = {
  fetchAnnouncements: async (params: AdminAnnouncementsQueryParams) => apiFetch<Announcement[]>(`${ADMIN_ANNOUNCEMENTS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(announcementSchema) }),
  fetchKPIs: async () => apiFetch<AnnouncementKPIData>(ADMIN_ANNOUNCEMENTS_API.kpis, { method: 'GET', dataSchema: announcementKpiDataSchema }),
  createAnnouncement: async (payload: AnnouncementFormValues, idempotencyKey: string) => apiFetch<Announcement>(ADMIN_ANNOUNCEMENTS_API.base, { method: 'POST', body: JSON.stringify(payload), dataSchema: announcementSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  updateAnnouncement: async (id: string, payload: AnnouncementFormValues, idempotencyKey: string) => apiFetch<Announcement>(ADMIN_ANNOUNCEMENTS_API.detail(id), { method: 'PATCH', body: JSON.stringify(payload), dataSchema: announcementSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  deleteAnnouncement: async (id: string, idempotencyKey: string) => apiFetch<null>(ADMIN_ANNOUNCEMENTS_API.detail(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  togglePin: async (id: string, idempotencyKey: string) => apiFetch<Announcement>(ADMIN_ANNOUNCEMENTS_API.pin(id), { method: 'PATCH', dataSchema: announcementSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
};
