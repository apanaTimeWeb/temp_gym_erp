import { describe, expect, it } from 'vitest';

import { MANAGER_SALES_OVERVIEW_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_date_filter.constants';


describe('ManagerSalesOverviewDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_SALES_OVERVIEW_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
