import { replayTrainerMockMutation, resetTrainerMockMutationReplays } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/mocks/utils/TrainerCoachingWorkoutPlansIdempotentMockResponse';
// RESPONSIBILITY: Owns module-local MSW request handlers for TrainerWorkoutWorkout Library list and mutation contracts.

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_WORKOUT_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansHttpStatusCodes';

import { TRAINER_WORKOUT_MOCK_WORKOUTS, TRAINER_WORKOUT_MOCK_EXERCISES } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/mocks/handlers/TrainerCoachingWorkoutPlansMockData';

import { TrainerWorkoutCreateExerciseSchema, TrainerWorkoutCreateWorkoutPlanSchema, TrainerWorkoutUpdateExerciseSchema, TrainerWorkoutUpdateWorkoutSchema, TrainerWorkoutWorkoutSchema, TrainerWorkoutExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/schemas/TrainerCoachingWorkoutPlansDomainSchemas';

import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';

/** Canonical mock transport envelope; keep feature DTO shape and verified status codes. */
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
const DEFAULT_PAGE_SIZE = 10;
const createInitialWorkoutsDB = () => TRAINER_WORKOUT_MOCK_WORKOUTS.map((workout) => ({ ...workout, tags: workout.tags ? [...workout.tags] : undefined, workoutExercises: workout.workoutExercises ? workout.workoutExercises.map((exercise) => ({ ...exercise })) : undefined }));
const createInitialExercisesDB = () => TRAINER_WORKOUT_MOCK_EXERCISES.map((exercise) => ({ ...exercise, muscleGroup: exercise.muscleGroup ? [...exercise.muscleGroup] : undefined }));
let workoutsDB: any[] = createInitialWorkoutsDB();
let exercisesDB: any[] = createInitialExercisesDB();
let mockIdSequence = 0;
const createMockId = (prefix: string): string => `${prefix}-${Date.now()}-${++mockIdSequence}`;
const idempotencyResponses = new Map<string, unknown>();

/** Resets mutable mock collections between tests while preserving mutations within an active test. */
export function resetTrainerWorkoutMockData(): void {
  workoutsDB = createInitialWorkoutsDB();
  exercisesDB = createInitialExercisesDB();
  mockIdSequence = 0;
  idempotencyResponses.clear();
  resetTrainerMockMutationReplays();
}

const SORT_FIELDS = new Set(['name', 'category', 'difficulty']);
const toNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const sortRecords = <T extends { name: string }>(records: T[], field: string, direction: string, fieldMap: Record<string, string> = {}) => {
  const requestedKey = SORT_FIELDS.has(field) ? field : 'name';
  const mappedKey = fieldMap[requestedKey] ?? requestedKey;
  const key = records.length > 0 && mappedKey in records[0]! ? mappedKey : 'name';
  const sign = direction === 'desc' ? -1 : 1;
  return [...records].sort((a, b) => {
    const left = String((a as Record<string, unknown>)[key] ?? '');
    const right = String((b as Record<string, unknown>)[key] ?? '');
    return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }) * sign;
  });
};
const pageResult = <T,>(items: T[], page: number, limit: number) => items.slice((page - 1) * limit, page * limit);

