import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/utils/TrainerCoachingIndividualProgressIdempotentMockResponse';
import { env } from '@/config/env';

import { delay, http, HttpResponse } from 'msw';

import { TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingHttpStatusCodes';

import { TrainerProgressTrackingCreateProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';

import { getTrainerProgressTrackingMockProgress, replaceTrainerProgressTrackingMockProgress, TRAINER_PROGRESS_TRACKING_MOCK_CURRENT_TRAINER, isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/handlers/TrainerCoachingIndividualProgressProgressTrackingMockState';

import type { TrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

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

const response = <T,>(data: T, message: string) => trainerMockJson({ success: true, message, data });

export const TrainerProgressTrackingMutationMockHandlers = [
  http.post(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRIES(':memberId')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = TrainerProgressTrackingCreateProgressEntrySchema.safeParse(await request.json());
    if (!parsedBody.success) return trainerMockJson({ success: false, message: 'Invalid progress payload.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const body = parsedBody.data;
    const newEntry: TrainerProgressTrackingProgressEntry = {
      id: `prog_${Date.now()}`,
      memberId: params.memberId as string,
      ...body,
      bmi: Math.round((body.weightKg / Math.pow(body.heightCm / 100, 2)) * 10) / 10,
      recordedBy: TRAINER_PROGRESS_TRACKING_MOCK_CURRENT_TRAINER,
    };
    replaceTrainerProgressTrackingMockProgress([...getTrainerProgressTrackingMockProgress(), newEntry]);
    return response(newEntry, 'Progress entry created.');
  
    });
  }),

  http.patch(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRY_DETAIL(':memberId', ':entryId')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const parsedBody = TrainerProgressTrackingCreateProgressEntrySchema.partial().safeParse(await request.json());
    if (!parsedBody.success) return trainerMockJson({ success: false, message: 'Invalid progress update payload.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const currentEntries = getTrainerProgressTrackingMockProgress();
    const entryIndex = currentEntries.findIndex((entry) => entry.id === params.entryId && entry.memberId === params.memberId);
    if (entryIndex === -1) return trainerMockJson({ success: false, message: 'Progress entry not found.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.NOT_FOUND });
    const oldEntry = currentEntries[entryIndex]!;
    if (!isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer(oldEntry)) return trainerMockJson({ success: false, message: 'Only the trainer who recorded this entry may update it.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.FORBIDDEN });
    const updatedWeight = parsedBody.data.weightKg ?? oldEntry.weightKg;
    const updatedHeight = parsedBody.data.heightCm ?? oldEntry.heightCm;
    const updatedEntry = { ...oldEntry, ...parsedBody.data, bmi: Math.round((updatedWeight / Math.pow(updatedHeight / 100, 2)) * 10) / 10 };
    const nextEntries = [...currentEntries];
    nextEntries[entryIndex] = updatedEntry;
    replaceTrainerProgressTrackingMockProgress(nextEntries);
    return response(updatedEntry, 'Progress entry updated.');
  
    });
  }),

  http.delete(`${BASE}${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRY_DETAIL(':memberId', ':entryId')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const currentEntries = getTrainerProgressTrackingMockProgress();
    const exists = currentEntries.some((entry) => entry.id === params.entryId && entry.memberId === params.memberId);
    if (!exists) return trainerMockJson({ success: false, message: 'Progress entry not found.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.NOT_FOUND });
    const targetEntry = currentEntries.find((entry) => entry.id === params.entryId && entry.memberId === params.memberId);
    if (!targetEntry || !isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer(targetEntry)) return trainerMockJson({ success: false, message: 'Only the trainer who recorded this entry may delete it.', data: null }, { status: TRAINER_PROGRESS_TRACKING_HTTP_STATUS_CODES.FORBIDDEN });
    replaceTrainerProgressTrackingMockProgress(currentEntries.filter((entry) => !(entry.id === params.entryId && entry.memberId === params.memberId)));
    return response(null, 'Progress entry deleted.');
  
    });
  }),
];
