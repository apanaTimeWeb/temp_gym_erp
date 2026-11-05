"use client";
// RESPONSIBILITY: Renders the visual sort-direction indicator for the Admin Finance payroll table.
// DATA FLOW: feature data/state and user input → AdminFinancePayrollManagementPayrollSortIndicator → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_management/components/payroll_table/AdminFinancePayrollManagementPayrollSortIndicator.tsx)

import type { AdminFinancePayrollManagementPayrollSortIndicatorProps } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementPayrollSortIndicatorPropsTypes';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AdminFinancePayrollManagementSortDirection } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementSortTypes';


/**
 * AdminFinancePayrollManagementPayrollSortIndicator renders the Finance PayrollManagement payroll sort indicator UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePayrollManagementPayrollSortIndicator: Renders the visual sort-direction indicator for the Admin Finance payroll table.
 * @dependencies Consumes AdminFinancePayrollManagementPayrollSortIndicatorPropsTypes, AdminFinancePayrollManagementSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePayrollManagementPayrollSortIndicator({ active, direction }: AdminFinancePayrollManagementPayrollSortIndicatorProps) {
  if (!active) return <ChevronsUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-60"  size={18} strokeWidth={2}/>;
  return direction === 'asc' ? <ChevronUp aria-hidden="true" className="h-3.5 w-3.5"  size={18} strokeWidth={2}/> : <ChevronDown aria-hidden="true" className="h-3.5 w-3.5"  size={18} strokeWidth={2}/>;
}
