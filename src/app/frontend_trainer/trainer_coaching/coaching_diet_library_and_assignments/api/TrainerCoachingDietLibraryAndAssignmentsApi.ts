// RESPONSIBILITY: Provides strongly typed network calls for the Trainer Diet Library feature.
// DATA FLOW: Library URL contract → apiFetch → canonical response schema → TanStack Query/UI.
import { apiFetch } from '@/lib/api';

import { TrainerLibraryDietPlansResponseSchema, TrainerLibraryAssignedMembersResponseSchema, TrainerLibraryMutationResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/schemas/TrainerCoachingDietLibraryAndAssignmentsApiSchema';

import { TRAINER_LIBRARY_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/trainer_coaching_diet_library_and_assignments.url_config';

import type { ApiResponse } from '@/lib/api';

class TrainerLibraryApiError extends Error {
  constructor(message: string, readonly errorCode: string, readonly statusCode: number) {
    super(message);
    this.name = 'TrainerLibraryApiError';
  }
}






export const TrainerLibraryApi = {
  fetchDietPlans: async (params?: Record<string, string>) => {
    const query = params ? new URLSearchParams(params).toString() : '';
    const url = query ? `${TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE}?${query}` : TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE;
    const raw = await apiFetch<ApiResponse<unknown>>(url);
    const response = TrainerLibraryDietPlansResponseSchema.parse(raw);
    if (!response.data) throw new Error(response.message);
    return { data: response.data, message: response.message };
  },
  fetchAssignedMembers: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.ASSIGNED_MEMBERS);
    const response = TrainerLibraryAssignedMembersResponseSchema.parse(raw);
    if (!response.data) throw new Error(response.message);
    return response.data;
  },
  assignDietPlan: async (memberId: string, dietPlanId: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.ASSIGN_DIET(memberId), {
      method: 'PATCH', body: JSON.stringify({ dietPlanId }), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = TrainerLibraryMutationResponseSchema.parse(raw);
    if (!response.success) throw new TrainerLibraryApiError(response.message, response.errorCode, response.statusCode);
    return { data: response.data, message: response.message };
  },
  createDietPlan: async (data: Record<string, unknown>, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE, {
      method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = TrainerLibraryMutationResponseSchema.parse(raw);
    if (!response.success) throw new TrainerLibraryApiError(response.message, response.errorCode, response.statusCode);
    return { data: response.data, message: response.message };
  },
  updateDietPlan: async (id: string, data: Record<string, unknown>, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.DIET_PLAN_MUTATION(id), {
      method: 'PATCH', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = TrainerLibraryMutationResponseSchema.parse(raw);
    if (!response.success) throw new TrainerLibraryApiError(response.message, response.errorCode, response.statusCode);
    return { data: response.data, message: response.message };
  },
  requestDietPlanDeletion: async (id: string, reason: string, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_LIBRARY_URLS.API.REQUEST_DELETION(id), {
      method: 'POST', body: JSON.stringify({ reason }), headers: { 'Idempotency-Key': idempotencyKey },
    });
    const response = TrainerLibraryMutationResponseSchema.parse(raw);
    if (!response.success) throw new TrainerLibraryApiError(response.message, response.errorCode, response.statusCode);
    return { data: response.data, message: response.message };
  },
};
