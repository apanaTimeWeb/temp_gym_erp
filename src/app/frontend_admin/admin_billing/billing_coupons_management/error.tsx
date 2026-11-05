"use client";
// RESPONSIBILITY: Route-segment error boundary for the coupons feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_coupons/coupons_management/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_billing/billing_coupons_management/components/AdminBillingCouponsManagementErrorFallback';
import type { AdminCouponsErrorProps } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementErrorPropsTypes';

/**
 * AdminCouponsError provides the route-level error boundary for the coupons feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminCouponsError({ error, reset }: AdminCouponsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="coupons" />;
}
