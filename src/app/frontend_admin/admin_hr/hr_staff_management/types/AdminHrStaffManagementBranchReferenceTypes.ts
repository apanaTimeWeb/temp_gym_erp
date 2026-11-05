// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin hr module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_staff_management/types/AdminHrManagementBranchReferenceTypes.ts)

export interface AdminHrBranchReference { id: string; name: string; location?: string; }
