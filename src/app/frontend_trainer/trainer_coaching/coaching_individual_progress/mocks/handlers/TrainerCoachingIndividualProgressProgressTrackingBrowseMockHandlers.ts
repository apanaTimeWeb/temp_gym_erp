import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_PROGRESS_TRACKING_GOAL_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';

import { getTrainerProgressTrackingMockProgress } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/handlers/TrainerCoachingIndividualProgressProgressTrackingMockState';

import { TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/fixtures/TrainerCoachingIndividualProgressProgressTrackingMockData';

import type { TrainerProgressTrackingPaginationMeta, TrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

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
const MOCK_DELAY_MS = 300;
const PROGRESS_DEFAULT_LIMIT = 10;

const response = <T,>(data: T, message: string, meta?: TrainerProgressTrackingPaginationMeta) =>
  trainerMockJson({ success: true, message, data, ...(meta ? { meta } : {}) });

export const TrainerProgressTrackingBrowseMockHandlers = [
  http.get(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.MEMBERS}`, async () => {
    await delay(MOCK_DELAY_MS);
    return response(TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS, 'Progress members loaded.');
  }),

  http.get(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRIES(':memberId')}`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? String(PROGRESS_DEFAULT_LIMIT));
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return trainerMockJson({ success: false, message: 'Invalid pagination values.', data: null }, { status: 400 });
    const sortBy = url.searchParams.get('sortBy') ?? 'date';
    const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';
    const filtered = getTrainerProgressTrackingMockProgress().filter((entry) => entry.memberId === params.memberId);
    filtered.sort((left, right) => {
      const leftValue = left[sortBy as keyof TrainerProgressTrackingProgressEntry];
      const rightValue = right[sortBy as keyof TrainerProgressTrackingProgressEntry];
      const comparison = String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true });
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const entries = filtered.slice((safePage - 1) * limit, safePage * limit);
    return response({ entries, total, page: safePage, limit }, 'Progress entries loaded.', { total, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 });
  }),

  http.get(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.SUMMARY(':memberId')}`, async ({ params }) => {
    await delay(MOCK_DELAY_MS);
    const entries = getTrainerProgressTrackingMockProgress().filter((entry) => entry.memberId === params.memberId).sort((a, b) => a.date.localeCompare(b.date));
    const firstEntry = entries[0] || null;
    const latestEntry = entries[entries.length - 1] || null;
    const summary = {
      memberId: params.memberId,
      memberName: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS.find((member) => member.id === params.memberId)?.name || 'Unknown',
      totalEntries: entries.length,
      latestEntry,
      firstEntry,
      weightChangeKg: firstEntry && latestEntry ? latestEntry.weightKg - firstEntry.weightKg : 0,
      bmiChange: firstEntry && latestEntry ? latestEntry.bmi - firstEntry.bmi : 0,
      goalStatus: TRAINER_PROGRESS_TRACKING_GOAL_STATUS.ON_TRACK,
    };
    return response(summary, 'Progress summary loaded.');
  }),
];
