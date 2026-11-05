// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminFinanceStaffLedgerManagementErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
