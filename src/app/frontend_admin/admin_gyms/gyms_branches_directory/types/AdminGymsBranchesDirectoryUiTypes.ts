// RESPONSIBILITY: Defines UI-only state types for the Admin Branches module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_branches/branches_directory/types/AdminGymsBranchesDirectoryUiTypes.ts)

export type DetailView = 'revenue' | 'expenses' | 'staff' | 'students';
export type AdminBranchesStatusFilter = 'all' | 'active' | 'inactive';
