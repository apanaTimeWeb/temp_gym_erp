import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/config/manager_workout_diet_library_assigned_workout_plans.url_config';
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';


import { MOCK_WORKOUT_ASSIGNMENTS } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/fixtures/ManagerWorkoutPlansAssignmentMockData';
import { MOCK_MANAGER_ASSIGNED_EXERCISES, MOCK_MANAGER_WORKOUT_PLANSS } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/fixtures/ManagerAssignedWorkoutPlansMockData';

let MOCK_DB = [...MOCK_MANAGER_WORKOUT_PLANSS];

export let mockWorkoutIdCounter = 1000;
/**
 * @description Provides the ManagerAssignedWorkoutPlansMockHandlers implementation for the workout module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_fixtures/ManagerWorkoutPlansAssignmentMockData; @/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_fixtures/ManagerAssignedWorkoutPlansMockData; @/app/frontend_manager/manager_workout/manager_workout_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerAssignedWorkoutPlansMockState(): void {
  MOCK_DB = [...MOCK_MANAGER_WORKOUT_PLANSS];
  mockWorkoutIdCounter = 1000;
}

export const managerWorkoutHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.ASSIGNMENTS), () => HttpResponse.json({ success: true, message: 'Assignments fetched', data: MOCK_WORKOUT_ASSIGNMENTS })),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const filtered = search ? MOCK_MANAGER_ASSIGNED_EXERCISES.filter((exercise) => exercise.name.toLowerCase().includes(search)) : MOCK_MANAGER_ASSIGNED_EXERCISES;
    return HttpResponse.json({ success: true, message: 'Success', data: { exercises: filtered, total: filtered.length } });
  }),
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
  })
];
