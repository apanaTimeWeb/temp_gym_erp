import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_MEMBERS_MOCK_MEMBER_STATS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileMockData';

import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

import { getTrainerMembersMockMembers } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileMockState';

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

export const TrainerMembersBrowseMockHandlers = [
  http.get(`${BASE}${TRAINER_MEMBERS_URLS.API.BASE}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || 'All';
    const progressStatus = url.searchParams.get('progressStatus') || 'All';
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '50');
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return trainerMockJson({success:false,message:'Invalid pagination values.',data:null},{status:400});
    const sortBy = url.searchParams.get('sortBy') || 'name';
    const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

    let filtered = [...getTrainerMembersMockMembers()];
    const phoneSearch = search.replace(/\D/g, '');
    if (search) filtered = filtered.filter((member) => member.name.toLowerCase().includes(search) || member.email?.toLowerCase().includes(search) || (phoneSearch.length > 0 && member.phone.replace(/\D/g, '').includes(phoneSearch)));
    if (status !== 'All') filtered = filtered.filter((member) => member.status === status);
    if (progressStatus !== 'All') filtered = filtered.filter((member) => member.progressStatus === progressStatus);

    filtered.sort((left, right) => {
      const leftValue = left[sortBy as keyof typeof left];
      const rightValue = right[sortBy as keyof typeof right];
      const result = String(leftValue ?? '').toLowerCase().localeCompare(String(rightValue ?? '').toLowerCase());
      return sortDirection === 'asc' ? result : -result;
    });

    const paginated = filtered.slice((page - 1) * limit, page * limit);
    return trainerMockJson({ success: true, message: 'Members fetched successfully', data: { members: paginated, total: filtered.length, page, limit } });
  }),

  http.get(`${BASE}${TRAINER_MEMBERS_URLS.API.STATS}`, async () => {
    await delay(MOCK_DELAY_MS);
    return trainerMockJson({ success: true, message: 'Stats fetched successfully', data: TRAINER_MEMBERS_MOCK_MEMBER_STATS });
  }),
];
