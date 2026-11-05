import { MANAGER_LIBRARY_DIET_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/config/manager_library_diet_plans.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MOCK_MANAGER_DIET_PLANS } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/fixtures/ManagerLibraryDietPlansDietMockData';
import { MOCK_MANAGER_EXERCISES } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/fixtures/ManagerLibraryDietPlansMockData';
import type { Exercise, DietPlan } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';


let mockExercises = [...MOCK_MANAGER_EXERCISES];
let mockDietPlans = [...MOCK_MANAGER_DIET_PLANS];

export let mockExerciseIdCounter = 1000;
let mockDietPlanIdCounter = 1000;

/**
 * @description Provides the ManagerLibraryDietPlansMockHandlers implementation for the library module.
 * @dependencies @/app/frontend_manager/manager_workout_diet_library/manager_library_mocks/manager_library_mocks_fixtures/ManagerLibraryDietPlansDietMockData; @/app/frontend_manager/manager_workout_diet_library/manager_library_mocks/manager_library_mocks_fixtures/ManagerLibraryDietPlansMockData; @/app/frontend_manager/manager_workout_diet_library/manager_library_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerLibraryDietPlansMockState(): void {
  mockExercises = [...MOCK_MANAGER_EXERCISES];
  mockDietPlans = [...MOCK_MANAGER_DIET_PLANS];
  mockExerciseIdCounter = 1000;
  mockDietPlanIdCounter = 1000;
}
export const managerLibraryHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISES_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
    const limit = Math.max(parseInt(url.searchParams.get('limit') || '12', 10), 1);
    let results = [...mockExercises];
    if (search) results = results.filter(e => e.name.toLowerCase().includes(search) || Boolean(e.category?.toLowerCase().includes(search)));
    const total = results.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Exercises fetched', data: { exercises: results.slice(start, start + limit), total, page, limit } });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISES_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Exercise>;
    const newExercise: Exercise = { ...body, id: `ex-${mockExerciseIdCounter++}`, name: body.name || 'New Exercise', muscleGroup: body.muscleGroup || [], category: body.category || '', difficulty: body.difficulty || 'ALL', isActive: body.isActive !== undefined ? body.isActive : true };
    mockExercises = [newExercise, ...mockExercises];
    return HttpResponse.json({ success: true, message: 'Exercise created successfully', data: newExercise });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISE_UPDATE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Exercise>;
    const index = mockExercises.findIndex(e => e.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Exercise not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockExercises[index] = { ...mockExercises[index], ...body } as Exercise;
    return HttpResponse.json({ success: true, message: 'Exercise updated successfully', data: mockExercises[index] });
  }),

  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISE_DELETE(':id')), ({ params }) => {
    mockExercises = mockExercises.filter(e => e.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Exercise deleted successfully', data: { id: params.id } });
  }),

  http.get(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLANS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() || '';
    const goal = url.searchParams.get('goal')?.trim().toLowerCase() || '';
    const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
    const limit = Math.max(parseInt(url.searchParams.get('limit') || '12', 10), 1);
    let results = [...mockDietPlans];
    if (search) results = results.filter(plan => `${plan.name} ${plan.goal} ${plan.description || ''}`.toLowerCase().includes(search));
    if (goal && goal !== 'all') results = results.filter(plan => plan.goal.toLowerCase() === goal);
    const total = results.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Diet plans fetched', data: { dietPlans: results.slice(start, start + limit), total, page, limit } });
  }),

  http.post(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLANS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<DietPlan>;
    const newDietPlan: DietPlan = { ...body, id: `dp-${mockDietPlanIdCounter++}`, name: body.name || 'New Diet Plan', goal: body.goal || 'Maintenance', meals: body.meals || [], isActive: body.isActive !== undefined ? body.isActive : true } as DietPlan;
    mockDietPlans = [newDietPlan, ...mockDietPlans];
    return HttpResponse.json({ success: true, message: 'Diet plan created successfully', data: newDietPlan });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLAN_UPDATE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<DietPlan>;
    const index = mockDietPlans.findIndex(plan => plan.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Diet plan not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockDietPlans[index] = { ...mockDietPlans[index], ...body } as DietPlan;
    return HttpResponse.json({ success: true, message: 'Diet plan updated successfully', data: mockDietPlans[index] });
  }),

  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLAN_DELETE(':id')), ({ params }) => {
    mockDietPlans = mockDietPlans.filter(plan => plan.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Diet plan deleted successfully', data: { id: params.id } });
  }),
];
