// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewRecentOnboards within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the recent tenant onboarding records and navigates to the tenant detail page.


import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import Tooltip from '@/components/ui/Tooltip';

import { SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config';
import { getDashboardPlanBadgeClass } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { formatDate } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';

import type { SuperadminDashboardRecentOnboardsProps } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


/**
 * @description Renders the recent tenant onboarding records and navigates to the tenant detail page.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminDashboardOverviewRecentOnboards({ recentOnboards }: SuperadminDashboardRecentOnboardsProps) {
  const t = useTranslations('superadmin_dashboard');
    const locale = useLocale();
    const router = useRouter();
    return (<div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <h2 className="text-base font-semibold text-primary mb-6">{t('ui.recent_onboards_bc6e20c')}</h2>
      {recentOnboards.length === 0 ? <p className="rounded-lg border border-border bg-page p-6 text-center text-sm text-secondary" data-testid="superadmin-dashboard-recent-onboards-empty">{t('ui.no_recent_onboards')}</p> : <div className="space-y-4">
        {recentOnboards.map((tenant) => {
            const planUpper = tenant.plan?.trim().toUpperCase() ?? 'UNKNOWN';
            const planClass = getDashboardPlanBadgeClass(tenant.plan);
            return (<button type="button" key={tenant.id} onClick={() => router.push(SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES.GYM_DETAIL(tenant.id))} data-testid={`superadmin_dashboard-recent-onboards-${tenant.id}-open`} className="flex w-full items-center justify-between rounded-lg border border-border bg-page p-4 text-start hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              <div className="min-w-0 flex-1">
                <Tooltip content={tenant.name}><h3 className="text-sm font-semibold text-primary truncate">{tenant.name}</h3></Tooltip>
                <Tooltip content={tenant.ownerName}><p className="text-xs text-secondary mt-1 truncate">{tenant.ownerName}</p></Tooltip>
              </div>
              <div className="ms-3 text-end flex flex-col items-end shrink-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${planClass}`}>
                  {planUpper}
                </span>
                <p className="text-xs text-disabled mt-2">{formatDate(tenant.createdAt, locale)}</p>
              </div>
            </button>);
        })}
      </div>}
    </div>);
}
