import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/config/manager_finance_payments_and_summary.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';



import { paymentSchema, financeSummarySchema } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/schemas/manager_finance_payments_and_summary.schemas';
import type { Payment, FinanceSummary, ManagerFinancePaymentsAndSummaryExportFormat } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary.types';


/**
 * @description Provides the ManagerFinancePaymentsAndSummaryApi implementation for the finance module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_finance_expenses/manager_finance_schemas/ManagerFinancePaymentsAndSummarySchema; @/app/frontend_manager/manager_finance_expenses/manager_finance_url_config; @/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits; @/app/frontend_manager/manager_finance_expenses/manager_finance_types/ManagerFinancePaymentsAndSummaryTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerFinancePaymentsAndSummaryApi = {
  fetchPayments: async (params?: Record<string, string>): Promise<ApiResponse<{ payments: Payment[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE}${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ payments: z.array(paymentSchema), total: z.number() })
    });
  },
  createPayment: async (body: Partial<Payment> & { amount?: number | string }, idempotencyKey: string): Promise<ApiResponse<Payment>> => {
    const payload = { ...body, amount: body.amount === undefined ? undefined : ManagerInfrastructureToManagerMinorUnits(body.amount) };
    return apiFetch(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BASE, { method: 'POST', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: paymentSchema });
  },
  fetchPaymentsByMember: async (memberId: string): Promise<ApiResponse<Payment[]>> => {
    return apiFetch(MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.PAYMENTS_BY_MEMBER(memberId), { dataSchema: z.array(paymentSchema) });
  },
  fetchFinanceSummary: async (params?: Record<string, string>): Promise<ApiResponse<FinanceSummary>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.SUMMARY}${q ? `?${q}` : ''}`, { dataSchema: financeSummarySchema });
  },
  exportPaymentsReport: async (format: ManagerFinancePaymentsAndSummaryExportFormat): Promise<ApiResponse<{ url: string }>> => {
    return apiFetch(`${MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API.EXPORT}?format=${format}`, { dataSchema: z.object({ url: z.string() }) });
  } };
