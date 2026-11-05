import { Suspense } from 'react';
import { SuperadminAnalyticsReportsCancellationsMain } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/components/SuperadminAnalyticsReportsCancellationsMain';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Analytics Reports Cancellations | Superadmin' };
export default function Page() { return <Suspense fallback={<div className="min-h-64 rounded-xl border border-border bg-card p-6" aria-busy="true" role="status"><div className="h-8 w-64 rounded bg-skeleton-base motion-safe:animate-pulse"/></div>}><SuperadminAnalyticsReportsCancellationsMain/></Suspense>; }
