import { MANAGER_NOTIFICATIONS_INBOX_API } from '@/app/frontend_manager/manager_communications/notifications_inbox/config/manager_notifications_inbox.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { notificationSchema, notificationKpiSchema } from '@/app/frontend_manager/manager_communications/notifications_inbox/schemas/manager_notifications_inbox.schemas';
import type { Notification, NotificationKPIData } from '@/app/frontend_manager/manager_communications/notifications_inbox/types/manager_notifications_inbox.types';


/**
 * @description Provides the ManagerNotificationsInboxApi implementation for the notifications module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_communications/manager_notifications_schemas/ManagerNotificationsInboxSchema; @/app/frontend_manager/manager_communications/manager_notifications_url_config; @/app/frontend_manager/manager_communications/manager_notifications_types/ManagerNotificationsInboxTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const nullResponseSchema = z.null();

export const ManagerNotificationsInboxApi = {
  fetchManagerNotificationsInbox: async (params?: Record<string, string>): Promise<ApiResponse<{ notifications: Notification[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_NOTIFICATIONS_INBOX_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ notifications: z.array(notificationSchema), total: z.number() }) });
  },
  fetchNotificationKPIs: async (): Promise<ApiResponse<NotificationKPIData>> =>
    apiFetch(MANAGER_NOTIFICATIONS_INBOX_API.KPIS, { dataSchema: notificationKpiSchema }),
  markNotificationRead: async (id: string, idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(MANAGER_NOTIFICATIONS_INBOX_API.MARK_READ(id), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }),
  markAllNotificationsRead: async (idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(MANAGER_NOTIFICATIONS_INBOX_API.MARK_ALL_READ, { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }),
  deleteNotification: async (id: string, idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(MANAGER_NOTIFICATIONS_INBOX_API.DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }) };
