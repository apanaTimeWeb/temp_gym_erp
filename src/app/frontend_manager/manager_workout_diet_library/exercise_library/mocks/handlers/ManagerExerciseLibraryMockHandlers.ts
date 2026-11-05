import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/config/manager_workout_diet_library_exercise_library.url_config';
import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MOCK_MANAGER_WORKOUT_EXERCISES } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/mocks/fixtures/ManagerExerciseLibraryExerciseMockData';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';

let mockExercises = [...MOCK_MANAGER_WORKOUT_EXERCISES];
let mockExerciseIdCounter = 1000;

export function resetManagerExerciseLibraryMockState(): void {
  mockExercises = [...MOCK_MANAGER_WORKOUT_EXERCISES];
  mockExerciseIdCounter = 1000;
}

function positiveInteger(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const managerWorkoutHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.WORKOUT_EXERCISES('')), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLocaleLowerCase();
    const level = url.searchParams.get('level') ?? 'ALL';
    const page = positiveInteger(url.searchParams.get('page'), 1);
    const limit = positiveInteger(url.searchParams.get('limit'), 10);
    let filtered = [...mockExercises];
    if (search) filtered = filtered.filter((exercise) => exercise.name.toLocaleLowerCase().includes(search) || exercise.muscleGroup.some((muscle) => muscle.toLocaleLowerCase().includes(search)));
    if (level !== 'ALL') filtered = filtered.filter((exercise) => exercise.difficulty === level);
    const total = filtered.length;
    const start = (page - 1) * limit;
    const exercises = filtered.slice(start, start + limit);
    return HttpResponse.json({
      success: true,
      message: 'Exercises fetched',
      data: { exercises, total },
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE), async ({ request }) => {
    const body = await request.json() as Partial<ExerciseSnapshot>;
    const exercise: ExerciseSnapshot = { id: `ex-${mockExerciseIdCounter++}`, name: body.name || 'New Exercise', muscleGroup: body.muscleGroup || [], difficulty: body.difficulty || 'BEGINNER', equipment: body.equipment || 'Bodyweight', category: body.category };
    mockExercises = [exercise, ...mockExercises];
    return HttpResponse.json({ success: true, message: 'Exercise created', data: exercise }, { status: 201 });
  }),
  http.patch(ManagerInfrastructureMockApiUrl(`${MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE}/:id`), async ({ request, params }) => {
    const id = String(params.id);
    const body = await request.json() as Partial<ExerciseSnapshot>;
    const index = mockExercises.findIndex((exercise) => exercise.id === id);
    if (index < 0) return HttpResponse.json({ success: false, message: 'Exercise not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const updated = { ...mockExercises[index], ...body, id };
    mockExercises = mockExercises.map((exercise) => exercise.id === id ? updated : exercise);
    return HttpResponse.json({ success: true, message: 'Exercise updated', data: updated });
  }),
  http.delete(ManagerInfrastructureMockApiUrl(`${MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE}/:id`), ({ params }) => {
    const id = String(params.id);
    if (!mockExercises.some((exercise) => exercise.id === id)) return HttpResponse.json({ success: false, message: 'Exercise not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockExercises = mockExercises.filter((exercise) => exercise.id !== id);
    return HttpResponse.json({ success: true, message: 'Exercise deleted', data: { id } });
  }),
];
