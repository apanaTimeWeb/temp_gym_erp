// RESPONSIBILITY: Defines feature-local TypeScript contracts for subscriptions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_subscriptions/subscriptions_overview/types/AdminSubscriptionsManagementErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminSubscriptionsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
