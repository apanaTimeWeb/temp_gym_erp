// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementPayrollSortIndicatorPropsTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminFinancePayrollManagementSortDirection } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementSortTypes';
export interface AdminFinancePayrollManagementPayrollSortIndicatorProps {
  active: boolean;
  direction: AdminFinancePayrollManagementSortDirection;
}
