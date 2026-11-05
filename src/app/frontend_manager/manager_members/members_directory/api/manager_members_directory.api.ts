import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { populatedMemberSchema, memberStatsSchema, planSnapshotSchema, paymentSnapshotSchema, attendanceSnapshotSchema, dietPlanSnapshotSchema, workoutSnapshotSchema, memberDeleteResponseSchema, trainerListSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory.schemas';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot, DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_snapshot.types';
import type { Member, MemberStats } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';


/**
 * @description Provides the ManagerMembersDirectoryApi implementation for the members module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_members/manager_members_url_config; @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersDirectorySnapshotTypes; @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersDirectoryTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerMembersDirectoryApi = {
  exportMembersReport: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number }>> => {
    const pageSize = 250;
    const members: Member[] = [];
    let total = 0;
    let firstResponse: ApiResponse<{ members: Member[]; total: number }> | null = null;
    for (let page = 1; page <= 1000; page += 1) {
      const queryParams = new URLSearchParams({ ...(params ?? {}), page: String(page), limit: String(pageSize) }).toString();
      const response = await apiFetch<{ members: Member[]; total: number }>(`${MANAGER_MEMBERS_DIRECTORY_API.EXPORT}?${queryParams}`, {
        dataSchema: z.object({ members: z.array(populatedMemberSchema), total: z.number().int().nonnegative() })
      });
      if (!firstResponse) firstResponse = response;
      if (!response.success) return response;
      members.push(...response.data.members);
      total = response.data.total;
      if (members.length >= total || response.data.members.length === 0) break;
    }
    if (!firstResponse) throw new Error('Member export did not return a response');
    if (!firstResponse.success) return firstResponse;
    if (members.length < total) throw new Error('Member export exceeded the safe pagination ceiling; no partial export was returned');
    return { ...firstResponse, data: { members: members.slice(0, total), total } };
  },
  fetchMembers: async (params?: Record<string, string>): Promise<ApiResponse<{ members: Member[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_MEMBERS_DIRECTORY_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ members: z.array(populatedMemberSchema), total: z.number(), page: z.number(), limit: z.number() })
    });
  },
  fetchMemberById: async (id: string): Promise<ApiResponse<Member>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE(id), { dataSchema: populatedMemberSchema });
  },
  fetchMemberStats: async (): Promise<ApiResponse<MemberStats>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.STATS, { dataSchema: memberStatsSchema });
  },
  createMember: async (body: Partial<Member>, idempotencyKey: string): Promise<ApiResponse<Member>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: populatedMemberSchema });
  },
  updateMember: async (id: string, body: Partial<Member> & Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<Member>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: populatedMemberSchema });
  },
  deleteMember: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: memberDeleteResponseSchema });
  },
  renewMember: async (id: string, body: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<Member>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.RENEW(id), { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: populatedMemberSchema });
  },
  fetchMemberTrainers: async (): Promise<ApiResponse<{ staff: { id: string; name: string; role: string }[] }>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.TRAINERS, { dataSchema: trainerListSchema });
  },
  fetchMemberPlans: async (): Promise<ApiResponse<PlanSnapshot[]>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.PLANS_SNAPSHOT, { dataSchema: z.array(planSnapshotSchema) });
  },
  fetchMemberPayments: async (memberId: string): Promise<ApiResponse<PaymentSnapshot[]>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.PAYMENTS(memberId), { dataSchema: z.array(paymentSnapshotSchema) });
  },
  createMemberPayment: async (memberId: string, body: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<PaymentSnapshot>> => {
    const serializedBody = { ...body, ...(body.paidAt instanceof Date ? { paidAt: body.paidAt.toISOString() } : {}) };
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.PAYMENTS(memberId), { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: paymentSnapshotSchema });
  },
  fetchMemberAttendance: async (memberId: string): Promise<ApiResponse<AttendanceSnapshot[]>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.ATTENDANCE(memberId), { dataSchema: z.array(attendanceSnapshotSchema) });
  },
  fetchMemberDietPlans: async (): Promise<ApiResponse<DietPlanSnapshot[]>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.DIET_PLANS, { dataSchema: z.array(dietPlanSnapshotSchema) });
  },
  assignDietPlan: async (memberId: string, dietPlanId: string, idempotencyKey: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.DIET_ASSIGN(memberId), { method: 'POST', body: JSON.stringify({ dietPlanId }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ success: z.boolean() }) });
  },
  fetchMemberWorkouts: async (): Promise<ApiResponse<WorkoutSnapshot[]>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.WORKOUTS, { dataSchema: z.array(workoutSnapshotSchema) });
  },
  assignWorkout: async (memberId: string, workoutId: string, idempotencyKey: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiFetch(MANAGER_MEMBERS_DIRECTORY_API.WORKOUT_ASSIGN(memberId), { method: 'POST', body: JSON.stringify({ workoutId }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ success: z.boolean() }) });
  }
};
