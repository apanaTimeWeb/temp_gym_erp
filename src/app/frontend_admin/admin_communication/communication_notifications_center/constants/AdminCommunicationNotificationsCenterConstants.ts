// RESPONSIBILITY: Canonical constants discovery entry for the AdminNotifications feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_communication/communication_notifications_center/constants/AdminCommunicationNotificationsCenterConstants.ts)

/** Stable feature-local constants entry point; populated as documented static configuration is introduced. */
export const NOTIFICATIONS_CONSTANTS = {} as const;

export const NOTIFICATION_SEVERITY = { INFO: 'INFO', WARNING: 'WARNING', CRITICAL: 'CRITICAL' } as const;
