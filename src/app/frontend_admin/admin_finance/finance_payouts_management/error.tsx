"use client";
// RESPONSIBILITY: Route-segment error boundary for the payouts feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_payouts_management/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_finance/finance_payouts_management/components/AdminFinancePayoutsManagementErrorFallback';
import type { AdminPayoutsErrorProps } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementErrorPropsTypes';

/**
 * AdminPayoutsError provides the route-level error boundary for the payouts feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminPayoutsError({ error, reset }: AdminPayoutsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="payouts" />;
}
