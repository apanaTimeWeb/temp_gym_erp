import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/config/manager_workout_diet_library_workout_plan_management.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MOCK_WORKOUT_ASSIGNMENTS } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/mocks/fixtures/ManagerWorkoutPlansAssignmentMockData';
import { MOCK_MANAGER_WORKOUT_PLANSS } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/mocks/fixtures/ManagerWorkoutPlanManagementMockData';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';

let MOCK_DB = [...MOCK_MANAGER_WORKOUT_PLANSS];

export let mockWorkoutIdCounter = 1000;
/**
 * @description Provides the ManagerWorkoutPlanManagementMockHandlers implementation for the workout module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_fixtures/ManagerWorkoutPlansAssignmentMockData; @/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_fixtures/ManagerWorkoutPlanManagementMockData; @/app/frontend_manager/manager_workout/manager_workout_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerWorkoutPlanManagementMockState(): void {
  MOCK_DB = [...MOCK_MANAGER_WORKOUT_PLANSS];
  mockWorkoutIdCounter = 1000;
}

export const managerWorkoutHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.WORKOUTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const level = url.searchParams.get('level');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);

    let results = [...MOCK_DB];

    if (search) {
      results = results.filter(w => w.name.toLowerCase().includes(search) || w.focus.toLowerCase().includes(search));
    }

    if (level && level !== 'ALL') {
      results = results.filter(w => w.level === level);
    }

    const total = results.length;
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    return HttpResponse.json({
      success: true,
      message: 'Workouts fetched',
      data: { workouts: paginated, total },
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.WORKOUTS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Workout>;
    const newWorkout: Workout = {
      ...body,
      id: `wk-${mockWorkoutIdCounter++}`,
      name: body.name || 'New Workout',
      level: body.level || 'ALL',
      days: body.days || 1,
      exercises: body.exercises || 1,
      focus: body.focus || 'General',
      duration: body.duration || '30 min',
      tags: body.tags || [] } as Workout;
    
    MOCK_DB = [newWorkout, ...MOCK_DB];
    return HttpResponse.json({
      success: true,
      message: 'Workout created successfully',
      data: newWorkout
    });
  }),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.WORKOUT(':id')), async ({ request, params }) => {
    const { id } = params;
    const body = await request.json() as Partial<Workout>;
    const index = MOCK_DB.findIndex(w => w.id === id);
    if (index === -1) {
      return HttpResponse.json({ success: false, message: 'Workout not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    MOCK_DB[index] = { ...MOCK_DB[index], ...body } as Workout;
    return HttpResponse.json({
      success: true,
      message: 'Workout updated successfully',
      data: MOCK_DB[index]
    });
  }),
  http.delete(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.WORKOUT(':id')), ({ params }) => {
    const { id } = params;
    MOCK_DB = MOCK_DB.filter(w => w.id !== id);
    return HttpResponse.json({
      success: true,
      message: 'Workout deleted successfully',
      data: { id }
    });
  })
];
