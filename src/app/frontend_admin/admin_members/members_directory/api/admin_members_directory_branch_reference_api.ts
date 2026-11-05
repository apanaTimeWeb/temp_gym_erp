// RESPONSIBILITY: Fetches minimal branch reference data for the Admin members module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_members/members_directory/api/admin_members_directory_branch_reference_api.ts)

import { adminMembersDirectoryApiFetch as apiFetch } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryApiResponse';
import { adminMembersBranchReferenceSchema } from '@/app/frontend_admin/admin_members/members_directory/schemas/AdminMembersDirectorySchemas';
import { ADMIN_MEMBERS_API } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';
import type { AdminMembersBranchReference } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryBranchReferenceTypes';
export const AdminMembersBranchReferenceApi = { fetchMemberBranchReferences: () => apiFetch<{ items: AdminMembersBranchReference[] }>(`${ADMIN_MEMBERS_API.branchReference}?consumer=members`, { method: 'GET', dataSchema: adminMembersBranchReferenceSchema }) };
