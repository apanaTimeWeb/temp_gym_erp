import { MANAGER_MEMBERS_DIRECTORY_ROUTES } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_ROUTES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/config/manager_finance_payments_and_summary.url_config';
// RESPONSIBILITY: Owns Manager role-level destinations used by shell and cross-feature navigation; contains no API or business workflow logic.



/**
 * @description Central role navigation destinations for cross-feature links.
 * @dependencies Feature-owned URL configuration only.
 * @edge-case Keeps destination ownership at the role navigation boundary so feature URL configs contain only their own routes/API endpoints.
 */
export const MANAGER_NAVIGATION_DESTINATIONS = {
  MEMBERS: MANAGER_MEMBERS_DIRECTORY_ROUTES.PAGES.LIST,
  FINANCE: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_ROUTES.PAGES.LIST,
} as const;
