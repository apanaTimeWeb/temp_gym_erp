import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MOCK_MEMBERS } from '@/app/frontend_manager/manager_members/members_directory/mocks/fixtures/ManagerMembersDirectoryMockData';
import { managerMembersMockState } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockState';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

/** @description Provides mutable create/update/delete/payment/assignment handlers for the Manager Members frontend demo contract. @dependencies Uses only feature-owned mock state and URL infrastructure. @edge-case every mutation updates in-memory state so subsequent list/detail reads prove the resulting UI state. */
export const managerMembersMutationHandlers = [
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.PAYMENTS(':id')), async ({ params, request }) => {
    const memberId = String(params.id);
    const body = await request.json() as Record<string, unknown>;
    const existing = managerMembersMockState.paymentByMemberId[memberId] ?? [];
    const paymentId = managerMembersMockState.paymentIdCounter++;
    const payment = { id: `pay-${paymentId}`, amount: Number(body.amount ?? 0), method: String(body.method ?? 'UPI'), paidAt: new Date().toISOString(), status: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PAID, invoiceNumber: `INV-${paymentId}` };
    managerMembersMockState.paymentByMemberId[memberId] = [payment, ...existing];
    return HttpResponse.json({ success: true, message: 'Payment recorded', data: payment });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.DIET_ASSIGN(':id')), async ({ params, request }) => {
    const memberId = String(params.id);
    const body = await request.json() as { dietPlanId?: string };
    const memberIndex = managerMembersMockState.members.findIndex((member) => member.id === memberId);
    const dietPlanId = String(body.dietPlanId ?? '');
    if (memberIndex < 0 || !dietPlanId) return HttpResponse.json({ success: false, message: 'Member or diet plan not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const availableDietPlans = [
      { id: 'dp1', name: 'Weight Loss Plan', description: 'Balanced calorie-controlled meal plan', type: 'WEIGHT_LOSS', calories: 1500, protein: 120, carbs: 100, fats: 50, meals: [] },
      { id: 'dp2', name: 'Muscle Gain Plan', description: 'Protein-forward muscle-building meal plan', type: 'MUSCLE_GAIN', calories: 2400, protein: 180, carbs: 260, fats: 70, meals: [] },
    ];
    const selectedDietPlan = availableDietPlans.find((plan) => plan.id === dietPlanId);
    if (!selectedDietPlan) return HttpResponse.json({ success: false, message: 'Diet plan not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    managerMembersMockState.members[memberIndex] = { ...managerMembersMockState.members[memberIndex]!, assignedDiet: selectedDietPlan };
    return HttpResponse.json({ success: true, message: 'Diet plan assigned', data: { success: true } });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.WORKOUT_ASSIGN(':id')), async ({ params, request }) => {
    const memberId = String(params.id);
    const body = await request.json() as { workoutId?: string };
    const memberIndex = managerMembersMockState.members.findIndex((member) => member.id === memberId);
    const workoutId = String(body.workoutId ?? '');
    if (memberIndex < 0 || !workoutId) return HttpResponse.json({ success: false, message: 'Member or workout not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const availableWorkouts = [
      { id: 'wp1', name: 'Beginner Routine', description: 'Introductory full-body routine', level: 'BEGINNER', daysPerWeek: 3, goal: 'General Fitness', days: [{ day: 1, focus: 'Full body', exercises: [] }, { day: 2, focus: 'Mobility', exercises: [] }, { day: 3, focus: 'Conditioning', exercises: [] }] },
      { id: 'wp2', name: 'Strength Builder', description: 'Progressive strength training routine', level: 'INTERMEDIATE', daysPerWeek: 5, goal: 'Muscle Gain', days: [{ day: 1, focus: 'Upper body', exercises: [] }, { day: 2, focus: 'Lower body', exercises: [] }, { day: 3, focus: 'Push', exercises: [] }, { day: 4, focus: 'Pull', exercises: [] }, { day: 5, focus: 'Legs', exercises: [] }] },
    ];
    const selectedWorkout = availableWorkouts.find((workout) => workout.id === workoutId);
    if (!selectedWorkout) return HttpResponse.json({ success: false, message: 'Workout not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    managerMembersMockState.members[memberIndex] = { ...managerMembersMockState.members[memberIndex]!, assignedWorkout: selectedWorkout };
    return HttpResponse.json({ success: true, message: 'Workout assigned', data: { success: true } });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<Member>;
    // Keep create valid even when prior demo interactions emptied the mutable collection.
    // Fall back to the canonical module fixture rather than inventing field values.
    const template = managerMembersMockState.members[0] ?? MOCK_MEMBERS[0];
    if (!template) {
      return HttpResponse.json(
        { success: false, message: 'No canonical member fixture is available', data: null },
        { status: MANAGER_HTTP_STATUS.SERVER_ERROR },
      );
    }
    const newMember = { ...template, ...body, id: `mem-${managerMembersMockState.memberIdCounter++}` } as Member;
    managerMembersMockState.members = [newMember, ...managerMembersMockState.members];
    return HttpResponse.json({ success: true, message: 'Created', data: newMember });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Member>;
    const idx = managerMembersMockState.members.findIndex((member) => member.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const current = managerMembersMockState.members[idx];
    managerMembersMockState.members[idx] = { ...current, ...body } as Member;
    return HttpResponse.json({ success: true, message: 'Updated', data: managerMembersMockState.members[idx] });
  }),

  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE(':id')), ({ params }) => {
    managerMembersMockState.members = managerMembersMockState.members.filter((member) => member.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Removed', data: { id: params.id } });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_MEMBERS_DIRECTORY_API.RENEW(':id')), async ({ request, params }) => {
    const body = await request.json() as Record<string, unknown>;
    const memberIndex = managerMembersMockState.members.findIndex((member) => member.id === params.id);
    if (memberIndex === -1) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const current = managerMembersMockState.members[memberIndex];
    if (!current) return HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const renewed = { ...current, expiryDate: String(body.newExpiryDate || current.expiryDate), planId: String(body.planId || current.planId), pendingAmount: 0 } as Member;
    managerMembersMockState.members[memberIndex] = renewed;
    return HttpResponse.json({ success: true, message: 'Renewed', data: renewed });
  }),
];
