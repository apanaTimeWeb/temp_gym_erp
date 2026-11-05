import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_account/account_security/mocks/utils/TrainerAccountSecurityIdempotentMockResponse';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_ACCOUNT_SECURITY_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_account/account_security/utils/TrainerAccountSecurityProfileHttpStatusCodes';

import { TRAINER_ACCOUNT_SECURITY_MOCK_TRAINER_ACCOUNT_SECURITY } from '@/app/frontend_trainer/trainer_account/account_security/mocks/fixtures/TrainerAccountSecurityProfileMockData';

import { TRAINER_ACCOUNT_SECURITY_URLS } from '@/app/frontend_trainer/trainer_account/account_security/config/trainer_account_security.url_config';

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
let profileDB = { ...TRAINER_ACCOUNT_SECURITY_MOCK_TRAINER_ACCOUNT_SECURITY };
export const TrainerAccountSecurityProfileMockHandlers = [
  http.get(`${BASE}${TRAINER_ACCOUNT_SECURITY_URLS.API.PROFILE}`, async () => { await delay(250); return trainerMockJson({ success: true, message: 'Profile loaded.', data: profileDB }); }),
  http.patch(`${BASE}${TRAINER_ACCOUNT_SECURITY_URLS.API.PASSWORD}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => { await delay(350); const body = await request.json() as { currentPassword?: unknown; newPassword?: unknown }; if (typeof body.currentPassword !== 'string' || typeof body.newPassword !== 'string' || body.newPassword.length < 8) return trainerMockJson({ success: false, message: 'Invalid password payload.', data: null }, { status: TRAINER_ACCOUNT_SECURITY_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY }); return trainerMockJson({ success: true, message: 'Password updated.', data: null }); 
    });
  }),
];
