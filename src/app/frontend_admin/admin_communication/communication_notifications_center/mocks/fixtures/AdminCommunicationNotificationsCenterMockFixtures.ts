// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin notifications feature.
import { NOTIFICATION_SEVERITY } from '@/app/frontend_admin/admin_communication/communication_notifications_center/constants/AdminCommunicationNotificationsCenterConstants';

// RESPONSIBILITY: Provides MSW fixture data for Admin Notifications
import type { AdminNotification } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterTypes';

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', title: 'Payment received', body: 'Payment received for Invoice #1245.', severity: NOTIFICATION_SEVERITY.INFO, read: false, createdAt: '2026-09-16T12:00:00Z' },
  { id: 'n2', title: 'Membership expiring', body: '12 memberships expire within the next 7 days.', severity: NOTIFICATION_SEVERITY.WARNING, read: false, createdAt: '2026-09-16T10:30:00Z' },
  { id: 'n3', title: 'System backup completed', body: 'The scheduled system backup completed successfully.', severity: NOTIFICATION_SEVERITY.INFO, read: true, createdAt: '2026-09-16T08:00:00Z' },
  { id: 'n4', title: 'High-severity audit event', body: 'A permission change was recorded in the audit log.', severity: NOTIFICATION_SEVERITY.CRITICAL, read: true, createdAt: '2026-09-15T16:30:00Z' },
];
