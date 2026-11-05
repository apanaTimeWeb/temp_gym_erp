// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin members module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryBranchReferenceTypes.ts)

export interface AdminMembersBranchReference { id: string; name: string; }
