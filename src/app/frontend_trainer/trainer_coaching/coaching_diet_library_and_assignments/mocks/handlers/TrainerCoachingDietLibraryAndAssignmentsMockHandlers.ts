import { replayTrainerMockMutation, resetTrainerMockMutationReplays } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/mocks/utils/TrainerCoachingDietLibraryAndAssignmentsIdempotentMockResponse';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_LIBRARY_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsHttpStatusCodes';

import { TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS, TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/mocks/fixtures/TrainerCoachingDietLibraryAndAssignmentsMockData';

import { TRAINER_LIBRARY_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/trainer_coaching_diet_library_and_assignments.url_config';

/** Retains verified DTOs while supplying canonical response-envelope metadata in isolated MSW mocks. */
const trainerMockJson = (body: unknown, init?: Parameters<typeof HttpResponse.json>[1]) => {
  if (!body || typeof body !== 'object' || !('success' in body)) return HttpResponse.json(body as Parameters<typeof HttpResponse.json>[0], init);
  const response = body as Record<string, unknown>;
  const success = response.success === true;
  const statusCode = init?.status ?? 400;
  return HttpResponse.json({
    ...response,
    requestId: typeof response.requestId === 'string' ? response.requestId : crypto.randomUUID(),
    ...(!success ? {
      data: null,
      errorCode: typeof response.errorCode === 'string' ? response.errorCode : `MOCK_HTTP_${statusCode}`,
      statusCode,
    } : {}),
  }, { ...init, status: success ? init?.status : statusCode });
};

const BASE = env.NEXT_PUBLIC_API_URL;
let dietPlansDB = [...TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS];
let assignedMembersDB = structuredClone(TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS);

/** Reset both mutable fixtures and idempotency replay state between tests. */
export function resetTrainerLibraryMockState(): void {
  dietPlansDB = structuredClone(TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS);
  assignedMembersDB = structuredClone(TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS);
  resetTrainerMockMutationReplays();
}

export const TrainerLibraryMockHandlers = [
  http.get(`${BASE}${TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE}`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const goal = url.searchParams.get('goal') ?? 'All';
    const rawPage = Number(url.searchParams.get('page') ?? '1');
    const rawLimit = Number(url.searchParams.get('limit') ?? '10');
    if (!Number.isSafeInteger(rawPage) || rawPage < 1 || !Number.isSafeInteger(rawLimit) || rawLimit < 1 || rawLimit > 100) {
      return trainerMockJson({ success: false, message: 'Invalid pagination values.', data: null }, { status: 400 });
    }
    const page = rawPage;
    const limit = rawLimit;
    const filtered = dietPlansDB.filter(plan => (!search || plan.name.toLowerCase().includes(search)) && (goal === 'All' || plan.goal === goal));
    return trainerMockJson({ success: true, message: 'Diet plans loaded.', data: { dietPlans: filtered.slice((page - 1) * limit, page * limit), total: filtered.length } });
  }),
  http.get(`${BASE}${TRAINER_LIBRARY_URLS.API.ASSIGNED_MEMBERS}`, async () => {
    await delay(200);
    return trainerMockJson({ success: true, message: 'Assigned members loaded.', data: assignedMembersDB });
  }),
  http.patch(`${BASE}${TRAINER_LIBRARY_URLS.API.ASSIGN_DIET(':memberId')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
      await delay(400);
      const memberIndex = assignedMembersDB.findIndex(member => member.id === params.memberId);
      if (memberIndex === -1) return trainerMockJson({ success: false, message: 'Member not found.', data: null }, { status: TRAINER_LIBRARY_HTTP_STATUS_CODES.NOT_FOUND });
      const body = await request.json() as { dietPlanId?: unknown };
      if (typeof body.dietPlanId !== 'string' || !dietPlansDB.some(plan => plan.id === body.dietPlanId)) {
        return trainerMockJson({ success: false, message: 'Diet plan not found.', data: null }, { status: TRAINER_LIBRARY_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
      }
      assignedMembersDB[memberIndex] = { ...assignedMembersDB[memberIndex]!, assignedDietPlanId: body.dietPlanId };
      return trainerMockJson({ success: true, message: 'Diet plan assigned.', data: { ...assignedMembersDB[memberIndex]! } });
  
    });
  }),
];
