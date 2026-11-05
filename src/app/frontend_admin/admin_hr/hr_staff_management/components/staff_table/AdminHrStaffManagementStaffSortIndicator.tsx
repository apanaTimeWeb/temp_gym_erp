"use client";
// RESPONSIBILITY: Renders the visual sort-direction indicator for the Admin HR staff table.
// DATA FLOW: feature data/state and user input → AdminHrManagementStaffSortIndicator → accessible UI/events routed to owning hooks (admin_hr/hr_staff_management/components/staff_table/AdminHrManagementStaffSortIndicator.tsx)

import type { AdminHrStaffSortIndicatorProps } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementStaffSortIndicatorPropsTypes';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementSortTypes';


/**
 * AdminHrManagementStaffSortIndicator renders the admin hr staff sort indicator UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrManagementStaffSortIndicator: Renders the visual sort-direction indicator for the Admin HR staff table.
 * @dependencies Consumes AdminHrStaffSortIndicatorPropsTypes, AdminHrSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrManagementStaffSortIndicator({ active, direction }: AdminHrStaffSortIndicatorProps) {
  if (!active) return <ChevronsUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-60"  size={18} strokeWidth={2}/>;
  return direction === 'asc' ? <ChevronUp aria-hidden="true" className="h-3.5 w-3.5"  size={18} strokeWidth={2}/> : <ChevronDown aria-hidden="true" className="h-3.5 w-3.5"  size={18} strokeWidth={2}/>;
}
