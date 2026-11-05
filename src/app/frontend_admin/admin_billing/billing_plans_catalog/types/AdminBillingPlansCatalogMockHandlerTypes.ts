// RESPONSIBILITY: Owns mock-handler input/output types for the Admin plans feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_plans/plans_catalog/types/AdminBillingPlansCatalogMockHandlerTypes.ts)

import type { Plan } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';

export type AdminPlansJsonObject = Record<string, unknown>;
export type PlanRecord = Plan;
