import { MANAGER_PT_ASSIGNMENTS_API } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/config/manager_pt_assignments.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { ptDashboardKpisSchema, ptTrainerWorkloadSchema, ptPackageSchema, ptAssignmentSchema } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/schemas/manager_pt_assignments.schemas';
import type { PtPackage, PtAssignment, PtTrainerWorkload, PtDashboardKpis, CreatePtAssignmentPayload } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';


/**
 * @description Provides the ManagerPtAssignmentsApi implementation for the pt module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_schedule_personal_training/manager_pt_schemas/ManagerPtAssignmentsSchema; @/app/frontend_manager/manager_schedule_personal_training/manager_pt_url_config; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerPtAssignmentsApi = {
  fetchPtDashboardKpis: async (): Promise<ApiResponse<PtDashboardKpis>> => {
    return apiFetch(MANAGER_PT_ASSIGNMENTS_API.KPIS, { dataSchema: ptDashboardKpisSchema });
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    return apiFetch(MANAGER_PT_ASSIGNMENTS_API.WORKLOAD, { dataSchema: z.array(ptTrainerWorkloadSchema) });
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    return apiFetch(MANAGER_PT_ASSIGNMENTS_API.PACKAGES, { dataSchema: z.array(ptPackageSchema) });
  },

  fetchAssignments: async (params?: Record<string, string>): Promise<ApiResponse<import('@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types').PtAssignmentsResponse>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_PT_ASSIGNMENTS_API.ASSIGNMENTS}${query ? `?${query}` : ''}`, { dataSchema: z.object({ assignments: z.array(ptAssignmentSchema), total: z.number(), page: z.number(), limit: z.number() }) });
  },

  createAssignment: async (body: CreatePtAssignmentPayload, idempotencyKey: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(MANAGER_PT_ASSIGNMENTS_API.ASSIGNMENTS, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: ptAssignmentSchema });
  },

  markSessionComplete: async (assignmentId: string, idempotencyKey: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(MANAGER_PT_ASSIGNMENTS_API.COMPLETE_SESSION(assignmentId), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: ptAssignmentSchema });
  } };
