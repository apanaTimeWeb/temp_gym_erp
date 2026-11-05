// RESPONSIBILITY: Defines feature-local TypeScript contracts for members_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminMembersErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
