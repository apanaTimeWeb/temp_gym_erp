import { describe, expect, it } from 'vitest';
import { MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_filter.constants';
import { ManagerSalesOverviewBuildMembershipFilterSearchParams } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewBuildMembershipFilterSearchParams';
import { resolveManagerSalesOverviewMembershipFilter } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewResolveMembershipFilter';

describe('Manager Sales membership filter URL state', () => {
  it('resolves stable filter IDs and defaults invalid values to All', () => {
    expect(resolveManagerSalesOverviewMembershipFilter('expiring-soon')).toBe(MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.EXPIRING_SOON);
    expect(resolveManagerSalesOverviewMembershipFilter('__proto__')).toBe(MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ALL);
  });
  it('preserves unrelated query parameters and resets pagination', () => {
    const params = new URLSearchParams(ManagerSalesOverviewBuildMembershipFilterSearchParams('view=all-memberships&search=anuj&page=4&range=this_month', MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ACTIVE));
    expect(params.get('membershipFilter')).toBe('active');
    expect(params.get('page')).toBe('1');
    expect(params.get('view')).toBe('all-memberships');
    expect(params.get('search')).toBe('anuj');
    expect(params.get('range')).toBe('this_month');
  });
});
