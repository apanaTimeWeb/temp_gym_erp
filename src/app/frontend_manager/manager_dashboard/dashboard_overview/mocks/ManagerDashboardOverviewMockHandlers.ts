import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MANAGER_DASHBOARD_OVERVIEW_API } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';;

import { MOCK_DASHBOARD_STATS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/ManagerDashboardOverviewMockData';


/**
 * @description Provides the ManagerDashboardOverviewMockHandlers implementation for the dashboard module.
 * @dependencies @/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/ManagerDashboardOverviewMockData; @/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerDashboardHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_DASHBOARD_OVERVIEW_API.STATS), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('recentMembersSearch') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('recentMembersPage') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('recentMembersLimit') || '5'), 1);
    const filtered = MOCK_DASHBOARD_STATS.recentMembers.filter((member) => {
      const planName = typeof member.plan === 'string' ? member.plan : member.plan.name;
      return !search || member.name.toLowerCase().includes(search) || planName.toLowerCase().includes(search);
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({
      success: true,
      message: 'Stats fetched successfully',
      data: { ...MOCK_DASHBOARD_STATS, recentMembers: filtered.slice(start, start + limit), totalRecentMembers: filtered.length },
      requestId: 'mock-dashboard-stats'
    });
  })
];
