"use client";
// RESPONSIBILITY: Route-segment error boundary for the members feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_members/members_directory/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_members/members_directory/components/AdminMembersDirectoryErrorFallback';
import type { AdminMembersErrorProps } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryErrorPropsTypes';

/**
 * AdminMembersError provides the route-level error boundary for the members feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminMembersError({ error, reset }: AdminMembersErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="members" />;
}
