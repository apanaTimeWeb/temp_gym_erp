// RESPONSIBILITY: Renders Superadmin Analytics Reports Cancellations Main using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { SuperadminAnalyticsReportsCancellationsPanel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/components/reports_center_tabs/SuperadminAnalyticsReportsCancellationsPanel';
import { SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_ROUTES as SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/config/superadmin_analytics_reports_cancellations.url_config';
import { useSuperadminAnalyticsReportsCancellationsPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/hooks/useSuperadminAnalyticsReportsCancellationsPage';


export function SuperadminAnalyticsReportsCancellationsMain() {
 const t=useTranslations('superadmin_analytics_reports');
 const query=useSuperadminAnalyticsReportsCancellationsPage();
 const data=query.data??[];
 return <section className="space-y-6"><header><h1 className="superadmin-page-title text-primary">{t('ui.reports_tab_cancellations')}</h1>
 <Link href={SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES_URL_CONTRACT.SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.DESTINATION_1} className="mt-2 inline-flex min-h-11 items-center text-secondary underline focus-visible:ring-2 focus-visible:ring-primary">{t('ui.reports_amp_exports_63fb7a20')}</Link></header>
 {(() => { if (query.isPending) { return (<div aria-busy="true" role="status" className="h-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>); } if (query.isError) { return (<div className="rounded-xl bg-danger-bg p-6 text-danger" role="alert"><p>{t('ui.reports_could_not_be_loaded_56a2a15d')}</p><button type="button" onClick={()=>void query.refetch()} className="min-h-11 underline">{t('ui.retry_6327b4e5')}</button></div>); } return (<SuperadminAnalyticsReportsCancellationsPanel cancellationsData={data} filteredCancellationsData={data} totalCancelledRevenue={data.reduce((sum,row)=>sum+row.mrr,0)} avgDaysActive={data.length?Math.round(data.reduce((sum,row)=>sum+row.daysActive,0)/data.length):0}/>); })()}
 </section>;
}
