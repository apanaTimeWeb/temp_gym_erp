// RESPONSIBILITY: Owns MSW handlers for the Admin blacklist feature.
// DATA FLOW: blacklist API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { format } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import type { AdminBlacklistJsonObject, BlacklistRecord } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementMockHandlerTypes';
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
function asRecord(value: unknown): AdminBlacklistJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminBlacklistJsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Number.isSafeInteger(limit) && limit >= 1 ? Math.min(limit, 100) : 10;
  const totalPages = Math.max(1, Math.ceil(data.length / safeLimit));
  const safePage = Number.isSafeInteger(page) && page >= 1 ? Math.min(page, totalPages) : 1;
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import type { BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';
import { getAdminBlacklistMockState } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/fixtures/AdminMembersBlacklistManagementMockState';
import { blacklistFormSchema } from '@/app/frontend_admin/admin_members/members_blacklist_management/schemas/AdminMembersBlacklistManagementSchemas';

/** Only finite, positive safe integer page/limit values are valid for the mock. */
export function readMockPositiveInteger(value: string | null, fallback: number): number {
  const parsed = value === null ? NaN : Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 1 ? parsed : fallback;
}

const gymNameByGymId: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };

/**
 * gymNamesFor is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function gymNamesFor(ids: string[]): { ids: string[]; names: string[] } {
  const mapped = ids.map((id) => ({ id, name: id === 'all' ? 'All Gyms' : (gymNameByGymId[id] ?? id) }));
  return { ids: mapped.map((g) => g.id), names: mapped.map((g) => g.name) };
}

/**
 * buildBlacklistRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildBlacklistRecord(input: AdminBlacklistJsonObject): BlacklistRecord {
  const gyms = Array.isArray(input.assignedGyms) ? (input.assignedGyms as string[]) : ['all'];
  const names = gymNamesFor(gyms);
  return {
    id: `bl-${globalThis.crypto.randomUUID()}`,
    memberId: String(input.memberId ?? `M-${globalThis.crypto.randomUUID()}`),
    memberName: String(input.memberName ?? 'Unknown member'),
    memberPhone: String(input.memberPhone ?? ''),
    memberEmail: String(input.memberEmail ?? ''),
    reason: String(input.reason ?? 'Policy violation'),
    blacklistedBy: 'Admin',
    blacklistedAt: format(new Date(), 'yyyy-MM-dd'),
    scope: input.scope === 'specific' ? 'specific' : 'global',
    assignedGyms: names.ids,
    assignedGymNames: names.names,
    isActive: true,
  };
}

/** Extracts the blacklist resource segment from both /:id and /:id/{remove,propagate} endpoints. */
export function getAdminBlacklistResourceIdFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments.at(-1);
  const hasActionSuffix = lastSegment === 'remove' || lastSegment === 'propagate';
  return (hasActionSuffix ? segments.at(-2) : lastSegment) ?? '';
}

export const adminBlacklistMockHandlers = [
  http.get('*/admin/blacklist', ({ request }) => { const url = new URL(request.url); const search=(url.searchParams.get('search')??'').trim().toLowerCase(); const active=url.searchParams.get('isActive'); const scope=url.searchParams.get('scope'); const gymId=url.searchParams.get('gymId'); const all=getAdminBlacklistMockState().filter(x => (!search || `${x.memberName} ${x.memberEmail} ${x.memberPhone} ${x.memberId}`.toLowerCase().includes(search)) && (!active || active === 'all' || String(x.isActive) === active) && (!scope || scope === 'all' || x.scope === scope) && (!gymId || gymId === 'all' || x.assignedGyms.includes(gymId) || x.scope === 'global')); const page=readMockPositiveInteger(url.searchParams.get('page'), 1), limit=readMockPositiveInteger(url.searchParams.get('limit'), 10); return paged(all,page,limit); }),
  http.get('*/admin/blacklist/kpis', () => ok({
    totalBlacklisted: getAdminBlacklistMockState().filter((entry) => entry.isActive).length,
    globalBans: getAdminBlacklistMockState().filter((entry) => entry.isActive && entry.scope === 'global').length,
    gymSpecificBans: getAdminBlacklistMockState().filter((entry) => entry.isActive && entry.scope === 'specific').length,
    addedThisMonth: getAdminBlacklistMockState().filter((entry) => entry.blacklistedAt.startsWith(format(new Date(), 'yyyy-MM'))).length,
  })),
  http.post('*/admin/blacklist', async ({ request }) => {
    const raw = await parseRequestBody(request);
    const parsed = blacklistFormSchema.safeParse(raw);
    if (!parsed.success) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Invalid blacklist payload' }, { status: StatusCodes.BAD_REQUEST });
    const payload = parsed.data;
    const record = buildBlacklistRecord(payload as AdminBlacklistJsonObject);
    getAdminBlacklistMockState().unshift(record);
    return ok(record, 'Member added to blacklist');
  }),
  http.delete('*/admin/blacklist/:id/remove', ({ request }) => {
    const id = getAdminBlacklistResourceIdFromPathname(new URL(request.url).pathname);
    const index = getAdminBlacklistMockState().findIndex((entry) => entry.id === id);
    if (index === -1) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Blacklist entry not found' }, { status: StatusCodes.NOT_FOUND });
    getAdminBlacklistMockState().splice(index, 1);
    return ok(null, 'Member removed from blacklist');
  }),
  http.patch('*/admin/blacklist/:id', ({ request }) => {
    const id = getAdminBlacklistResourceIdFromPathname(new URL(request.url).pathname);
    const record = getAdminBlacklistMockState().find((entry) => entry.id === id);
    if (!record) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Blacklist entry not found' }, { status: StatusCodes.NOT_FOUND });
    record.isActive = !record.isActive;
    return ok(record, 'Blacklist status updated');
  }),
  http.patch('*/admin/blacklist/:id/propagate', ({ request }) => {
    const id = getAdminBlacklistResourceIdFromPathname(new URL(request.url).pathname);
    const record = getAdminBlacklistMockState().find((entry) => entry.id === id);
    if (!record) return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Blacklist entry not found' }, { status: StatusCodes.NOT_FOUND });
    record.scope = 'global';
    record.assignedGyms = ['all'];
    record.assignedGymNames = ['All Gyms'];
    return ok(record, 'Blacklist propagated');
  })
];
