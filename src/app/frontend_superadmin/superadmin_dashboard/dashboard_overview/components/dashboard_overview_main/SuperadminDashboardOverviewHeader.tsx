// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Dashboard Executive Obsidian Hero header with the local date filter. No API calls.
import { useTranslations } from 'next-intl';

import { SuperadminDashboardOverviewDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_date_filter_dropdown/SuperadminDashboardOverviewDateFilterDropdown';

/**
 * @description Renders the Dashboard header with the local date filter matching Trainer Executive Hero Card.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 */
export function SuperadminDashboardOverviewHeader() {
  const t = useTranslations('superadmin_dashboard');
  return (
    <section className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-[#38BDF8]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute left-1/3 -bottom-12 h-32 w-44 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-300 shadow-[0_2px_10px_rgba(255,90,31,0.16)]">
            <span className="h-2 w-2 rounded-full bg-orange-500 motion-safe:animate-pulse" aria-hidden="true" />
            Platform Operations &amp; SaaS HQ
          </span>
          <h1 className="superadmin-page-title text-primary">{t('ui.saas_overview_f778888')}</h1>
          <p className="text-secondary text-sm">
            {t('ui.monitor_the_health_and_growth_of_your_multi_tena_2604f3c')}
          </p>
        </div>
        <div className="w-full lg:w-auto shrink-0">
          <SuperadminDashboardOverviewDateFilterDropdown />
        </div>
      </div>
    </section>
  );
}
