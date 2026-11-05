import { TrainerProfileFormSchema } from '@/app/frontend_trainer/trainer_account/account_personal_profile/schemas/TrainerAccountPersonalProfileProfileSchema';
import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_account/account_personal_profile/mocks/utils/TrainerAccountPersonalProfileIdempotentMockResponse';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';


import { TRAINER_PROFILE_MOCK_TRAINER_PROFILE } from '@/app/frontend_trainer/trainer_account/account_personal_profile/mocks/fixtures/TrainerAccountPersonalProfileProfileMockData';

import { TRAINER_PROFILE_URLS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

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
let profileDB = { ...TRAINER_PROFILE_MOCK_TRAINER_PROFILE };
export const TrainerProfileMockHandlers = [
  http.get(`${BASE}${TRAINER_PROFILE_URLS.API.PROFILE}`, async () => { await delay(250); return trainerMockJson({ success: true, message: 'Profile loaded.', data: profileDB }); }),
  http.patch(`${BASE}${TRAINER_PROFILE_URLS.API.PROFILE}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => { await delay(350); const parsed = TrainerProfileFormSchema.partial().strict().safeParse(await request.json()); if (!parsed.success) return trainerMockJson({ success: false, message: 'Invalid profile fields.', data: null }, { status: 422 }); profileDB = { ...profileDB, ...parsed.data }; return trainerMockJson({ success: true, message: 'Profile updated.', data: profileDB }); 
    });
  }),

];
