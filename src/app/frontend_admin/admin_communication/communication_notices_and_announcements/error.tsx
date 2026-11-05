"use client";
// RESPONSIBILITY: Route-segment error boundary for the announcements feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_communication/communication_notices_and_announcements/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/components/AdminCommunicationNoticesAndAnnouncementsErrorFallback';
import type { AdminAnnouncementsErrorProps } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsErrorPropsTypes';

/**
 * AdminAnnouncementsError provides the route-level error boundary for the announcements feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminAnnouncementsError({ error, reset }: AdminAnnouncementsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="announcements" />;
}
