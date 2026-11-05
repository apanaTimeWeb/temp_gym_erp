// RESPONSIBILITY: Typed API client for Sales all-memberships listing/count queries only.
import { z } from 'zod';
import { ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_memberships/config/admin_sales_memberships.url_config';
import { memberSchema } from '@/app/frontend_admin/admin_sales/sales_memberships/schemas/AdminSalesMembershipsSchemas';
import { adminSalesMembershipsApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsApiResponse';
import type { Member } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';
function buildQuery(params: Record<string, string | undefined> = {}): string { const query = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, value); }); const encoded = query.toString(); return encoded ? `?${encoded}` : ''; }
export const AdminSalesApi = { fetchAllMemberships: async (params: Record<string, string> = {}) => apiFetch<{ members: Member[]; total: number }>(`${ADMIN_SALES_API.allMemberships}${buildQuery(params)}`, { method: 'GET', dataSchema: z.object({ members: z.array(memberSchema), total: z.number().int().nonnegative() }) }) };
