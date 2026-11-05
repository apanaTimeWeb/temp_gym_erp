// RESPONSIBILITY: Owns typed HTTP access for Admin blacklist queries and lifecycle mutations.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_blacklist/blacklist_management/api/admin_members_blacklist_management_api.ts)

import { z } from 'zod';
import { adminBlacklistManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_members/members_blacklist_management/utils/AdminMembersBlacklistManagementApiResponse';
import { ADMIN_BLACKLIST_API } from '@/app/frontend_admin/admin_members/members_blacklist_management/config/admin_members_blacklist_management.url_config';
import type { AdminBlacklistQueryParams, BlacklistFormValues, BlacklistKPIData, BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
import { blacklistKpiDataSchema, blacklistedMemberSchema } from '@/app/frontend_admin/admin_members/members_blacklist_management/schemas/AdminMembersBlacklistManagementSchemas';

/** Builds stable URL query parameters for the blacklist list contract. */
function buildQuery(params?: AdminBlacklistQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const AdminBlacklistApi = {
  fetchBlacklist: async (params?: AdminBlacklistQueryParams) => apiFetch<BlacklistedMember[]>(`${ADMIN_BLACKLIST_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(blacklistedMemberSchema) }),
  fetchKPIs: async () => apiFetch<BlacklistKPIData>(ADMIN_BLACKLIST_API.kpis, { method: 'GET', dataSchema: blacklistKpiDataSchema }),
  addToBlacklist: async (payload: BlacklistFormValues, idempotencyKey: string) => apiFetch<BlacklistedMember>(ADMIN_BLACKLIST_API.base, { method: 'POST', body: JSON.stringify(payload), dataSchema: blacklistedMemberSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  removeFromBlacklist: async (id: string, idempotencyKey: string) => apiFetch<null>(ADMIN_BLACKLIST_API.remove(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  toggleBlacklist: async (id: string, idempotencyKey: string) => apiFetch<BlacklistedMember>(ADMIN_BLACKLIST_API.detail(id), { method: 'PATCH', dataSchema: blacklistedMemberSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  propagateToAllBranches: async (id: string, idempotencyKey: string) => apiFetch<BlacklistedMember>(ADMIN_BLACKLIST_API.propagate(id), { method: 'PATCH', dataSchema: blacklistedMemberSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
};
