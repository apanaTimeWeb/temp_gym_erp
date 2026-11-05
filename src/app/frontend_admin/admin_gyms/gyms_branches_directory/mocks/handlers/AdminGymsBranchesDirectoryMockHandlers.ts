// RESPONSIBILITY: Owns MSW handlers for the Admin branches feature.
// DATA FLOW: Admin Branches API → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { ADMIN_BRANCHES_API } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/config/admin_gyms_branches_directory.url_config';
import { MOCK_BRANCHES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockFixtures';
import { BRANCH_TIME_RANGE_MULTIPLIERS } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockConstants';
import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTimeRangeTypes';

/**
 * scaleBranch is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function scaleBranch(branch: typeof MOCK_BRANCHES[number], multiplier: number) {
  return { ...branch, revenue: Math.round(branch.revenue * multiplier), expenses: Math.round(branch.expenses * multiplier) };
}

export const adminBranchesMockHandlers = [
  http.get(`*${ADMIN_BRANCHES_API.base}`, ({ request }) => {
    const url = new URL(request.url);
    const rangeValue = url.searchParams.get('range') ?? 'monthly';
    if (rangeValue === 'custom') { const startDate = url.searchParams.get('startDate') ?? ''; const endDate = url.searchParams.get('endDate') ?? ''; const valid = /^\d{4}-\d{2}-\d{2}$/.test(startDate) && /^\d{4}-\d{2}-\d{2}$/.test(endDate) && startDate <= endDate; if (!valid) return HttpResponse.json({ errorCode: 'ADMIN_API_BAD_REQUEST', statusCode: StatusCodes.BAD_REQUEST, requestId: globalThis.crypto.randomUUID(), success: false, message: 'A valid startDate and endDate are required for custom range', data: null }, { status: StatusCodes.BAD_REQUEST }); return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_IMPLEMENTED', statusCode: StatusCodes.NOT_IMPLEMENTED, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Custom-range branch aggregates require server time-series data not present in the supplied fixtures', data: null }, { status: StatusCodes.NOT_IMPLEMENTED }); }
    const range = (rangeValue as AdminBranchesTimeRange);
    const multiplier = BRANCH_TIME_RANGE_MULTIPLIERS[range] ?? BRANCH_TIME_RANGE_MULTIPLIERS.monthly;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_BRANCHES.map((branch) => scaleBranch(branch, multiplier)) , requestId: globalThis.crypto.randomUUID() });
  }),
  http.get(`*${ADMIN_BRANCHES_API.detailPattern}`, ({ params }) => {
    const branch = MOCK_BRANCHES.find((item) => item.id === String(params.branchId));
    if (!branch) return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Branch not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Branch detail loaded', data: branch , requestId: globalThis.crypto.randomUUID() });
  }),
];
