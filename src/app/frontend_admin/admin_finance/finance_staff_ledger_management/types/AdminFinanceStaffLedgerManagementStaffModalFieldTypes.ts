// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementStaffModalFieldTypes.ts)

import type { StaffFormValues } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';

export interface AdminFinanceStaffLedgerManagementStaffModalField {
  key: keyof StaffFormValues;
  labelKey: string;
  type: 'text' | 'email' | 'tel' | 'number';
  placeholder: string;
}
