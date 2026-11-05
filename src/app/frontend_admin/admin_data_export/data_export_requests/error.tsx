"use client";
// RESPONSIBILITY: Route-segment error boundary for the data export feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_data_export/data_export_requests/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_data_export/data_export_requests/components/AdminDataExportRequestsErrorFallback';
import type { AdminDataExportErrorProps } from '@/app/frontend_admin/admin_data_export/data_export_requests/types/AdminDataExportRequestsErrorPropsTypes';

/**
 * AdminDataExportError provides the route-level error boundary for the data export feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminDataExportError({ error, reset }: AdminDataExportErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="data_export" />;
}
