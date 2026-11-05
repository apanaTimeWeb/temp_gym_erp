// RESPONSIBILITY: Defines feature-local TypeScript contracts for plans_catalog; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_plans/plans_catalog/types/AdminBillingPlansCatalogToolbarPropsTypes.ts)

// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { PlansContextType } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';

export interface AdminPlansToolbarProps {
  logic: PlansContextType;
}
