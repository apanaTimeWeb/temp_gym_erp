// RESPONSIBILITY: Renders ManagerDashboardOverviewMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import ManagerDashboardOverviewDateFilterDropdown from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewDateFilterDropdown';
import ManagerDashboardOverviewExpiringMemberships from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewExpiringMemberships';
import ManagerDashboardOverviewKPIs from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewKPIs';
import { ManagerDashboardOverviewSkeleton } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewSkeleton';
import ManagerDashboardOverviewMemberGrowthChart from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewMemberGrowthChart';
import ManagerDashboardOverviewMembershipDistribution from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewMembershipDistribution';
import ManagerDashboardOverviewPendingPayments from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewPendingPayments';
import ManagerDashboardOverviewPromoCard from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewPromoCard';
import ManagerDashboardOverviewRecentMembers from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewRecentMembers';
import ManagerDashboardOverviewRevenueChart from '@/app/frontend_manager/manager_dashboard/dashboard_overview/components/ManagerDashboardOverviewRevenueChart';
import { useDashboardStatsQuery } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewQueries';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';



/** @description Renders the ManagerDashboardOverviewMain component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (15 documented module/import dependencies).. @edge-case Preserves error state. */
/**
 * @description Orchestrates the Manager Dashboard route by assembling feature-local sections and passing their documented state/handlers. It does not own API calls or business calculations.
 * @dependencies Consumes the dashboard query/logic layer and approved zero-business shell primitives.
 * @edge-case Preserves dashboard loading, empty, error, retry, and responsive section composition.
 */
export default function ManagerDashboardOverviewMain() {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range, startDate, endDate } = useManagerDashboardOverviewUrlState();
  const dashboardParams = { range, ...(range === 'custom' && startDate ? { startDate } : {}), ...(range === 'custom' && endDate ? { endDate } : {}) };
  const { data: stats, isPending, isError, error, refetch } = useDashboardStatsQuery(dashboardParams);

  if (isPending && !stats) return <ManagerDashboardOverviewSkeleton />;

  if (isError) return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p data-testid="manager_dashboard-manager-dashboard-main-status" role="alert" className="font-medium text-danger-text">{ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR'))}</p>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "mt-3 px-4 py-2 rounded-md bg-primary text-on-primary font-medium motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-main-button-refresh"
          type="button"
          onClick={() => refetch()}
          
        >{t("COPY_RETRY")}</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-full pb-10 bg-page trainer-aurora-canvas text-text-primary">
      <div className="min-w-0 p-4 sm:p-6 space-y-5">
        {/* Executive Colorful Header Card (matching Trainer) */}
        <section className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card space-y-3">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-[#38BDF8]" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/3 -bottom-12 h-32 w-44 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-300 shadow-[0_2px_10px_rgba(255,90,31,0.16)]">
                <span className="h-2 w-2 rounded-full bg-orange-500 motion-safe:animate-pulse" aria-hidden="true" />
                Branch Operations &amp; Executive Hub
              </span>
              <h1 className="text-page-title font-extrabold text-text-primary">{t('COPY_DASHBOARD')}</h1>
              <p className="text-sm text-secondary">Monitor branch revenue, member growth, attendance, and operational KPIs in real time.</p>
            </div>
            <div className="w-full lg:w-auto shrink-0">
              <ManagerDashboardOverviewDateFilterDropdown data-testid="manager_dashboard-managerdashboardmain-dashboard-date-filter-dropdown-1" />
            </div>
          </div>
        </section>

        <ManagerDashboardOverviewKPIs />
        
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-5">
          <ManagerDashboardOverviewRevenueChart />
          <ManagerDashboardOverviewMemberGrowthChart />
        </div>

        <div className="grid min-w-0 grid-cols-1 xl:grid-cols-3 gap-5">
          <ManagerDashboardOverviewRecentMembers />
          <div className="space-y-4 min-w-0">
            <ManagerDashboardOverviewPendingPayments />
            <ManagerDashboardOverviewExpiringMemberships />
            <ManagerDashboardOverviewPromoCard />
          </div>
        </div>
        <ManagerDashboardOverviewMembershipDistribution />
      </div>
    </div>
  );
}
