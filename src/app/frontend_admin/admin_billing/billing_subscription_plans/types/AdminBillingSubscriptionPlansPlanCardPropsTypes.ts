// RESPONSIBILITY: Defines feature-local TypeScript contracts for subscriptions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_subscriptions/subscriptions_plans/types/AdminSubscriptionsManagementPlanCardPropsTypes.ts)

// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { SaaSPlan } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/types/AdminBillingSubscriptionPlansTypes';

export interface AdminSubscriptionsPlanCardProps {
  plan: SaaSPlan;
  onUpgrade: (id: string, name: string) => void;
  upgrading: boolean;
}
