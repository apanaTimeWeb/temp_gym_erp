"use client";
// RESPONSIBILITY: Route-segment error boundary for the gym health alerts feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_gym_health_alerts/gym_health_alerts_monitoring/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/components/AdminGymsHealthAlertsMonitoringErrorFallback';
import type { AdminGymHealthAlertsErrorProps } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringErrorPropsTypes';

/**
 * AdminGymHealthAlertsError provides the route-level error boundary for the gym health alerts feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminGymHealthAlertsError({ error, reset }: AdminGymHealthAlertsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="gym_health_alerts" />;
}
