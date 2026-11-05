// RESPONSIBILITY: Renders/orchestrates not-found within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the not-found component and its associated UI logic.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/config/superadmin_analytics_reports_center.url_config';


/**
 * @description Renders ReportsNotFound within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function ReportsNotFound() {
  const t = useTranslations('superadmin_analytics_reports');
    return (<div className="empty-state-container" data-testid="superadmin_analytics_reports-not-found-not-found-not-found">
      <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center">
        <span className="text-3xl font-bold text-secondary">{t('ui.404_4f4adcbf')}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary mb-1">{t('ui.report_not_found_1d333377')}</h2>
        <p className="text-secondary text-sm max-w-sm">
          {t('ui.the_report_you_are_looking_for_does_not_exis_45ea51ee')}</p>
      </div>
      <Link href={SUPERADMIN_ANALYTICS_REPORTS_CENTER_ROUTES.MAIN} className="px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11" data-testid="superadmin_analytics_reports-not-found-found-back-to-dashboard">
        {t('ui.back_to_dashboard_3649f1cc')}</Link>
    </div>);
}