export const TrainerWorkoutMockHandlers = [
  http.get(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const category = url.searchParams.get('category') ?? 'All';
    const page = toNumber(url.searchParams.get('page'), 1);
    const limit = toNumber(url.searchParams.get('limit'), DEFAULT_PAGE_SIZE);
    const sortBy = url.searchParams.get('sortBy') ?? 'name';
    const sortDirection = url.searchParams.get('sortDirection') ?? 'asc';
    const filtered = workoutsDB.filter((workout) =>
      (!search || workout.name.toLowerCase().includes(search) || workout.focus.toLowerCase().includes(search)) &&
      (category === 'All' || workout.focus === category || workout.tags?.includes(category)),
    );
    return trainerMockJson({ success: true, message: 'Workouts fetched successfully', data: { workouts: pageResult(sortRecords(filtered, sortBy, sortDirection, { category: 'focus', difficulty: 'level' }), page, limit), total: filtered.length, page, limit, sortBy, sortDirection } });
  }),
  http.post(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(350);
    const idempotencyKey = request.headers.get('Idempotency-Key');
    const cacheKey = idempotencyKey ? `workout:create:${idempotencyKey}` : null;
    if (cacheKey && idempotencyResponses.has(cacheKey)) return trainerMockJson(idempotencyResponses.get(cacheKey));
    const parsed = TrainerWorkoutCreateWorkoutPlanSchema.safeParse(await request.json());
    if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid workout payload.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const workout = TrainerWorkoutWorkoutSchema.parse({ ...dto, id: createMockId('workout'), tags: typeof dto.tags === 'string' ? dto.tags.split(',').map((value) => value.trim()).filter(Boolean) : [], isActive: true });
    workoutsDB = [workout, ...workoutsDB];
    const response = { success: true, message: 'TrainerWorkoutWorkout plan created.', data: workout };
    if (cacheKey) idempotencyResponses.set(cacheKey, response);
    return trainerMockJson(response);
  
    });
  }),
  http.patch(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}/:id`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(350);
    const index = workoutsDB.findIndex((workout) => workout.id === params.id);
    if (index === -1) return trainerMockJson({ success: false, message: 'TrainerWorkoutWorkout plan not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    const parsed = TrainerWorkoutUpdateWorkoutSchema.safeParse(await request.json());
    if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid workout update payload.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const patch = parsed.data;
    const current = workoutsDB[index]!;
    const next = TrainerWorkoutWorkoutSchema.parse({ ...current, ...patch, tags: typeof patch.tags === 'string' ? patch.tags.split(',').map((value) => value.trim()).filter(Boolean) : patch.tags ?? current.tags });
    workoutsDB[index] = next;
    return trainerMockJson({ success: true, message: 'TrainerWorkoutWorkout plan updated.', data: next });
  
    });
  }),
  http.delete(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}/:id`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(300);
    const exists = workoutsDB.some((workout) => workout.id === params.id);
    if (!exists) return trainerMockJson({ success: false, message: 'TrainerWorkoutWorkout plan not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    workoutsDB = workoutsDB.filter((workout) => workout.id !== params.id);
    return trainerMockJson({ success: true, message: 'TrainerWorkoutWorkout plan deleted.', data: null });
  
    });
  }),
  http.get(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const category = url.searchParams.get('category') ?? 'All';
    const page = toNumber(url.searchParams.get('page'), 1);
    const limit = toNumber(url.searchParams.get('limit'), DEFAULT_PAGE_SIZE);
    const sortBy = url.searchParams.get('sortBy') ?? 'name';
    const sortDirection = url.searchParams.get('sortDirection') ?? 'asc';
    const filtered = exercisesDB.filter((exercise) =>
      (!search || exercise.name.toLowerCase().includes(search) || (exercise.category ?? '').toLowerCase().includes(search)) &&
      (category === 'All' || exercise.category === category || exercise.difficulty === category),
    );
    return trainerMockJson({ success: true, message: 'Exercises fetched successfully', data: { exercises: pageResult(sortRecords(filtered, sortBy, sortDirection), page, limit), total: filtered.length, page, limit, sortBy, sortDirection } });
  }),
  http.post(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(350);
    const idempotencyKey = request.headers.get('Idempotency-Key');
    const cacheKey = idempotencyKey ? `exercise:create:${idempotencyKey}` : null;
    if (cacheKey && idempotencyResponses.has(cacheKey)) return trainerMockJson(idempotencyResponses.get(cacheKey));
    const parsed = TrainerWorkoutCreateExerciseSchema.safeParse(await request.json());
    if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid exercise payload.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const exercise = TrainerWorkoutExerciseSchema.parse({ ...dto, id: createMockId('exercise'), category: dto.muscle, muscleGroup: [dto.muscle], isActive: true });
    exercisesDB = [exercise, ...exercisesDB];
    const response = { success: true, message: 'TrainerWorkoutExercise created.', data: exercise };
    if (cacheKey) idempotencyResponses.set(cacheKey, response);
    return trainerMockJson(response);
  
    });
  }),
  http.patch(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}/:id`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(350);
    const index = exercisesDB.findIndex((exercise) => exercise.id === params.id);
    if (index === -1) return trainerMockJson({ success: false, message: 'TrainerWorkoutExercise not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    const parsed = TrainerWorkoutUpdateExerciseSchema.safeParse(await request.json());
    if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid exercise update payload.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const current = exercisesDB[index]!;
    const next = TrainerWorkoutExerciseSchema.parse({ ...current, ...dto, category: dto.muscle ?? dto.category ?? current.category, muscleGroup: dto.muscle ? [dto.muscle] : dto.muscleGroup ?? current.muscleGroup });
    exercisesDB[index] = next;
    return trainerMockJson({ success: true, message: 'TrainerWorkoutExercise updated.', data: next });
  
    });
  }),
  http.delete(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}/:id`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(300);
    const exists = exercisesDB.some((exercise) => exercise.id === params.id);
    if (!exists) return trainerMockJson({ success: false, message: 'TrainerWorkoutExercise not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    exercisesDB = exercisesDB.filter((exercise) => exercise.id !== params.id);
    return trainerMockJson({ success: true, message: 'TrainerWorkoutExercise deleted.', data: null });
  
    });
  }),
];
