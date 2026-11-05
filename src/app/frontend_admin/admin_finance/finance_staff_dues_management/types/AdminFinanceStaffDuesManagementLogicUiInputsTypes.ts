// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementLogicUiInputsTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminFinanceStaffDuesManagementLogicUiInputs {
  editId: string | null;
  setShowModal: (open: boolean) => void;
  setShowPayrollModal: (open: boolean) => void;
}
