// RESPONSIBILITY: Orchestrates four feature-local single-chart sections.
'use client';
import SuperadminDashboardGrowthChart from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewGrowthChart';
import SuperadminDashboardRevenueByGeographyChart from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewRevenueByGeographyChart';
import SuperadminDashboardRevenueByTierChart from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewRevenueByTierChart';
import SuperadminDashboardRevenueChart from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/components/dashboard_overview_main/SuperadminDashboardOverviewRevenueChart';

import type { SuperadminDashboardChartsProps } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


/** Orchestrates four feature-local single-chart sections. */
export function SuperadminDashboardOverviewCharts({ metrics, revenueChartData, growthChartData, timeMultiplier, mrrLabel }: SuperadminDashboardChartsProps) {
  return <><SuperadminDashboardRevenueChart data={revenueChartData} metrics={metrics} multiplier={timeMultiplier} title={mrrLabel}/><SuperadminDashboardGrowthChart data={growthChartData}/><SuperadminDashboardRevenueByTierChart metrics={metrics} multiplier={timeMultiplier}/><SuperadminDashboardRevenueByGeographyChart metrics={metrics} multiplier={timeMultiplier}/></>;
}
