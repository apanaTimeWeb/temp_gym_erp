// RESPONSIBILITY: Owns typed API operations for finance_payments; it does not implement the global HTTP transport or backend authorization.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_payments/api/admin_finance_payments_api.ts)

import { adminFinancePaymentsApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsApiResponse';
import { ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/finance_payments/config/admin_finance_payments.url_config';
import type { Payment, FinanceSummary, Expense } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsTypes';
import { z } from 'zod';
import { paymentSchema, financeSummarySchema, expenseSchema } from '@/app/frontend_admin/admin_finance/finance_payments/schemas/AdminFinancePaymentsSchemas';
export const AdminFinanceApi = {
  fetchPayments: async (params?: Record<string, string>) => {
            const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => query.set(key, value));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<{ payments: Payment[]; total: number }>(`${ADMIN_FINANCE_API.payments}${suffix}`, { method: 'GET', dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() }) });
        },
  fetchSummary: async (branchId?: string, range?: string, dateRange?: { startDate?: string; endDate?: string }) => {
    const params = new URLSearchParams();
    if (branchId) params.set('branchId', branchId);
    if (range) params.set('range', range);
    if (dateRange?.startDate) params.set('startDate', dateRange.startDate);
    if (dateRange?.endDate) params.set('endDate', dateRange.endDate);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    return apiFetch<FinanceSummary>(`${ADMIN_FINANCE_API.summary}${suffix}`, { method: 'GET', dataSchema: financeSummarySchema });
  },
  fetchExpenses: async (params?: Record<string, string>) => {
          const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => query.set(key, value));
    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiFetch<{ expenses: Expense[]; total: number; totalAmount: number }>(`${ADMIN_FINANCE_API.expenses}${suffix}`, { method: 'GET', dataSchema: z.object({ expenses: z.array(expenseSchema), total: z.number(), totalAmount: z.number() }) });
      },
};
