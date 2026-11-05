// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Dashboard header with the local date filter. No API calls.
import { useTranslations } from 'next-intl';

import { SuperadminDashboardOverviewDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_date_filter_dropdown/SuperadminDashboardOverviewDateFilterDropdown';



/**
 * @description Renders the Dashboard header with the local date filter. No API calls.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminDashboardOverviewHeader() {
  const t = useTranslations('superadmin_dashboard');
    return (<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="superadmin-page-title text-primary">{t('ui.saas_overview_f778888')}</h1>
        <p className="text-secondary mt-1 text-sm">
          
          {t('ui.monitor_the_health_and_growth_of_your_multi_tena_2604f3c')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <SuperadminDashboardOverviewDateFilterDropdown />
      </div>
    </div>);
}
