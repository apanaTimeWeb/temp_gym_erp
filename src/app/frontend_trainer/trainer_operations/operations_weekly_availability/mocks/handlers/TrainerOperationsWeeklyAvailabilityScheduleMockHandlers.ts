import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/mocks/utils/TrainerOperationsWeeklyAvailabilityIdempotentMockResponse';
import { StatusCodes } from 'http-status-codes';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_SCHEDULE_STATUS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/utils/TrainerOperationsWeeklyAvailabilityScheduleConstants';

import { TRAINER_SCHEDULE_MOCK_AVAILABILITY, TRAINER_SCHEDULE_MOCK_LEAVES } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/mocks/fixtures/TrainerOperationsWeeklyAvailabilityScheduleMockData';

import { TrainerScheduleCreateLeaveDtoSchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';

import { TrainerScheduleWeeklyAvailabilityArraySchema } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/schemas/TrainerOperationsWeeklyAvailabilityScheduleDomainSchemas';

import { TRAINER_SCHEDULE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';

/** Canonical typed MSW envelope keeps the mock response consistent with API consumers. */
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

let currentAvailability = [...TRAINER_SCHEDULE_MOCK_AVAILABILITY];
let currentLeaves = [...TRAINER_SCHEDULE_MOCK_LEAVES];

export const TrainerScheduleMockHandlers = [
  http.get(`${BASE}${TRAINER_SCHEDULE_URLS.API.SCHEDULE}`, async () => {
    await delay(MOCK_DELAY_MS);
    return trainerMockJson({ success: true, message: 'Schedule fetched successfully', data: { availability: currentAvailability, leaves: currentLeaves } });
  }),

  http.patch(`${BASE}${TRAINER_SCHEDULE_URLS.API.AVAILABILITY}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const parsedData = TrainerScheduleWeeklyAvailabilityArraySchema.safeParse(await request.json());
    if (!parsedData.success) return trainerMockJson({ success: false, message: 'Invalid availability payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const data = parsedData.data;
    currentAvailability = [...data];
    return trainerMockJson({ success: true, message: 'Availability updated successfully', data: currentAvailability });
  
    });
  }),

  http.post(`${BASE}${TRAINER_SCHEDULE_URLS.API.LEAVES}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS);
    const parsedData = TrainerScheduleCreateLeaveDtoSchema.safeParse(await request.json());
    if (!parsedData.success) return trainerMockJson({ success: false, message: 'Invalid leave payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const data = parsedData.data;
    const newLeave = {
      ...data,
      id: `LR-${Math.floor(Math.random() * 10000)}`,
      trainerId: 'TR-101',
      status: TRAINER_SCHEDULE_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };
    currentLeaves = [newLeave, ...currentLeaves];
    return trainerMockJson({ success: true, message: 'Leave request submitted successfully', data: newLeave });
  
    });
  })
];
