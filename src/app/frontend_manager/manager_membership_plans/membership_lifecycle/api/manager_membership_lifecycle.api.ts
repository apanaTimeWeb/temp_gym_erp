import { MANAGER_MEMBERSHIP_LIFECYCLE_API } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/config/manager_membership_lifecycle.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { managerPlansChangeRequestResponseSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle_change_request.schemas';
import { managerPlansMembershipOverviewSchema, managerPlansActionResponseSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle_membership.schemas';
import { planSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle.schemas';
import type { ManagerMembershipLifecycleChangeRequestPayload, ManagerMembershipLifecycleChangeRequestResponse } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_change_request.types';
import type { ManagerMembershipLifecycleMembershipOverview, ManagerMembershipLifecycleActivatePayload, ManagerMembershipLifecycleRenewPayload, ManagerMembershipLifecycleFreezePayload } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_membership.types';
import type { Plan } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';


/**
 * @description Provides the ManagerMembershipLifecycleApi implementation for the plans module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_membership_plans/manager_plans_schemas/ManagerMembershipLifecycleChangeRequestSchema; @/app/frontend_manager/manager_membership_plans/manager_plans_schemas/ManagerMembershipLifecycleMembershipSchema; @/app/frontend_manager/manager_membership_plans/manager_plans_schemas/ManagerMembershipLifecycleSchema; @/app/frontend_manager/manager_membership_plans/manager_plans_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerMembershipLifecycleApi = {
  fetchPlans: async (params?: Record<string, string>): Promise<ApiResponse<{ plans: Plan[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ plans: z.array(planSchema), total: z.number() }) });
  },
  fetchPlanById: async (id: string): Promise<ApiResponse<Plan>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.GET_ONE(id), { dataSchema: planSchema }),
  createPlan: async (body: Partial<Plan>, idempotencyKey: string): Promise<ApiResponse<Plan>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: planSchema }),
  updatePlan: async (id: string, body: Partial<Plan>, idempotencyKey: string): Promise<ApiResponse<Plan>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: planSchema }),
  deletePlan: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ id: z.string() }) }),
  createChangeRequest: async (body: ManagerMembershipLifecycleChangeRequestPayload, idempotencyKey: string): Promise<ApiResponse<ManagerMembershipLifecycleChangeRequestResponse>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.CHANGE_REQUESTS, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansChangeRequestResponseSchema }),
  fetchMembershipOverview: async (): Promise<ApiResponse<ManagerMembershipLifecycleMembershipOverview>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_OVERVIEW, { dataSchema: managerPlansMembershipOverviewSchema }),
  activateMembership: async (body: ManagerMembershipLifecycleActivatePayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_ACTIVATE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
  renewMembership: async (body: ManagerMembershipLifecycleRenewPayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_RENEW, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
  freezeMembership: async (body: ManagerMembershipLifecycleFreezePayload, idempotencyKey: string): Promise<ApiResponse<Record<string, never>>> => apiFetch(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_FREEZE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPlansActionResponseSchema }),
};
