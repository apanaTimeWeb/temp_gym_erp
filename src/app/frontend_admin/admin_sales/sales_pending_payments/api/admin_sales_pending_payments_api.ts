// RESPONSIBILITY: Typed API client for the Sales pending-payments listing only.
import { z } from 'zod';
import { ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_pending_payments/config/admin_sales_pending_payments.url_config';
import { pendingPaymentMemberSchema } from '@/app/frontend_admin/admin_sales/sales_pending_payments/schemas/AdminSalesPendingPaymentsSchemas';
import { adminSalesPendingPaymentsApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsApiResponse';
import type { PendingPaymentMember } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsTypes';
function buildQuery(params: Record<string, string | undefined> = {}): string { const query = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, value); }); const encoded = query.toString(); return encoded ? `?${encoded}` : ''; }
export const AdminSalesApi = { fetchPendingPayments: async (params: Record<string, string> = {}) => apiFetch<{ members: PendingPaymentMember[]; total: number }>(`${ADMIN_SALES_API.pendingPayments}${buildQuery(params)}`, { method: 'GET', dataSchema: z.object({ members: z.array(pendingPaymentMemberSchema), total: z.number().int().nonnegative() }) }) };
