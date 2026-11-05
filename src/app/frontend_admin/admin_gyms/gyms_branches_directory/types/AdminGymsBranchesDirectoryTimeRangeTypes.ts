// RESPONSIBILITY: Defines feature-local TypeScript contracts for branches_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_branches/branches_directory/types/AdminGymsBranchesDirectoryTimeRangeTypes.ts)

export type AdminBranchesTimeRange = 'weekly' | 'monthly' | 'yearly' | 'custom';
