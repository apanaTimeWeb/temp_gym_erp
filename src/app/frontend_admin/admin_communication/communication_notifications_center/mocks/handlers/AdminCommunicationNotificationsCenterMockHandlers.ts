// RESPONSIBILITY: Owns MSW handlers for the Admin notifications feature.
// DATA FLOW: notifications API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import type { AdminNotificationsJsonObject } from '@/app/frontend_admin/admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): AdminNotificationsJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminNotificationsJsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import { getAdminNotificationsMockState, setAdminNotificationsMockState } from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockState';

export const adminNotificationsMockHandlers = [
  http.get('*/admin/notifications', ({ request }) => {
    const url = new URL(request.url);
    const unreadOnly = url.searchParams.get('read') === 'false';
    const data = getAdminNotificationsMockState().filter((notification) => unreadOnly ? !notification.read : true);
    return ok(data);
  }),
  http.patch('*/admin/notifications/:id/read', ({ params }) => {
    const notification = getAdminNotificationsMockState().find((item) => item.id === String(params.id));
    if (!notification) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Notification not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = { ...notification, read: true };
    setAdminNotificationsMockState(getAdminNotificationsMockState().map((item) => item.id === updated.id ? updated : item));
    return ok(updated, 'Notification marked as read');
  }),
  http.patch('*/admin/notifications/read-all', () => {
    setAdminNotificationsMockState(getAdminNotificationsMockState().map((notification) => ({ ...notification, read: true })));
    return ok(null, 'Notifications marked as read');
  })
];
