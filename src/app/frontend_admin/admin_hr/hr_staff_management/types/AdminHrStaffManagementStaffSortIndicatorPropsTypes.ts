// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_staff_management/types/AdminHrManagementStaffSortIndicatorPropsTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementSortTypes';
export interface AdminHrStaffSortIndicatorProps {
  active: boolean;
  direction: AdminHrSortDirection;
}
