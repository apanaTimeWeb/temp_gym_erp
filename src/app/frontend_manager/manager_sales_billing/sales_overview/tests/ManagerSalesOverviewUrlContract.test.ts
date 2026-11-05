import { MANAGER_SALES_OVERVIEW_ROUTES, MANAGER_SALES_OVERVIEW_API } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_sales API URL contract', () => {
  it('matches the feature API contract for ALL_MEMBERSHIPS', () => { expect(MANAGER_SALES_OVERVIEW_API.ALL_MEMBERSHIPS).toBe("/api/v1/manager/sales/all-memberships"); });
  it('matches the feature API contract for MEMBERSHIP_REPORT', () => { expect(MANAGER_SALES_OVERVIEW_API.MEMBERSHIP_REPORT).toBe("/api/v1/manager/sales/membership-report"); });
  it('matches the feature API contract for OVERVIEW', () => { expect(MANAGER_SALES_OVERVIEW_API.OVERVIEW).toBe("/api/v1/manager/sales/overview"); });
  it('matches the feature API contract for PENDING_PAYMENTS', () => { expect(MANAGER_SALES_OVERVIEW_API.PENDING_PAYMENTS).toBe("/api/v1/manager/sales/pending-payments"); });
});

it('exposes canonical and legacy view query keys', () => { expect(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.VIEW).toBe('view'); expect(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.LEGACY_TAB).toBe('tab'); });
