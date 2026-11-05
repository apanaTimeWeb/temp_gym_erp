"use client";
// RESPONSIBILITY: Route-segment error boundary for the notifications feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_notifications_center/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_communication/communication_notifications_center/components/AdminCommunicationNotificationsCenterErrorFallback';
import type { AdminNotificationsErrorProps } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterErrorPropsTypes';

/**
 * AdminNotificationsError provides the route-level error boundary for the notifications feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminNotificationsError({ error, reset }: AdminNotificationsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="notifications" />;
}
