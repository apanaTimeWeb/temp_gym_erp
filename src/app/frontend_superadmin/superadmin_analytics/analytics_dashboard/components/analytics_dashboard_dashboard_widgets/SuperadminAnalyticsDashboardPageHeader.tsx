// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardPageHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the analytics Executive Hero heading and feature-owned date-range control.
import { useTranslations } from 'next-intl';

import { SuperadminAnalyticsDashboardDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/analytics_dashboard_forms_and_filters/SuperadminAnalyticsDashboardDateFilterDropdown';

export function SuperadminAnalyticsDashboardPageHeader() {
  const t = useTranslations('superadmin_analytics');
  return (
    <header className="relative overflow-hidden rounded-2xl border border-sky-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-[#FF5A1F]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h1 className="superadmin-page-title text-primary">{t('ui.revenue_analytics_763da6e')}</h1>
          <p className="text-sm text-secondary">{t('ui.global_saas_metrics_and_financial_intelligence_34f7b50')}</p>
        </div>
        <div className="w-full lg:w-auto shrink-0">
          <SuperadminAnalyticsDashboardDateFilterDropdown />
        </div>
      </div>
    </header>
  );
}
