// RESPONSIBILITY: Renders Superadmin Analytics Reports Cancellations Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { SuperadminAnalyticsReportsCancellationsPanel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/components/reports_center_tabs/SuperadminAnalyticsReportsCancellationsPanel';
import { SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_ROUTES as SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/config/superadmin_analytics_reports_cancellations.url_config';
import { useSuperadminAnalyticsReportsCancellationsPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/hooks/useSuperadminAnalyticsReportsCancellationsPage';

export function SuperadminAnalyticsReportsCancellationsMain() {
  const t = useTranslations('superadmin_analytics_reports');
  const query = useSuperadminAnalyticsReportsCancellationsPage();
  const data = query.data ?? [];

  return (
    <section className="space-y-5">
      <header className="relative overflow-hidden rounded-2xl border border-rose-500/35 bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FF5A1F]" />
        <h1 className="superadmin-page-title text-primary">{t('ui.reports_tab_cancellations')}</h1>
        <Link href={SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES_URL_CONTRACT.SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.DESTINATION_1} className="inline-flex min-h-10 items-center rounded-xl border border-border dark:border-white/15 bg-card/80 px-4 text-xs sm:text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary shrink-0">
          {t('ui.reports_amp_exports_63fb7a20')}
        </Link>
      </header>
      {(() => {
        if (query.isPending) return <div aria-busy="true" role="status" className="h-64 rounded-2xl border border-border bg-skeleton-base motion-safe:animate-pulse" />;
        if (query.isError) return <div className="rounded-2xl border border-danger/35 bg-danger-bg p-6 text-danger" role="alert"><p>{t('ui.reports_could_not_be_loaded_56a2a15d')}</p><button type="button" onClick={() => void query.refetch()} className="mt-2 min-h-10 underline cursor-pointer">{t('ui.retry_6327b4e5')}</button></div>;
        return <SuperadminAnalyticsReportsCancellationsPanel cancellationsData={data} filteredCancellationsData={data} totalCancelledRevenue={data.reduce((sum, row) => sum + row.mrr, 0)} avgDaysActive={data.length ? Math.round(data.reduce((sum, row) => sum + row.daysActive, 0) / data.length) : 0} />;
      })()}
    </section>
  );
}
