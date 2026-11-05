"use client";
// RESPONSIBILITY: Route-segment error boundary for the usage feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_usage/usage_analytics/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/AdminBillingUsageAnalyticsErrorFallback';
import type { AdminUsageErrorProps } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsErrorPropsTypes';

/**
 * AdminUsageError provides the route-level error boundary for the usage feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminUsageError({ error, reset }: AdminUsageErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="usage" />;
}
