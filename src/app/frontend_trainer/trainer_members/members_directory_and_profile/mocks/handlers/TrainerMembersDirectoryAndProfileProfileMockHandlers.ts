import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/utils/TrainerMembersDirectoryAndProfileIdempotentMockResponse';
import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_MEMBERS_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileHttpStatusCodes';

import { TrainerMembersMemberSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileDomainSchemas';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

import { getTrainerMembersMockMembers, replaceTrainerMembersMockMembers } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileMockState';

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
const MOCK_DELAY_MS = 500;
const MOCK_SHORT_DELAY_MS = 200;

export const TrainerMembersProfileMockHandlers = [
  http.post(`${BASE}${TRAINER_MEMBERS_URLS.API.NOTES(':id')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_SHORT_DELAY_MS);
    const members = getTrainerMembersMockMembers();
    const memberIndex = members.findIndex((member) => member.id === params.id);
    if (memberIndex === -1) return trainerMockJson({ success: false, message: 'TrainerMembersMember not found.' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.NOT_FOUND });
    const body = await request.json() as { text?: unknown };
    if (typeof body.text !== 'string' || body.text.trim().length === 0) {
      return trainerMockJson({ success: false, message: 'Note is required.' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    }
    const note = { id: `note-${Date.now()}`, text: body.text.trim(), date: new Date().toISOString() };
    const member = members[memberIndex]!;
    const nextMembers = [...members];
    nextMembers[memberIndex] = { ...member, trainerNotes: [...(member.trainerNotes ?? []), note] };
    replaceTrainerMembersMockMembers(nextMembers);
    return trainerMockJson({ success: true, message: 'Note saved.', data: nextMembers[memberIndex] });
  
    });
  }),

  http.get(`${BASE}${TRAINER_MEMBERS_URLS.API.GET_ONE(':id')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const member = getTrainerMembersMockMembers().find((candidate) => candidate.id === params.id);
    if (!member) return trainerMockJson({ success: false, message: 'TrainerMembersMember not found' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.NOT_FOUND });
    return trainerMockJson({ success: true, message: 'TrainerMembersMember fetched successfully', data: member });
  }),

  http.patch(`${BASE}${TRAINER_MEMBERS_URLS.API.GET_ONE(':id')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = TrainerMembersMemberSchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return trainerMockJson({ success: false, message: 'Invalid member payload.', data: null }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const body = parsedBody.data;
    const members = getTrainerMembersMockMembers();
    const index = members.findIndex((member) => member.id === params.id);
    if (index === -1) return trainerMockJson({ success: false, message: 'TrainerMembersMember not found' }, { status: TRAINER_MEMBERS_HTTP_STATUS_CODES.NOT_FOUND });
    const existingMember = members[index]!;
    const nextMember = {
      ...existingMember,
      ...body,
      ...(body.assessment ? { assessment: { ...(existingMember.assessment || {}), ...body.assessment } } : {}),
    } as typeof existingMember;
    const nextMembers = [...members];
    nextMembers[index] = nextMember;
    replaceTrainerMembersMockMembers(nextMembers);
    return trainerMockJson({ success: true, message: 'TrainerMembersMember updated successfully', data: nextMember });
  
    });
  }),
];
