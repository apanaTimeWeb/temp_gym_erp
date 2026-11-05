// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementLogicUiInputsTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminFinanceSalaryAdvanceManagementLogicUiInputs {
  editId: string | null;
  setShowModal: (open: boolean) => void;
  setShowPayrollModal: (open: boolean) => void;
}
