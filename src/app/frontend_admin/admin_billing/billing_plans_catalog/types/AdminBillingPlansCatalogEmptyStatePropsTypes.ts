// RESPONSIBILITY: Defines feature-local TypeScript contracts for plans_catalog; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_plans/plans_catalog/types/AdminBillingPlansCatalogEmptyStatePropsTypes.ts)

export interface AdminPlansEmptyStateProps {
  title: string;
  description: string;
}
