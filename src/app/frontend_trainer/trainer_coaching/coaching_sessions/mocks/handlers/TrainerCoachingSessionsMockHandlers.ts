import { replayTrainerMockMutation, resetTrainerMockMutationReplays } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/mocks/utils/TrainerCoachingSessionsIdempotentMockResponse';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_SESSIONS_ALL_SESSION_FILTER, TRAINER_SESSIONS_SESSION_STATUS, TRAINER_SESSIONS_SESSION_TYPE } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { TRAINER_SESSIONS_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsHttpStatusCodes';

import { TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS, TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/mocks/fixtures/TrainerCoachingSessionsMockData';

import { TrainerSessionsCreateSessionDtoSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsDomainSchemas';

import { TrainerSessionsEditFormSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsEditSchema';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';

;

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
const MOCK_DELAY_MS = 300;
const createInitialSessionsDB = () => TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS.map((session) => ({ ...session, enrolledMembers: session.enrolledMembers ? session.enrolledMembers.map((member) => ({ ...member })) : [] }));
let sessionsDB = createInitialSessionsDB();
const createdByIdempotencyKey = new Map<string, (typeof sessionsDB)[number]>();

/** Resets mutable fixture state between isolated tests without affecting in-flow mutation behavior. */
export function resetTrainerSessionsMockData(): void {
  sessionsDB = createInitialSessionsDB();
  createdByIdempotencyKey.clear();
  resetTrainerMockMutationReplays();
}

export const TrainerSessionsMockHandlers = [
  http.get(`${BASE}${TRAINER_SESSIONS_URLS.API.MEMBERS}`, async () => { await delay(250); return trainerMockJson({ success: true, message: 'Session members loaded.', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS }); }),
  http.get(`${BASE}${TRAINER_SESSIONS_URLS.API.LIST}`, async ({ request }) => { await delay(300); const params = new URL(request.url).searchParams; const date = params.get('date'); const filter = params.get('filter'); const filtered = sessionsDB.filter((session) => (date ? session.sessionDate === date : true) && (filter && filter !== TRAINER_SESSIONS_ALL_SESSION_FILTER ? session.type === filter : true)); return trainerMockJson({ success: true, message: 'Sessions loaded.', data: filtered }); }),
  http.post(`${BASE}${TRAINER_SESSIONS_URLS.API.LIST}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => { await delay(400); const key = request.headers.get('Idempotency-Key'); if (key && createdByIdempotencyKey.has(key)) return trainerMockJson({ success: true, message: 'Session created.', data: createdByIdempotencyKey.get(key) }); const parsed = TrainerSessionsCreateSessionDtoSchema.safeParse(await request.json()); if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid session payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY }); const dto = parsed.data; const newSession = { id: `s-${Date.now()}`, title: dto.type === 'PT' ? 'PT Session' : 'Group Session', type: dto.type, sessionDate: dto.date, time: dto.time, duration: dto.duration, status: TRAINER_SESSIONS_SESSION_STATUS.UPCOMING, attendees: 0, isOnline: false, member: dto.memberId || undefined, location: dto.location, room: dto.room, enrolledMembers: dto.type === TRAINER_SESSIONS_SESSION_TYPE.GROUP ? [...TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS] : TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS.filter((member) => member.id === dto.memberId) }; sessionsDB = [...sessionsDB, newSession]; if (key) createdByIdempotencyKey.set(key, newSession); return trainerMockJson({ success: true, message: 'Session created.', data: newSession }); 
    });
  }),
  http.patch(`${BASE}${TRAINER_SESSIONS_URLS.API.UPDATE(':id')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => { await delay(350); const index = sessionsDB.findIndex(s => s.id === params.id); if (index === -1) return trainerMockJson({ success: false, message: 'Session not found.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.NOT_FOUND }); const parsedBody = TrainerSessionsEditFormSchema.partial().safeParse(await request.json()); if (!parsedBody.success) return trainerMockJson({ success: false, message: 'Invalid session update payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY }); const current = sessionsDB[index]!; sessionsDB[index] = { ...current, ...parsedBody.data }; return trainerMockJson({ success: true, message: 'Session updated.', data: sessionsDB[index] }); 
    });
  }),
  http.delete(`${BASE}${TRAINER_SESSIONS_URLS.API.CANCEL(':id')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const index = sessionsDB.findIndex((s) => s.id === params.id);
    if (index === -1) return trainerMockJson({ success: false, message: 'Session not found', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.NOT_FOUND });
    sessionsDB = sessionsDB.filter((s) => s.id !== params.id);
    return trainerMockJson({ success: true, message: 'Session cancelled successfully', data: null });
  
    });
  }),
  http.post(`${BASE}${TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE(':id')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(300);
    const index = sessionsDB.findIndex((s) => s.id === params.id);
    if (index === -1) return trainerMockJson({ success: false, message: 'Session not found.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.NOT_FOUND });

    const rawBody = await request.text();
    if (!rawBody.trim()) {
      sessionsDB[index] = { ...sessionsDB[index]!, status: TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW };
      return trainerMockJson({ success: true, message: 'Session marked as No Show successfully', data: null });
    }

    let body: { memberIds?: unknown };
    try {
      body = JSON.parse(rawBody) as { memberIds?: unknown };
    } catch {
      return trainerMockJson({ success: false, message: 'Invalid attendance payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }

    if (!Array.isArray(body.memberIds) || body.memberIds.some((memberId) => typeof memberId !== 'string')) {
      return trainerMockJson({ success: false, message: 'Invalid attendance payload.', data: null }, { status: TRAINER_SESSIONS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }

    const memberIds = body.memberIds as string[];
    const enrolled = sessionsDB[index]!.enrolledMembers ?? [];
    const checked = enrolled.filter((member) => memberIds.includes(member.id));
    sessionsDB[index] = { ...sessionsDB[index]!, attendees: checked.length, enrolledMembers: enrolled };
    return trainerMockJson({ success: true, message: 'Attendance marked.', data: null });
  
    });
  }),
];
