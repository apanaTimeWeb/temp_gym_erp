// RESPONSIBILITY: Defines feature-local TypeScript contracts for branches_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_branches/branches_directory/types/AdminGymsBranchesDirectoryEmptyStatePropsTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminBranchesEmptyStateProps {
  onClearFilters: () => void;
}
