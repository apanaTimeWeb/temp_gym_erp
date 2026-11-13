import { MANAGER_INQUIRIES_PIPELINE_API } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/config/manager_inquiries_pipeline.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { inquirySchema, inquiryStatsSchema } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/schemas/manager_inquiries_pipeline.schemas';
import type { Inquiry, InquiryStats, ManagerInquiriesPipelineWritePayload } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';


/**
 * @description Provides the ManagerInquiriesPipelineApi implementation for the inquiries module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_schemas/ManagerInquiriesPipelineSchema; @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_url_config; @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_types/ManagerInquiriesPipelineTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerInquiriesPipelineApi = {
  fetchInquiries: async (params?: Record<string, string>): Promise<ApiResponse<{ inquiries: Inquiry[]; total: number }>> => {
    const q = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_INQUIRIES_PIPELINE_API.BASE}${q ? `?${q}` : ''}`, {
      dataSchema: z.object({ inquiries: z.array(inquirySchema), total: z.number() })
    });
  },
  
  fetchInquiryPlans: async (): Promise<ApiResponse<{name: string}[]>> => {
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.PLANS, { dataSchema: z.array(z.object({ name: z.string() })) });
  },

  fetchInquiryPlansSnapshot: async (): Promise<ApiResponse<{ id: string; name: string; price1Month: number; price3Month: number; price6Month: number; price12Month: number; priceCustom?: number }[]>> => {
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.PLANS_SNAPSHOT, { dataSchema: z.array(z.object({ id: z.string(), name: z.string(), price1Month: z.number().nonnegative(), price3Month: z.number().nonnegative(), price6Month: z.number().nonnegative(), price12Month: z.number().nonnegative(), priceCustom: z.number().nonnegative().optional() })) });
  },
  
  convertLead: async (id: string, body: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<{ memberId: string }>> => {
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.CONVERT(id), { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ memberId: z.string() }) });
  },
  
  fetchInquiryById: async (id: string): Promise<ApiResponse<Inquiry>> => {
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.GET_ONE(id), { dataSchema: inquirySchema });
  },
  
  fetchInquiryStats: async (params?: Record<string, string>): Promise<ApiResponse<InquiryStats>> => {
    const query = params && Object.keys(params).length ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`${MANAGER_INQUIRIES_PIPELINE_API.STATS}${query}`, { dataSchema: inquiryStatsSchema });
  },
  
  createInquiry: async (body: ManagerInquiriesPipelineWritePayload, idempotencyKey: string): Promise<ApiResponse<Inquiry>> => {
    const serializedBody = { ...body, ...(body.followUpLogs ? { followUpLogs: body.followUpLogs.map((log) => ({ ...log, date: log.date instanceof Date ? log.date.toISOString() : log.date })) } : {}) };
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.BASE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: inquirySchema });
  },
  
  updateInquiry: async (id: string, body: ManagerInquiriesPipelineWritePayload, idempotencyKey: string): Promise<ApiResponse<Inquiry>> => {
    const serializedBody = { ...body, ...(body.followUpLogs ? { followUpLogs: body.followUpLogs.map((log) => ({ ...log, date: log.date instanceof Date ? log.date.toISOString() : log.date })) } : {}) };
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: inquirySchema });
  },
  
  deleteInquiry: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_INQUIRIES_PIPELINE_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) });
  } };
