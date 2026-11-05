// RESPONSIBILITY: Defines feature-local TypeScript contracts for members_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryEmptyStatePropsTypes.ts)

export interface AdminMembersEmptyStateProps {
  hasFilters: boolean;
}
