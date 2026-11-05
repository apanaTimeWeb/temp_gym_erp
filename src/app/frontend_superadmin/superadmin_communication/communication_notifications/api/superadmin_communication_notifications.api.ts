import { superadminCommunicationNotificationsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/api/superadmin_communication_notifications_api_fetch.api';
import { SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/config/superadmin_communication_notifications.url_config';
import { SuperadminCommunicationNotificationsListResponseSchema, SuperadminCommunicationNotificationDetailResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/schemas/superadmin_communication_notifications.schema';
import type { SuperadminNotification } from '@/app/frontend_superadmin/superadmin_communication/communication_notifications/types/superadmin_communication_notifications.types';
/** API methods preserve original backend paths, methods and Idempotency-Key behavior. */
export const superadminNotificationApi = {
 fetchNotifications: () => apiFetch<SuperadminNotification[]>(SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API.NOTIFICATIONS,{ responseSchema: SuperadminCommunicationNotificationsListResponseSchema }),
 markNotificationRead: (id:string,idempotencyKey:string) => apiFetch<SuperadminNotification>(SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API.NOTIFICATION_READ(id),{ method:'PATCH',headers:{ 'Idempotency-Key':idempotencyKey }, responseSchema:SuperadminCommunicationNotificationDetailResponseSchema }),
 markAllNotificationsRead: (idempotencyKey:string) => apiFetch<SuperadminNotification[]>(SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API.NOTIFICATIONS_READ_ALL,{ method:'PATCH',headers:{ 'Idempotency-Key':idempotencyKey }, responseSchema:SuperadminCommunicationNotificationsListResponseSchema }),
} as const;
