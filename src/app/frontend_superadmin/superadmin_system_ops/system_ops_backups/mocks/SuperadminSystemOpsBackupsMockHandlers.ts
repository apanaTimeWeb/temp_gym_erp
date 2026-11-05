/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsMockHandlers owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants, @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockFixtures, @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_schedule.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_schedule.types, @/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_BACKUPS_STATUS_CODES, SUPERADMIN_BACKUPS_FILTER_STATUS_CODES, SUPERADMIN_BACKUPS_PAGE_SIZE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';
import { MOCK_SUPERADMIN_BACKUPS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockFixtures';
import { SuperadminBackupsScheduleInputSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/schemas/superadmin_system_ops_backups_schedule.schemas';

import type { SuperadminBackupsSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_schedule.types';
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';
import type { ApiResponse } from '@/lib/api';



const BASE_URL = '*/superadmin/system-ops/backups';
let mockBackups = [...MOCK_SUPERADMIN_BACKUPS];
type BackupMutationEntry = { fingerprint: string; response: import('msw').JsonBodyType };
const backupMutationLedger = new Map<string, BackupMutationEntry>();
let mockBackupSchedule: SuperadminBackupsSchedule = { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' };
export function resetSuperadminBackupsMockState(): void {
    mockBackups = [...MOCK_SUPERADMIN_BACKUPS];
    backupMutationLedger.clear();
    mockBackupSchedule = { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' };
}

export const superadminBackupsHandlers = [
    http.get('*' + `${BASE_URL}/schedule`, async () => HttpResponse.json<ApiResponse<SuperadminBackupsSchedule>>({ success: true as const, message: 'Backup schedule loaded', data: mockBackupSchedule, requestId: crypto.randomUUID()})),
    http.patch('*' + `${BASE_URL}/schedule`, async ({ request }) => {
        const parsed = SuperadminBackupsScheduleInputSchema.safeParse(await request.json());
        if (!parsed.success) return HttpResponse.json<ApiResponse<SuperadminBackupsSchedule>>({ success: false, message: 'Invalid backup schedule', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const key = request.headers.get('Idempotency-Key');
        if (!key) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const fingerprint = JSON.stringify({ operation: 'update-schedule', payload: parsed.data });
        const previous = backupMutationLedger.get(key);
        if (previous) return previous.fingerprint === fingerprint ? HttpResponse.json(previous.response) : HttpResponse.json({ success: false, message: 'Idempotency key conflict', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
        mockBackupSchedule = { ...parsed.data, updatedAt: new Date().toISOString() };
        const response: ApiResponse<SuperadminBackupsSchedule> = { success: true as const, message: 'Backup schedule updated', data: mockBackupSchedule, requestId: crypto.randomUUID()};
        backupMutationLedger.set(key, { fingerprint, response });
        return HttpResponse.json(response);
    }),
    http.get('*' + BASE_URL, async ({ request }) => {
        await delay(250);
        const u = new URL(request.url);
        const page = Number(u.searchParams.get('page') || '1');
        const limit = Number(u.searchParams.get('limit') || String(SUPERADMIN_BACKUPS_PAGE_SIZE));
        const search = (u.searchParams.get('search') || '').toLowerCase();
        const status = u.searchParams.get('status');
        const type = u.searchParams.get('type');
        if (type && type !== 'ALL') {
            return HttpResponse.json<ApiResponse<BackupRecord[]>>({ success: false, message: 'Backup type filtering is unavailable until the canonical type contract is supplied', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        }
        let filtered = [...mockBackups];
        if (search)
            filtered = filtered.filter((b) => `${b.tenantName} ${b.databaseName} ${b.id}`.toLowerCase().includes(search));
        if (status && status !== SUPERADMIN_BACKUPS_FILTER_STATUS_CODES.ALL)
            filtered = filtered.filter((b) => b.status === status);
        const total = filtered.length;
        const data = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<BackupRecord[]>>({ success: true as const, message: 'Success', data, meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)), hasNextPage: page < (Math.max(1, Math.ceil(total / limit))), hasPrevPage: page > 1}, requestId: crypto.randomUUID()});
    }),
    http.post('*' + `${BASE_URL}/trigger`, async ({ request }) => { await delay(300); const key = request.headers.get('Idempotency-Key'); if (!key) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST }); const fingerprint = JSON.stringify({ operation: 'trigger' }); const previous = backupMutationLedger.get(key); if (previous) return previous.fingerprint === fingerprint ? HttpResponse.json(previous.response) : HttpResponse.json({ success: false, message: 'Idempotency key conflict', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT }); const created: BackupRecord = { ...MOCK_SUPERADMIN_BACKUPS[0]!, id: `bk${Date.now()}`, status: SUPERADMIN_BACKUPS_STATUS_CODES.IN_PROGRESS, timestamp: new Date().toISOString() }; mockBackups = [created, ...mockBackups]; const response = { success: true as const, message: 'Backup snapshot queued', data: null, requestId: crypto.randomUUID()}; backupMutationLedger.set(key, { fingerprint, response }); return HttpResponse.json<ApiResponse<import('msw').JsonBodyType>>(response); }),
    http.post('*' + `${BASE_URL}/:id/restore`, async ({ params, request }) => {
        await delay(350);
        const id = String(params.id);
        const key = request.headers.get('Idempotency-Key');
        if (!key) return HttpResponse.json({ success: false, message: 'Idempotency-Key is required', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
        const fingerprint = JSON.stringify({ operation: 'restore', id });
        const previous = backupMutationLedger.get(key);
        if (previous) return previous.fingerprint === fingerprint ? HttpResponse.json(previous.response) : HttpResponse.json({ success: false, message: 'Idempotency key conflict', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
        const existing = mockBackups.find((backup) => backup.id === id);
        if (!existing) {
            return HttpResponse.json<ApiResponse<import('msw').JsonBodyType>>({ success: false, message: 'Backup snapshot not found', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        mockBackups = mockBackups.map((backup) => backup.id === id ? { ...backup, status: SUPERADMIN_BACKUPS_STATUS_CODES.IN_PROGRESS, timestamp: new Date().toISOString() } : backup);
        const response = { success: true as const, message: 'Backup restore started', data: null, requestId: crypto.randomUUID()}; backupMutationLedger.set(key, { fingerprint, response });
        return HttpResponse.json<ApiResponse<import('msw').JsonBodyType>>(response);
    }),
    http.get('*' + `${BASE_URL}/:id/download`, async ({ params }) => HttpResponse.json<ApiResponse<{
        downloadUrl: string;
    }>>({ success: true as const, message: 'Backup download ready', data: { downloadUrl: `/mock-backups/${String(params.id)}.sql` }, requestId: crypto.randomUUID()})),
];
