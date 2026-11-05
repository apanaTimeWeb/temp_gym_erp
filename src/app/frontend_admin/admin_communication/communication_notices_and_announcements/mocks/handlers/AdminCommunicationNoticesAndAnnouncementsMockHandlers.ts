// RESPONSIBILITY: Owns MSW handlers for the Admin announcements feature.
// DATA FLOW: announcements API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { announcementFormValuesSchema } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/schemas/AdminCommunicationNoticesAndAnnouncementsSchemas';
import { ANNOUNCEMENT_STATUS_VALUES } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/constants/AdminCommunicationNoticesAndAnnouncementsConstants';
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { normalizeAdminAnnouncementsPage, normalizeAdminAnnouncementsMockLimit } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/utils/AdminCommunicationNoticesAndAnnouncementsPageBoundary';

import type { AdminAnnouncementsJsonObject, AnnouncementRecord } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsMockHandlerTypes';
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
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Number.isSafeInteger(limit) && limit > 0 ? Math.min(limit, 100) : 10;
  const safePage = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import type { Announcement } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsTypes';
import { getAdminAnnouncementsMockState, setAdminAnnouncementsMockState } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockState';

const gymNameByGymId: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };

/**
 * gymNamesFor is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function gymNamesFor(ids: string[]): string[] { return ids.map((id) => gymNameByGymId[id] ?? id); }

/**
 * buildAnnouncementRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildAnnouncementRecord(input: Record<string, unknown>): AnnouncementRecord {
  const gymIds = Array.isArray(input.gymIds) ? (input.gymIds as string[]) : [];
  const audience = (Array.isArray(input.audience) ? input.audience : ['all']) as AnnouncementRecord['audience'];
  const now = new Date().toISOString();
  return {
    id: `ann-${globalThis.crypto.randomUUID()}`,
    title: String(input.title ?? 'Untitled announcement'),
    body: String(input.body ?? ''),
    priority: input.priority === 'high' || input.priority === 'low' ? input.priority : 'medium',
    status: ANNOUNCEMENT_STATUS_VALUES.ACTIVE,
    audience,
    gymIds,
    gymNames: gymNamesFor(gymIds),
    publishedAt: String(input.publishedAt ?? now),
    expiresAt: String(input.expiresAt ?? now),
    createdBy: 'Admin',
    createdAt: now,
    viewCount: 0,
    isPinned: Boolean(input.isPinned),
  };
}

/**
 * applyAnnouncementUpdate is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function applyAnnouncementUpdate(record: AnnouncementRecord, input: Record<string, unknown>): AnnouncementRecord {
  const gymIds = Array.isArray(input.gymIds) ? (input.gymIds as string[]) : record.gymIds;
  return {
    ...record,
    title: input.title !== undefined ? String(input.title) : record.title,
    body: input.body !== undefined ? String(input.body) : record.body,
    priority: input.priority === 'high' || input.priority === 'medium' || input.priority === 'low' ? input.priority : record.priority,
    audience: Array.isArray(input.audience) ? (input.audience as AnnouncementRecord['audience']) : record.audience,
    gymIds,
    gymNames: gymNamesFor(gymIds),
    publishedAt: input.publishedAt !== undefined ? String(input.publishedAt) : record.publishedAt,
    expiresAt: input.expiresAt !== undefined ? String(input.expiresAt) : record.expiresAt,
    isPinned: input.isPinned !== undefined ? Boolean(input.isPinned) : record.isPinned,
  };
}

export const adminAnnouncementsMockHandlers = [
  http.get('*/admin/announcements', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('scenario') === 'error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_INTERNAL_SERVER_ERROR', statusCode: StatusCodes.INTERNAL_SERVER_ERROR, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load announcements.' }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    const page = normalizeAdminAnnouncementsPage(url.searchParams.get('page'));
    const limit = normalizeAdminAnnouncementsMockLimit(url.searchParams.get('limit'));
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const gymId = url.searchParams.get('gymId');
    const filtered = getAdminAnnouncementsMockState().filter((item) => {
      const matchSearch = !search || item.title.toLowerCase().includes(search) || item.body.toLowerCase().includes(search);
      const matchStatus = !status || status === 'all' || item.status === status;
      const matchPriority = !priority || priority === 'all' || item.priority === priority;
      const matchGym = !gymId || item.gymIds.includes(gymId) || item.gymIds.includes('all');
      return matchSearch && matchStatus && matchPriority && matchGym;
    });
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/announcements/kpis', ({ request }) => { if (new URL(request.url).searchParams.get('scenario') === 'error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_INTERNAL_SERVER_ERROR', statusCode: StatusCodes.INTERNAL_SERVER_ERROR, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load announcement summary.' }, { status: StatusCodes.INTERNAL_SERVER_ERROR }); return ok({
    total: getAdminAnnouncementsMockState().length,
    active: getAdminAnnouncementsMockState().filter((item) => item.status === ANNOUNCEMENT_STATUS_VALUES.ACTIVE).length,
    scheduled: getAdminAnnouncementsMockState().filter((item) => item.status === ANNOUNCEMENT_STATUS_VALUES.SCHEDULED).length,
    expired: getAdminAnnouncementsMockState().filter((item) => item.status === ANNOUNCEMENT_STATUS_VALUES.EXPIRED).length,
    totalViews: getAdminAnnouncementsMockState().reduce((sum, item) => sum + item.viewCount, 0),
    pinned: getAdminAnnouncementsMockState().filter((item) => item.isPinned).length,
  }); }),
  http.post('*/admin/announcements', async ({ request }) => {
    const parsed = announcementFormValuesSchema.safeParse(await parseRequestBody(request));
    if (!parsed.success) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Invalid announcement payload.', validationErrors: parsed.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) }, { status: StatusCodes.BAD_REQUEST });
    const record = buildAnnouncementRecord(parsed.data as unknown as Record<string, unknown>);
    setAdminAnnouncementsMockState([record, ...getAdminAnnouncementsMockState()]);
    return ok(record, 'Announcement created');
  }),
  http.patch('*/admin/announcements/:id', async ({ request }) => {
    const parsed = announcementFormValuesSchema.safeParse(await parseRequestBody(request));
    if (!parsed.success) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Invalid announcement payload.', validationErrors: parsed.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) }, { status: StatusCodes.BAD_REQUEST });
    const body = parsed.data as unknown as Record<string, unknown>;
    const id = new URL(request.url).pathname.split('/').pop() ?? '';
    const index = getAdminAnnouncementsMockState().findIndex((item) => item.id === id);
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Announcement not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = applyAnnouncementUpdate(getAdminAnnouncementsMockState()[index]!, body);
    setAdminAnnouncementsMockState(getAdminAnnouncementsMockState().map((item, itemIndex) => itemIndex === index ? updated : item));
    return ok(updated, 'Announcement updated');
  }),
  http.delete('*/admin/announcements/:id', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const id = new URL(request.url).pathname.split('/').pop() ?? '';
    const index = getAdminAnnouncementsMockState().findIndex((item) => item.id === id);
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Announcement not found' }, { status: StatusCodes.NOT_FOUND });
    setAdminAnnouncementsMockState(getAdminAnnouncementsMockState().filter((_, itemIndex) => itemIndex !== index));
    return ok(null, 'Announcement deleted');
  }),
  http.patch('*/admin/announcements/:id/pin', async ({ request }) => {
    const id = new URL(request.url).pathname.split('/').slice(-2)[0] ?? '';
    const record = getAdminAnnouncementsMockState().find((item) => item.id === id);
    if (!record) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Announcement not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = { ...record, isPinned: !record.isPinned };
    setAdminAnnouncementsMockState(getAdminAnnouncementsMockState().map((item) => item.id === updated.id ? updated : item));
    return ok(updated, 'Announcement updated');
  })
];
