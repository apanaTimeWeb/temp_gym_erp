// RESPONSIBILITY: Defines feature-local TypeScript contracts for coupons_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_coupons/coupons_management/types/AdminBillingCouponsManagementErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminCouponsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
