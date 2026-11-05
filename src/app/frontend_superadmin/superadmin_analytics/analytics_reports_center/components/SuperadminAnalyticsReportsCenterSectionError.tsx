// RESPONSIBILITY: Renders the reports section sectionerror state.
'use client';
import { useTranslations } from 'next-intl';
import type { SuperadminAnalyticsReportsCenterSectionErrorProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center_section_error.types';
export default function SuperadminAnalyticsReportsCenterSectionError({ onRetry }: SuperadminAnalyticsReportsCenterSectionErrorProps) {
  const t = useTranslations('superadmin_analytics_reports');
  return <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert"><p className="font-medium text-danger">{t('ui.reports_could_not_be_loaded_56a2a15d')}</p><button type="button" onClick={onRetry} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>;
}
