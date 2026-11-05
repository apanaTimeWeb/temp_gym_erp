import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

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
const MOCK_FAST_DELAY_MS = 300;

export const TrainerMembersAttendanceMockHandlers = [
  http.get(`${BASE}${TRAINER_MEMBERS_URLS.API.ATTENDANCE(':id')}`, async ({ params }) => {
    await delay(MOCK_FAST_DELAY_MS);
    const memberId = String(params.id ?? '');
    const memberSeed = Array.from(memberId).reduce((total, character) => total + character.charCodeAt(0), 0);
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const mockData = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const shiftedDay = day + memberSeed;
      const status = shiftedDay % 11 === 0
        ? TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.ABSENT
        : shiftedDay % 7 === 0
          ? TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.LEAVE
          : TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS.PRESENT;
      return { day, status, memberId };
    });

    return trainerMockJson({ success: true, message: 'Attendance fetched', data: mockData });
  }),
];
