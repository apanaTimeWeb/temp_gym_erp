import { replayTrainerMockMutation, resetTrainerMockMutationReplays } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/mocks/utils/TrainerCoachingExerciseManagementIdempotentMockResponse';
import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';
import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/trainer_coaching_exercise_management.url_config';
import { TrainerWorkoutCreateExerciseSchema, TrainerWorkoutUpdateExerciseSchema, TrainerWorkoutExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/schemas/TrainerCoachingExerciseManagementDomainSchemas';
import { TRAINER_EXERCISE_MOCK_FIXTURE } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/mocks/fixtures/TrainerCoachingExerciseManagementMockData';
import type { TrainerWorkoutCreateExerciseDto, TrainerWorkoutExercise } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTypes';
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

let records = TRAINER_EXERCISE_MOCK_FIXTURE.map(row => ({...row}));
let nextId = 0;
const responseCache = new Map<string, { success: boolean; message: string; data: unknown }>();
export function resetTrainerCoachingExerciseManagementMocks() {
 records = TRAINER_EXERCISE_MOCK_FIXTURE.map(row => ({...row})); nextId = 0; responseCache.clear();
  resetTrainerMockMutationReplays();
}
const prefix = env.NEXT_PUBLIC_API_URL;

/** Maps the exercise update DTO onto the stored domain shape without dropping the primary muscle edit. */
export function mapTrainerWorkoutExerciseUpdate(
  existing: TrainerWorkoutExercise,
  update: Partial<TrainerWorkoutCreateExerciseDto>,
) {
  const { muscle, ...domainFields } = update;
  return TrainerWorkoutExerciseSchema.parse({
    ...existing,
    ...domainFields,
    ...(muscle ? { category: muscle, muscleGroup: [muscle] } : {}),
  });
}
export const trainerCoachingExerciseManagementMockHandlers = [
 http.get(`${prefix}${TRAINER_WORKOUT_URLS.API.EXERCISES}`, ({ request }) => {
  const qs = new URL(request.url).searchParams;
  const search = (qs.get('search') ?? '').toLowerCase();
  const category = qs.get('category') ?? 'All';
  const page = Number(qs.get('page') ?? '1');
  const limit = Number(qs.get('limit') ?? '10');
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return trainerMockJson({success:false,message:'Invalid pagination values.',data:null},{status:400});
  const sortBy = qs.get('sortBy') ?? 'name';
  const direction = qs.get('sortDirection') === 'desc' ? -1 : 1;
  const filtered = records.filter(x => (!search || x.name.toLowerCase().includes(search) || (x.category ?? '').toLowerCase().includes(search)) && (category === 'All' || x.category === category || x.difficulty === category));
  const ordered = [...filtered].sort((a,b) => String(a[sortBy as keyof typeof a] ?? a.name).localeCompare(String(b[sortBy as keyof typeof b] ?? b.name)) * direction);
  return trainerMockJson({ success: true, message: 'Exercises fetched successfully', data: { exercises: ordered.slice((page-1)*limit,page*limit), total: filtered.length, page, limit, sortBy, sortDirection: direction===-1 ? 'desc':'asc' } });
 }),
 http.post(`${prefix}${TRAINER_WORKOUT_URLS.API.EXERCISES}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
  const k = request.headers.get('Idempotency-Key');
  if (k && responseCache.has(`create:${k}`)) return trainerMockJson(responseCache.get(`create:${k}`));
  const parsed = TrainerWorkoutCreateExerciseSchema.safeParse(await request.json());
  if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid exercise payload.', data: null },{status:422});
  const next = TrainerWorkoutExerciseSchema.parse({...parsed.data, id:`exercise-${++nextId}`, category:parsed.data.muscle, muscleGroup:[parsed.data.muscle],isActive:true});
  records = [next,...records];
  const response = { success:true,message:'TrainerWorkoutExercise created.',data:next };
  if (k) responseCache.set(`create:${k}`,response);
  return trainerMockJson(response);
 
    });
  }),
 http.patch(`${prefix}${TRAINER_WORKOUT_URLS.API.EXERCISES}/:id`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
  const idx = records.findIndex(r=>r.id===params.id);
  if (idx<0) return trainerMockJson({success:false,message:'Exercise not found',data:null},{status:404});
  const parsed = TrainerWorkoutUpdateExerciseSchema.safeParse(await request.json());
  if (!parsed.success) return trainerMockJson({success:false,message:'Invalid exercise payload',data:null},{status:422});
  const next = mapTrainerWorkoutExerciseUpdate(records[idx]!, parsed.data);
  records = records.map((r,i)=>i===idx?next:r);
  return trainerMockJson({success:true,message:'TrainerWorkoutExercise updated.',data:next});
 
    });
  }),
 http.delete(`${prefix}${TRAINER_WORKOUT_URLS.API.EXERCISES}/:id`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
  if (!records.some(r=>r.id===params.id)) return trainerMockJson({success:false,message:'Exercise not found',data:null},{status:404});
  records = records.filter(r=>r.id!==params.id);
  return trainerMockJson({success:true,message:'TrainerWorkoutExercise deleted.',data:null});
 
    });
  }),
];
