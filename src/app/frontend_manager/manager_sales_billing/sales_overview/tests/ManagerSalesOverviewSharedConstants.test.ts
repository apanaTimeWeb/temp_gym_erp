import { describe, expect, it } from 'vitest';

import { DATE_FILTERS, SALES_TABS, SALES_VIEW_IDS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_shared.constants';
import { ManagerSalesOverviewResolveView } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewResolveView';


describe('ManagerSalesOverviewSharedConstants', () => {
  it('keeps sales filters and tabs stable', () => {
    expect(DATE_FILTERS).toEqual(['Today', 'This Week', 'This Month', 'This Year', 'Custom']);
    expect(SALES_TABS).toContain('Pending Payments');
  });

  it('accepts only canonical view identifiers and safely defaults unknown values', () => {
    expect(SALES_VIEW_IDS).toEqual(['overview', 'membership-report', 'pending-payments', 'all-memberships']);
    expect(ManagerSalesOverviewResolveView('pending-payments', null)).toBe('pending-payments');
    expect(ManagerSalesOverviewResolveView('not-a-view', null)).toBe('overview');
  });

  it('preserves legacy tab bookmarks while resolving them to canonical views', () => {
    expect(ManagerSalesOverviewResolveView(null, 'Pending Payments')).toBe('pending-payments');
    expect(ManagerSalesOverviewResolveView(null, 'untrusted-value')).toBe('overview');
  });
});
