"use client";
// RESPONSIBILITY: Displays the active report section's independent loading/error/retry state.
// DATA FLOW: feature data/state and user input → AdminSalesMembershipGrowthReportAnalyticsSectionState → accessible UI/events routed to owning hooks (admin_sales/sales_membership_growth_report/components/main_view/AdminSalesMembershipGrowthReportAnalyticsSectionState.tsx)

import { useTranslations } from 'next-intl';
import type { AdminSalesMembershipGrowthReportSectionStateProps } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportSectionStatePropsTypes';


/**
 * @description AdminSalesMembershipGrowthReportAnalyticsSectionState renders the ReportsAnalyticsSectionState interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminSalesMembershipGrowthReportAnalyticsSectionState({ status, onRetry }: AdminSalesMembershipGrowthReportSectionStateProps) {
  const t = useTranslations();
  if (status === 'success') return null;
  if (status === 'pending') return <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-secondary" role="status" aria-live="polite" data-testid="reports-analytics-reports-analytics-section-state-status-region">{t('reports.admin_reports_main.loadingSection')}</div>;
  return <section className="space-y-3 rounded-xl border border-danger bg-danger-bg p-4" role="alert"><p className="text-sm text-danger">{t('reports.admin_reports_main.loadError')}</p><button type="button" onClick={() => void onRetry()} className="min-h-11 rounded-md border border-border bg-card px-3 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="reports-analytics-reports-analytics-section-state-on-retry">{t('reports.admin_reports_main.retry')}</button></section>;
}
