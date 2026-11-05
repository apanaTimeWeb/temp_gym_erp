// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_summary; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_summary/types/AdminFinanceOverviewErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminFinanceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
