"use client";
// RESPONSIBILITY: Route-segment error boundary for the profile feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_profile/profile_overview/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_profile/profile_overview/components/AdminProfileOverviewErrorFallback';
import type { AdminProfileErrorProps } from '@/app/frontend_admin/admin_profile/profile_overview/types/AdminProfileOverviewErrorPropsTypes';

/**
 * AdminProfileError provides the route-level error boundary for the profile feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminProfileError({ error, reset }: AdminProfileErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="profile" />;
}
