// RESPONSIBILITY: Defines feature-local TypeScript contracts for plans_catalog; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_plans/plans_catalog/types/AdminBillingPlansCatalogErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminPlansErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
