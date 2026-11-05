// RESPONSIBILITY: Defines feature-local TypeScript contracts for branches_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_branches/branches_directory/types/AdminGymsBranchesDirectoryErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminBranchesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
