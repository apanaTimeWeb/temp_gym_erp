// RESPONSIBILITY: Owns typed HTTP access for the Admin notification feed and supported read-state mutations.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_communication/communication_notifications_center/api/admin_communication_notifications_center_api.ts)

import type { AdminNotificationsQueryParams } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterQueryTypes';
import { z } from 'zod';
import { adminNotificationsCenterApiFetch as apiFetch } from '@/app/frontend_admin/admin_communication/communication_notifications_center/utils/AdminCommunicationNotificationsCenterApiResponse';
import { ADMIN_NOTIFICATIONS_API } from '@/app/frontend_admin/admin_communication/communication_notifications_center/config/admin_communication_notifications_center.url_config';
import { adminNotificationSchema } from '@/app/frontend_admin/admin_communication/communication_notifications_center/schemas/AdminCommunicationNotificationsCenterSchemas';
import type { AdminNotification } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes';


export const AdminNotificationsApi = {
  fetchNotifications: async (params?: AdminNotificationsQueryParams) => {
    const search = new URLSearchParams();
    if (params?.read !== undefined) search.set('read', String(params.read));
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiFetch<AdminNotification[]>(`${ADMIN_NOTIFICATIONS_API.base}${suffix}`, {
      method: 'GET',
      dataSchema: z.array(adminNotificationSchema),
    });
  },
  markNotificationAsRead: async (id: string, idempotencyKey: string) =>
    apiFetch<AdminNotification | null>(ADMIN_NOTIFICATIONS_API.markRead(id), {
      method: 'PATCH',
      dataSchema: adminNotificationSchema.nullable(),
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
  markAllNotificationsAsRead: async (idempotencyKey: string) =>
    apiFetch<null>(ADMIN_NOTIFICATIONS_API.markAllRead, {
      method: 'PATCH',
      dataSchema: z.null(),
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
};
