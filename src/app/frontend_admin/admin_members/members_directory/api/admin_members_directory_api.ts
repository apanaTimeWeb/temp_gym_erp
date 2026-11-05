// RESPONSIBILITY: API client for Admin Members module. All fetch calls go through apiFetch wrapper.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_members/members_directory/api/admin_members_directory_api.ts)

import type { FetchMembersParams } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryApiQueryTypes';
import { z } from 'zod';
import { ADMIN_MEMBERS_API } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';
import { adminMembersDirectoryApiFetch as apiFetch } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryApiResponse';
import type { AdminMember, AdminMembersSummary } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
import { adminMemberSchema, adminMembersSummarySchema } from '@/app/frontend_admin/admin_members/members_directory/schemas/AdminMembersDirectorySchemas';


export const AdminMembersApi = {
  fetchMembers: async (params: FetchMembersParams) => {
    const query = new URLSearchParams(Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => { if (value !== undefined) acc[key] = String(value); return acc; }, {})).toString();
    return apiFetch<AdminMember[]>(`${ADMIN_MEMBERS_API.list}${query ? '?' + query : ''}`, { method: 'GET', dataSchema: z.array(adminMemberSchema) });
  },
  fetchSummary: async (branchId?: string) => {
    const suffix = branchId ? `?branchId=${encodeURIComponent(branchId)}` : '';
    return apiFetch<AdminMembersSummary>(`${ADMIN_MEMBERS_API.summary}${suffix}`, { method: 'GET', dataSchema: adminMembersSummarySchema });
  },
  fetchMemberById: async (memberId: string) => {
    return apiFetch<AdminMember>(ADMIN_MEMBERS_API.detail(memberId), { method: 'GET', dataSchema: adminMemberSchema });
  },
  exportMembers: async (params: Omit<FetchMembersParams, 'page' | 'limit'>) => {
    const query = new URLSearchParams(
      Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
        if (value !== undefined && value !== '') acc[key] = String(value);
        return acc;
      }, {}),
    ).toString();
    return apiFetch<string>(
      `${ADMIN_MEMBERS_API.export}${query ? '?' + query : ''}`,
      { method: 'GET', dataSchema: z.string() },
    );
  },
};
