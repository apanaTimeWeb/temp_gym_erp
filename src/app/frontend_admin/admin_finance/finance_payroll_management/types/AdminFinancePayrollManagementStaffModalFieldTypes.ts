// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementStaffModalFieldTypes.ts)

import type { StaffFormValues } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';

export interface AdminFinancePayrollManagementStaffModalField {
  key: keyof StaffFormValues;
  labelKey: string;
  type: 'text' | 'email' | 'tel' | 'number';
  placeholder: string;
}
