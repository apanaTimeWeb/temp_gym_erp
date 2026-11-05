// RESPONSIBILITY: Owns module-local fixture or mock-state data for finance_plan_revenue_analytics; it does not persist production business entities.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_plan_revenue_analytics/mocks/fixtures/AdminFinancePlanRevenueAnalyticsMockFixtures.ts)

import type { PlanRevenueRecord } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';

export const MOCK_ADMIN_PLAN_REVENUE: PlanRevenueRecord[] = [
  {
    id: 'pr1',
    planName: 'Annual Pro',
    tier: 'Gold',
    totalRevenue: 2160000,
    activeSubscriptions: 120,
    newSignups: 15,
    renewalRate: 92.5
  },
  {
    id: 'pr2',
    planName: 'Quarterly Classic',
    tier: 'Silver',
    totalRevenue: 800000,
    activeSubscriptions: 200,
    newSignups: 40,
    renewalRate: 75.0
  },
  {
    id: 'pr3',
    planName: 'Monthly Basic',
    tier: 'Bronze',
    totalRevenue: 350000,
    activeSubscriptions: 350,
    newSignups: 85,
    renewalRate: 45.5
  }
];
