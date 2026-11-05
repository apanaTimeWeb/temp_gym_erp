// RESPONSIBILITY: Owns the typed HTTP contract for the Admin Branches list and branch-detail reads.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_branches/branches_directory/api/admin_gyms_branches_directory_api.ts)

import { adminBranchesDirectoryApiFetch as apiFetch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/utils/AdminGymsBranchesDirectoryApiResponse';
import { ADMIN_BRANCHES_API } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/config/admin_gyms_branches_directory.url_config';
import { branchSchema } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/schemas/AdminGymsBranchesDirectorySchemas';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';

export const AdminBranchesApi = {
  fetchBranches: async (params?: { range?: string; startDate?: string; endDate?: string }) => {
    const search = new URLSearchParams();
    if (params?.range) search.set('range', params.range);
    if (params?.startDate) search.set('startDate', params.startDate);
    if (params?.endDate) search.set('endDate', params.endDate);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiFetch<Branch[]>(`${ADMIN_BRANCHES_API.base}${suffix}`, { method: 'GET', dataSchema: branchSchema.array() });
  },
  fetchBranchDetail: async (branchId: string) =>
    apiFetch<Branch>(ADMIN_BRANCHES_API.detail(branchId), { method: 'GET', dataSchema: branchSchema }),
};
