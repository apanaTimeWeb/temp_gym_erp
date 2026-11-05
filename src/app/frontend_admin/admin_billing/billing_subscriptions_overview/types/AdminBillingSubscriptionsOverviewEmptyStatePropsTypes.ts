// RESPONSIBILITY: Defines feature-local TypeScript contracts for subscriptions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_subscriptions/subscriptions_overview/types/AdminSubscriptionsManagementEmptyStatePropsTypes.ts)

export interface AdminSubscriptionsEmptyStateProps {
  title: string;
  description: string;
}
