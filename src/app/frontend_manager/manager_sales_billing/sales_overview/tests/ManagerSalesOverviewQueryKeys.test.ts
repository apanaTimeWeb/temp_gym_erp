import { describe, expect, it } from 'vitest';

import { ManagerSalesOverviewQueryKeys } from '@/app/frontend_manager/manager_sales_billing/sales_overview/api/manager_sales_overview.query_keys';

describe('manager_sales query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerSalesOverviewQueryKeys.all).toEqual(['manager_sales']);
  });
});
