import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_account/account_notifications/mocks/utils/TrainerAccountNotificationsIdempotentMockResponse';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_NOTIFICATIONS_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_account/account_notifications/utils/TrainerAccountNotificationsNotificationsHttpStatusCodes';

import { TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS } from '@/app/frontend_trainer/trainer_account/account_notifications/mocks/fixtures/TrainerAccountNotificationsNotificationsMockData';

import { TRAINER_NOTIFICATIONS_URLS } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';

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
let notificationsDB = TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS.map(n => ({ ...n }));
export const TrainerNotificationsMockHandlers = [
  http.get(`${BASE}${TRAINER_NOTIFICATIONS_URLS.API.LIST}`, async ({ request }) => {
    await delay(250); const url = new URL(request.url); const page = Number(url.searchParams.get('page') ?? '1'); const limit = Number(url.searchParams.get('limit') ?? '10');
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) return trainerMockJson({ success: false, message: 'Invalid pagination values.', data: null }, { status: 400 });
    const start = (page - 1) * limit;
    return trainerMockJson({ success: true, message: 'Notifications loaded.', data: { notifications: notificationsDB.slice(start, start + limit), total: notificationsDB.length, page, limit } });
  }),
  http.patch(`${BASE}${TRAINER_NOTIFICATIONS_URLS.API.MARK_READ(':id')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
      await delay(200); const index = notificationsDB.findIndex(n => n.id === params.id); if (index === -1) return trainerMockJson({ success: false, message: 'Notification not found.', data: null }, { status: TRAINER_NOTIFICATIONS_HTTP_STATUS_CODES.NOT_FOUND });
      notificationsDB[index] = { ...notificationsDB[index]!, unread: false };
      return trainerMockJson({ success: true, message: 'Notification marked as read.', data: { ...notificationsDB[index]! } });
  
    });
  }),
  http.patch(`${BASE}${TRAINER_NOTIFICATIONS_URLS.API.MARK_ALL_READ}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
      await delay(200); notificationsDB = notificationsDB.map(n => ({ ...n, unread: false }));
      return trainerMockJson({ success: true, message: 'All notifications marked as read.', data: null });
  
    });
  }),
];
