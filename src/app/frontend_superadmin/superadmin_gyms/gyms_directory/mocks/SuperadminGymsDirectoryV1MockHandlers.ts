import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_GYMS_DIRECTORY_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockFixtures';
import { SuperadminGymsV1BulkMutationRequestSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas';

import type { SuperadminGymsV1Data } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_v1.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsV1MockHandlers owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockFixtures, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_v1.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers and mutable server-like state for the tenant business-controls feature.


let mockGymsBusinessControls: SuperadminGymsV1Data = structuredClone(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);

export function resetSuperadminGymsMockState(): void {
  mockGymsBusinessControls = structuredClone(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
}

function filterRows(rows: SuperadminGymsV1Data['rows'], filterKey: string, search: string): SuperadminGymsV1Data['rows'] {
  return rows.filter((row) => {
    const matchesSearch = !search || [row.id, row.name, row.plan, row.status, row.lastAction].some((value) => String(value ?? '').toLocaleLowerCase().includes(search));
    if (!matchesSearch) return false;
    switch (filterKey) {
      case 'active': return row.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE;
      case 'trial': return row.status === SUPERADMIN_GYM_STATUS_CODES.TRIAL;
      case 'suspended': return row.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED;
      case 'high-income': return row.income >= 7_500_000;
      case 'high-usage': return row.usage >= 90;
      case 'health-risk': return row.health < 70 && row.income > 5_000_000;
      case 'payment-recovery': return row.paymentRecoveryOpen;
      default: return true;
    }
  });
}

export const superadminGymsV1Handlers = [
  http.get('*' + SUPERADMIN_GYMS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE, ({ request }) => {
    const url = new URL(request.url);
    const filterKey = url.searchParams.get('filter') ?? 'all';
    const search = (url.searchParams.get('search') ?? '').trim().toLocaleLowerCase();
    const sortBy = url.searchParams.get('sortBy') ?? 'name';
    const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1);
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') ?? '10') || 10));
    const filteredRows = filterRows(mockGymsBusinessControls.rows, filterKey, search).sort((left, right) => {
      const a = String(left[sortBy as keyof typeof left] ?? '');
      const b = String(right[sortBy as keyof typeof right] ?? '');
      const comparison = a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      return order === 'asc' ? comparison : -comparison;
    });
    const total = filteredRows.length;
    const rows = filteredRows.slice((page - 1) * limit, page * limit);
    return HttpResponse.json({ success: true, message: 'Tenant business-control data loaded.', data: { ...mockGymsBusinessControls, rows }, meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)), hasNextPage: page < (Math.max(1, Math.ceil(total / limit))), hasPrevPage: page > 1}, requestId: crypto.randomUUID()});
  }),
  http.post('*' + SUPERADMIN_GYMS_MANAGEMENT_API.BUSINESS_CONTROLS.BACKEND_API.BASE, async ({ request }) => {
    const parsed = SuperadminGymsV1BulkMutationRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return HttpResponse.json({ success: false, message: 'Bulk action payload is invalid.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    }
    const { action, gymIds, targetPlan } = parsed.data;
    const selected = new Set(gymIds);
    mockGymsBusinessControls = {
      ...mockGymsBusinessControls,
      rows: mockGymsBusinessControls.rows.map((row) => {
        if (!selected.has(row.id)) return row;
        if (action === 'Suspend selected') return { ...row, status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED, lastAction: 'Tenant suspended' };
        if (action === 'Extend trial') return { ...row, trialDays: row.trialDays + 7, lastAction: 'Trial extended by 7 days' };
        if (action === 'Move plan') return { ...row, plan: targetPlan ?? row.plan, lastAction: `Plan moved to ${targetPlan ?? row.plan}` };
        if (action === 'Send message') return { ...row, lastAction: 'Message queued' };
        return { ...row, lastAction: 'Export prepared' };
      }),
    };
    return HttpResponse.json({ success: true, message: `Bulk action completed for ${gymIds.length} tenant${gymIds.length === 1 ? '' : 's'}.`, data: mockGymsBusinessControls, requestId: crypto.randomUUID()});
  }),
];
