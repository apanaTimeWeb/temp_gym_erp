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
    <>
      
      <div className="min-w-0 p-4 sm:p-6 space-y-6">
        <div className="min-w-0 flex flex-col sm:flex-row justify-between mb-2 gap-3 items-stretch sm:items-center w-full">
          <h1 className="text-2xl font-bold text-text-primary">{t('COPY_DASHBOARD')}</h1>
          <ManagerDashboardOverviewDateFilterDropdown  data-testid="manager_dashboard-managerdashboardmain-dashboard-date-filter-dropdown-1"/>
        </div>
        <ManagerDashboardOverviewKPIs />
        
        {/* CRITICAL FIX: Missing Business Charts */}
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-6">
          <ManagerDashboardOverviewRevenueChart />
          <ManagerDashboardOverviewMemberGrowthChart />
        </div>

        <div className="grid min-w-0 grid-cols-1 xl:grid-cols-3 gap-6">
          <ManagerDashboardOverviewRecentMembers />
          <div className="space-y-4">
            <ManagerDashboardOverviewPendingPayments />
            <ManagerDashboardOverviewExpiringMemberships />
            <ManagerDashboardOverviewPromoCard />
          </div>
        </div>
        <ManagerDashboardOverviewMembershipDistribution />
      </div>
    </>
  );
}
