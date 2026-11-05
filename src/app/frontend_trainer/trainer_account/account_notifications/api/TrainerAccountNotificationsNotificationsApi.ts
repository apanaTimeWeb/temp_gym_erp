// RESPONSIBILITY: API functions for the Trainer Notifications module with canonical response validation.
// DATA FLOW: HTTP response → Zod schema → notification Query → UI.
import { apiFetch } from '@/lib/api';

import { TrainerNotificationsResponseSchema, TrainerNotificationsTrainerNotificationMutationResponseSchema } from '@/app/frontend_trainer/trainer_account/account_notifications/schemas/TrainerAccountNotificationsNotificationsApiSchema';

import { TRAINER_NOTIFICATIONS_URLS } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';

import type { TrainerNotificationsApiResponse } from '@/app/frontend_trainer/trainer_account/account_notifications/types/TrainerAccountNotificationsNotificationsTypes';

import type { ApiResponse } from '@/lib/api';

/**
 * @description API functions for the Trainer Notifications module with canonical response validation.
 * @dependencies HTTP response → Zod schema → notification Query → UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerNotifications(page = 1, limit = 20): Promise<TrainerNotificationsApiResponse> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_NOTIFICATIONS_URLS.API.LIST_PAGINATED(page, limit));
  const response = TrainerNotificationsResponseSchema.parse(raw);
  if (!response.data) throw new Error(response.message);
  return { notifications: response.data.notifications };
}

/**
 * @description Owns markTrainerNotificationsTrainerNotificationRead behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function markTrainerNotificationsTrainerNotificationRead(id: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_NOTIFICATIONS_URLS.API.MARK_READ(id), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerNotificationsTrainerNotificationMutationResponseSchema.parse(raw);
  if (!response.success) throw new Error(response.message);
  return { message: response.message };
}

/**
 * @description Owns markTrainerNotificationsAllTrainerNotificationsRead behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function markTrainerNotificationsAllTrainerNotificationsRead(idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_NOTIFICATIONS_URLS.API.MARK_ALL_READ, { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerNotificationsTrainerNotificationMutationResponseSchema.parse(raw);
  if (!response.success) throw new Error(response.message);
  return { message: response.message };
}
