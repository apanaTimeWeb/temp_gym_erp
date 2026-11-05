// RESPONSIBILITY: Owns deterministic mock-only Sales response multipliers and mock pagination defaults.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_sales/sales_store_sales/mocks/fixtures/AdminSalesAnalyticsMockConstants.ts)

export const SALES_MOCK_RANGE_MULTIPLIERS = {
  today: 0.2,
  this_week: 0.55,
  this_month: 1,
  this_year: 12,
  custom: 1.1,
} as const;

export const SALES_MOCK_SINGLE_BRANCH_MULTIPLIER = 0.75;
