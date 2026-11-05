import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';

import { SUPERADMIN_GYMS_DIRECTORY_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { SUPERADMIN_GYM_STATUS_CODES, SUPERADMIN_GYM_STATUS_VALUES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { MOCK_GYMS, MOCK_SUBSCRIPTION_PLANS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockFixtures';
import { emailOwnerSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_aliases.schemas';
import { gymCreateSchema, gymEditSchema, gymProvisionSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsMockHandlers owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, zod, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_aliases.schemas, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockFixtures, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


let mockGymsList: Tenant[] = [...MOCK_GYMS];
type CachedMutationResponse = { fingerprint: string; response: Response };
const idempotencyResponses = new Map<string, CachedMutationResponse>();
const emailOwnerPayloadSchema = emailOwnerSchema;
const ghostCookiePayloadSchema = z.object({ token: z.string().min(1) });
function readIdempotencyKey(request: Request): string | null { return request.headers.get('Idempotency-Key'); }
function missingIdempotencyKey(): Response {
    return HttpResponse.json({ success: false, message: 'Idempotency-Key is required for gym mutations.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
}
function getIdempotentReplay(key: string, fingerprint: string): Response | null {
    const previous = idempotencyResponses.get(key);
    if (!previous) return null;
    if (previous.fingerprint === fingerprint) return previous.response.clone();
    return HttpResponse.json({ success: false, message: 'Idempotency key was reused with a different request.', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
}
function cacheIdempotentResponse(key: string, fingerprint: string, response: Response): Response {
    idempotencyResponses.set(key, { fingerprint, response: response.clone() });
    return response;
}
function mutationFingerprint(request: Request, payload?: unknown): string {
    return JSON.stringify({ method: request.method, path: new URL(request.url).pathname, payload });
}
export function resetSuperadminGymsMockState(): void { mockGymsList = [...MOCK_GYMS]; idempotencyResponses.clear(); }
export const superadminGymsHandlers = [
    http.get('*' + SUPERADMIN_GYMS_MANAGEMENT_API.MOCK_EXPORT_FILE, async () => {
        const escape = (value: unknown) => `\"${String(value ?? '').replace(/\"/g, '\"\"')}\"`;
        const csv = ['id,name,status,plan', ...mockGymsList.map((gym) => [gym.id, gym.name, gym.status, gym.plan].map(escape).join(','))].join('\r\n') + '\r\n';
        return new HttpResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename=gyms.csv' } });
    }),
    http.get('*' + SUPERADMIN_GYMS_MANAGEMENT_API.EXPORT, async () => HttpResponse.json({ success: true, message: 'Export ready', data: { downloadUrl: SUPERADMIN_GYMS_MANAGEMENT_API.MOCK_EXPORT_FILE }, requestId: crypto.randomUUID()})),
    http.get('*' + SUPERADMIN_GYMS_MANAGEMENT_API.SUBSCRIPTION_PLANS, async () => {
        await delay(300);
        return HttpResponse.json({ success: true, message: 'Success', data: MOCK_SUBSCRIPTION_PLANS, requestId: crypto.randomUUID()});
    }),
    http.get('*' + SUPERADMIN_GYMS_MANAGEMENT_API.BASE, async ({ request }) => {
        try {
            await delay(400);
        const url = new URL(request.url);
        const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
        const limit = Math.max(Number(url.searchParams.get('limit') || '20'), 1);
        const search = (url.searchParams.get('search') || '').trim().toLowerCase();
        const status = url.searchParams.get('status') || '';
        const plan = url.searchParams.get('plan') || '';
        const sortBy = url.searchParams.get('sortBy') || 'createdAt';
        const segmentId = url.searchParams.get('segmentId') || '';
        const segmentIndex = segmentId ? Number(segmentId.replace(/\D/g, '')) : 0;
        const matchesSegment = (gymId: string, index: number) => {
            if (!segmentId) return true;
            if (['t1', 't2', 't3'].includes(gymId)) {
                const legacyMembership: Record<string, string[]> = { seg1: ['t1', 't3'], seg2: ['t2'], seg3: ['t2', 't3'], seg4: ['t1', 't3'] };
                return legacyMembership[segmentId]?.includes(gymId) ?? false;
            }
            return segmentIndex > 0 && ((index + segmentIndex) % 4 === 0);
        };
        const order = url.searchParams.get('order') === 'asc' ? 'asc' : 'desc';
        let rows = mockGymsList.filter((gym) => {
            const matchesSearch = !search || [gym.id, gym.name, gym.ownerName, gym.adminEmail, gym.city || '', gym.state || ''].some((value) => value.toLowerCase().includes(search));
            const matchesStatus = !status || status === 'All' || gym.status === status;
            const matchesPlan = !plan || plan === 'All' || gym.plan.toUpperCase() === plan.toUpperCase();
            const matchesSegmentRow = matchesSegment(gym.id, mockGymsList.indexOf(gym));
            return matchesSearch && matchesStatus && matchesPlan && matchesSegmentRow;
        });
        rows.sort((a,b) => { const av = a[sortBy as keyof typeof a]; const bv = b[sortBy as keyof typeof b]; const left=String(av ?? ''); const right=String(bv ?? ''); const cmp=left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }); return order === 'asc' ? cmp : -cmp; });
        const total = rows.length;
        const start = (page - 1) * limit;
        const paginatedData = rows.slice(start, start + limit);
        return HttpResponse.json({ success: true, message: 'Success', data: paginatedData, meta: { total, page, limit, totalPages: Math.max(Math.ceil(total / limit), 1), hasNextPage: page < (Math.max(Math.ceil(total / limit), 1)), hasPrevPage: page > 1}, requestId: crypto.randomUUID()});
        } catch (error) {
            throw error;
        }
    }),
    http.post('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/provision`, async ({ request }) => {
        await delay(300);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = gymProvisionSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Gym provisioning payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request, parsed.data);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        const body = parsed.data;
        const newGym: Tenant = {
            id: `t${Date.now()}-${mockGymsList.length}`,
            name: body.gymName,
            ownerName: body.ownerName,
            adminEmail: body.adminEmail,
            phone: body.phone,
            status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE,
            plan: String(body.planId ?? body.plan),
            createdAt: new Date().toISOString(),
            memberCount: 0,
            monthlyRevenue: 0,
            currency: 'INR',
            databaseName: 'gym_db',
            databaseVersion: 'v2.4.1',
            city: '',
            state: '',
            country: 'India',
            staffCount: 1,
            lastActiveAt: new Date().toISOString(),
        };
        mockGymsList = [newGym, ...mockGymsList];
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Gym provisioned successfully.', data: newGym, requestId: crypto.randomUUID()}));
    }),
    http.post('*' + SUPERADMIN_GYMS_MANAGEMENT_API.BASE, async ({ request }) => {
        await delay(250);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = gymCreateSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Gym creation payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request, parsed.data);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        const newGym = { ...parsed.data, id: `t${Date.now()}-${mockGymsList.length}`, createdAt: new Date().toISOString(), status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE, memberCount: 0, monthlyRevenue: 0, currency: 'INR', databaseName: 'gym_db', databaseVersion: 'v2.4.1', lastActiveAt: new Date().toISOString() } as Tenant;
        mockGymsList = [newGym, ...mockGymsList];
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Created', data: newGym, requestId: crypto.randomUUID()}));
    }),
    http.patch('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/:id/status`, async ({ params, request }) => {
        await delay(200);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const statusPayloadSchema = z.object({ status: z.enum(SUPERADMIN_GYM_STATUS_VALUES) });
        const parsed = statusPayloadSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Unsupported gym status.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request, parsed.data);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        const targetId = String(params.id);
        const exists = mockGymsList.some((gym) => gym.id === targetId);
        if (!exists) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const validStatus = parsed.data.status;
        mockGymsList = mockGymsList.map((gym) => gym.id === targetId ? { ...gym, status: validStatus } : gym);
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Status updated', data: mockGymsList.find((gym) => gym.id === targetId), requestId: crypto.randomUUID()}));
    }),
    http.patch('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/:id`, async ({ params, request }) => {
        await delay(250);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = gymEditSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Gym update payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request, parsed.data);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        const targetId = String(params.id);
        const exists = mockGymsList.some((gym) => gym.id === targetId);
        if (!exists) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        mockGymsList = mockGymsList.map((gym) => gym.id === targetId ? { ...gym, ...parsed.data } : gym);
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Updated', data: mockGymsList.find((gym) => gym.id === targetId), requestId: crypto.randomUUID()}));
    }),
    http.delete('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/:id`, async ({ params, request }) => {
        await delay(200);
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        const targetId = String(params.id);
        const exists = mockGymsList.some((gym) => gym.id === targetId);
        if (!exists) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        mockGymsList = mockGymsList.filter((gym) => gym.id !== targetId);
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Deleted', data: null, requestId: crypto.randomUUID()}));
    }),
    http.get('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/stats`, async () => {
        await delay(200);
        const total = mockGymsList.length;
        return HttpResponse.json({ success: true, message: 'Success', data: { total, active: mockGymsList.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE).length, suspended: mockGymsList.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED).length, trial: mockGymsList.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL).length, cancelled: mockGymsList.filter((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.CANCELLED).length }, requestId: crypto.randomUUID()});
    }),
    http.get('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/:id`, async ({ params }) => {
        await delay(300);
        const gym = mockGymsList.find(g => g.id === params.id);
        if (!gym) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json({ success: true, message: 'Success', data: gym, requestId: crypto.randomUUID()});
    }),
    http.post('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/:id/impersonate`, async ({ params, request }) => {
        await delay(250);
        const targetId = String(params.id);
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        if (!mockGymsList.some((gym) => gym.id === targetId)) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Impersonating', data: { token: `mock-jwt-token-${targetId}` }, requestId: crypto.randomUUID()}));
    }),
    http.post('*' + `${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}/:id/email`, async ({ params, request }) => {
        await delay(200);
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = emailOwnerPayloadSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Email payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const targetId = String(params.id);
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request, parsed.data);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        if (!mockGymsList.some((gym) => gym.id === targetId)) return HttpResponse.json({ success: false, message: 'Gym not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Owner email queued.', data: null, requestId: crypto.randomUUID()}));
    }),
    http.post('*' + SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.SET_COOKIE_PROXY, async ({ request }) => {
        let rawBody: unknown;
        try { rawBody = await request.json(); } catch { return HttpResponse.json({ success: false, message: 'Invalid JSON body.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); }
        const parsed = ghostCookiePayloadSchema.safeParse(rawBody);
        if (!parsed.success) return HttpResponse.json({ success: false, message: 'Ghost-login token is required.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request, parsed.data);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Ghost-login cookie configured.', data: null, requestId: crypto.randomUUID()}));
    }),
    http.post('*' + SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY, async ({ request }) => {
        const key = readIdempotencyKey(request);
        if (!key) return missingIdempotencyKey();
        const fingerprint = mutationFingerprint(request);
        const replay = getIdempotentReplay(key, fingerprint);
        if (replay) return replay;
        return cacheIdempotentResponse(key, fingerprint, HttpResponse.json({ success: true, message: 'Ghost login exited.', data: null, requestId: crypto.randomUUID()}));
    }),
];
