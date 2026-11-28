// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewRecentOnboards within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the recent tenant onboarding records and navigates to the tenant detail page.

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Tooltip from '@/components/ui/Tooltip';

import { SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config';
import { getDashboardPlanBadgeClass } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview.constants';
import { formatDate } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';

import type { SuperadminDashboardRecentOnboardsProps } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

/**
 * @description Renders the recent tenant onboarding records and navigates to the tenant detail page.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 */
export function SuperadminDashboardOverviewRecentOnboards({ recentOnboards }: SuperadminDashboardRecentOnboardsProps) {
  const t = useTranslations('superadmin_dashboard');
  const locale = useLocale();
  const router = useRouter();
  return (
    <div className="relative overflow-hidden bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] border border-border dark:border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#FF5A1F]" />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-base font-bold text-primary">{t('ui.recent_onboards_bc6e20c')}</h2>
        <Link
          href="/frontend_superadmin/superadmin_gyms/gyms_directory"
          className="text-xs text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          title="View all gyms in directory"
        >
          {t('ui.view_all_gyms') ?? 'View All'}
        </Link>
      </div>
      {recentOnboards.length === 0 ? (
        <p className="rounded-xl border border-border dark:border-white/10 bg-page/60 p-6 text-center text-sm text-secondary" data-testid="superadmin-dashboard-recent-onboards-empty">
          {t('ui.no_recent_onboards')}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentOnboards.map((tenant) => {
            const planUpper = tenant.plan?.trim().toUpperCase() ?? 'UNKNOWN';
            const planClass = getDashboardPlanBadgeClass(tenant.plan);
            return (
              <button
                type="button"
                key={tenant.id}
                onClick={() => router.push(SUPERADMIN_DASHBOARD_OVERVIEW_ROUTES.GYM_DETAIL(tenant.id))}
                data-testid={`superadmin_dashboard-recent-onboards-${tenant.id}-open`}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-border dark:border-white/10 bg-page/70 dark:bg-white/[0.03] p-4 text-start hover:bg-surface-hover dark:hover:bg-white/[0.07] hover:border-orange-500/40 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <Tooltip content={tenant.name}><h3 className="text-sm font-semibold text-primary truncate">{tenant.name}</h3></Tooltip>
                  <Tooltip content={tenant.ownerName}><p className="text-xs text-secondary mt-1 truncate">{tenant.ownerName}</p></Tooltip>
                </div>
                <div className="ms-2 text-end flex flex-col items-end shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${planClass}`}>
                    {planUpper}
                  </span>
                  <p className="text-xs text-disabled mt-2">{formatDate(tenant.createdAt, locale)}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
