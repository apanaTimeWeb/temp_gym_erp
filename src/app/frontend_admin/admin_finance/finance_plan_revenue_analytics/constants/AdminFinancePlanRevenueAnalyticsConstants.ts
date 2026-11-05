// RESPONSIBILITY: Defines feature-local constants and query-key contracts for finance_plan_revenue_analytics; it does not contain mutable server data.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_plan_revenue_analytics/constants/AdminFinancePlanRevenueAnalyticsConstants.ts)

import type { RevenuePeriod } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
export const REVENUE_PERIOD_OPTIONS: { labelKey: string; value: RevenuePeriod }[] = [
  { labelKey: 'plans.static.this_month', value: 'THIS_MONTH' }, { labelKey: 'plans.static.last_month', value: 'LAST_MONTH' },
  { labelKey: 'plans.static.this_quarter', value: 'THIS_QUARTER' }, { labelKey: 'plans.static.this_year', value: 'THIS_YEAR' },
];
export const REVENUE_TABLE_HEADERS = [
  { key: 'planName', labelKey: 'plans.static.plan_name', sortable: true }, { key: 'tier', labelKey: 'plans.static.tier', sortable: true },
  { key: 'activeSubscriptions', labelKey: 'plans.static.active_subs', sortable: true }, { key: 'newSignups', labelKey: 'plans.static.new_signups', sortable: true },
  { key: 'renewalRate', labelKey: 'plans.static.renewal_rate', sortable: true }, { key: 'totalRevenue', labelKey: 'plans.static.total_revenue', sortable: true },
] as const;
export const PLANS_ITEMS_PER_PAGE = 10;
