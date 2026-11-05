// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin notifications feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.

import { MOCK_ADMIN_NOTIFICATIONS } from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockFixtures';
import type { AdminNotification } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes';

/**
 * cloneNotifications is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function cloneNotifications(records: AdminNotification[]): AdminNotification[] {
  return records.map((record) => ({ ...record }));
}

let adminNotificationsMockState = cloneNotifications(MOCK_ADMIN_NOTIFICATIONS);

/**
 * getAdminNotificationsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminNotificationsMockState(): AdminNotification[] {
  return adminNotificationsMockState;
}

/**
 * resetAdminNotificationsMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function setAdminNotificationsMockState(records: AdminNotification[]): void {
  adminNotificationsMockState = cloneNotifications(records);
}

export function resetAdminNotificationsMockState(): void {
  adminNotificationsMockState = cloneNotifications(MOCK_ADMIN_NOTIFICATIONS);
}
