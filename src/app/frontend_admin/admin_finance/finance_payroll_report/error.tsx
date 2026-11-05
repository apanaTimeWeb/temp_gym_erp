"use client";
// RESPONSIBILITY: Route-segment error boundary for the reports feature; delegates safe fallback rendering and monitoring to the approved Admin infrastructure boundary.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_payroll_report/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_finance/finance_payroll_report/components/AdminFinancePayrollReportErrorFallback';
import type { AdminReportsErrorProps } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportErrorPropsTypes';

/**
 * AdminReportsError provides the route-level error boundary for the reports feature.
 * @dependencies Uses the approved shared AdminNavigationLayoutErrorFallback for sanitized UI, retry, permission handling, and monitoring.
 * @edge-case Raw backend/stack details are never rendered; retry remains available.
 */
export default function AdminReportsError({ error, reset }: AdminReportsErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="reports" />;
}
