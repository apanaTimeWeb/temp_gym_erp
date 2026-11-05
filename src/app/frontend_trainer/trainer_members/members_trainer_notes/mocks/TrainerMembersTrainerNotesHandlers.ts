import type { TrainerMembersTrainerNotesNote } from '../types/TrainerMembersMembersTrainerNotesAuxiliaryTypes';
import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';
import { TRAINER_NOTES_API } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/config/trainer_members_trainer_notes.url_config';
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


const entries = new Map<string, any[]>([['MEM-001', []]]);
const idempotentResponses = new Map<string, unknown>();
export const trainerNotesMockHandlers = [
  http.get(`${env.NEXT_PUBLIC_API_URL}${TRAINER_NOTES_API.MOCK_MEMBER}`, ({ params }) => {
    const memberId = String(params.id);
    if (!entries.has(memberId)) return trainerMockJson({ success: false, message: 'Member not found' }, { status: 404 });
    return trainerMockJson({ success: true, message: 'Member fetched', data: { id: memberId, name: 'Rahul Sharma', trainerNotes: entries.get(memberId) } });
  }),
  http.post(`${env.NEXT_PUBLIC_API_URL}${TRAINER_NOTES_API.MOCK_NOTES}`, async ({ params, request }) => {
    const memberId = String(params.id);
    if (!entries.has(memberId)) return trainerMockJson({ success: false, message: 'Member not found' }, { status: 404 });
    const key = request.headers.get('Idempotency-Key');
    const scopedKey = key ? `${memberId}:${key}` : null;
    if (scopedKey && idempotentResponses.has(scopedKey)) return trainerMockJson(idempotentResponses.get(scopedKey));
    const json = await request.json();
    if (!json || typeof json !== 'object' || !('text' in json) || typeof json.text !== 'string' || !json.text.trim()) return trainerMockJson({ success: false, message: 'Note is required' }, {status:422});
    const notes = entries.get(memberId)!;
    notes.push({ id: `note-${notes.length+1}`, text: json.text.trim(), date: new Date().toISOString() });
    const response = { success: true, message: 'Note saved', data: { id: memberId, name: 'Rahul Sharma', trainerNotes: notes } };
    if (scopedKey) idempotentResponses.set(scopedKey, response);
    return trainerMockJson(response);
  }),
];
export function resetTrainerNotesMocks() { entries.set('MEM-001', []); idempotentResponses.clear(); }


export type { TrainerMembersTrainerNotesNote } from '../types/TrainerMembersMembersTrainerNotesAuxiliaryTypes';
