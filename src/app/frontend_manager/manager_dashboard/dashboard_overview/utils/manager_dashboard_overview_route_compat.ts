import { MANAGER_DASHBOARD_OVERVIEW_ROUTES } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';;

/**
 * Build the proposed leaf URL while preserving all query parameters supplied by
 * the existing Dashboard URL. The caller must pass the search string only;
 * fragments are client-only and are intentionally not inferred here.
 */
export function buildManagerDashboardOverviewHref(search: string | URLSearchParams = ''): string {
  const serialized = search instanceof URLSearchParams
    ? search.toString()
    : search.replace(/^\?/, '');
  const params = new URLSearchParams(serialized);
  const query = params.toString();
  return `${MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.OVERVIEW}${query ? `?${query}` : ''}`;
}
