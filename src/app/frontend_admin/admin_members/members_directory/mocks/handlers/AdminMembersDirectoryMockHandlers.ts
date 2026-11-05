import { getAdminMembersExpiryEligibility } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryExpiryEligibility';
import { normalizeAdminMembersDirectoryMockPagination } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryMockPagination';
// RESPONSIBILITY: Owns mutable MSW handlers for the Admin members feature.
// DATA FLOW: members API client → module-owned MSW handler → mutable fixture state → TanStack Query/UI.

import { format } from 'date-fns';
import { MEMBER_STATUS_VALUES } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { MOCK_ADMIN_MEMBERS_EXPANDED } from '@/app/frontend_admin/admin_members/members_directory/mocks/fixtures/AdminMembersDirectoryMockFixtures';
import type { AdminMember, AdminMembersSummary } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
import { AdminMembersCreateExportCsv } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryCreateExportCsv';


const membersState = structuredClone(MOCK_ADMIN_MEMBERS_EXPANDED);

/**
 * filterMembersForRequest is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function filterMembersForRequest(url: URL): AdminMember[] {
  const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
  const status = url.searchParams.get('status');
  const branchId = url.searchParams.get('branchId');
  const gender = url.searchParams.get('gender');
  const plan = url.searchParams.get('plan');
  const expiryFilter = url.searchParams.get('expiryFilter');
  return membersState.filter((member) => {
    const expiry = getAdminMembersExpiryEligibility(member.expiryDate, new Date());
    const matchesExpiry = !expiryFilter || expiryFilter === 'all'
      || (expiryFilter === 'this_week' && expiry.thisWeek)
      || (expiryFilter === 'this_month' && expiry.thisMonth);
    return (!search || `${member.name} ${member.email} ${member.phone}`.toLowerCase().includes(search))
      && (!status || status === 'all' || member.status === status)
      && (!branchId || branchId === 'all' || member.branchId === branchId)
      && (!gender || gender === 'all' || member.gender === gender)
      && (!plan || plan === 'all' || member.planName.toLowerCase().includes(plan.toLowerCase().replace('starter', 'basic')))
      && matchesExpiry;
  });
}

/**
 * computeSummary is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function computeSummary(): AdminMembersSummary {
  const nowMonth = format(new Date(), 'yyyy-MM');
  return {
    totalMembers: membersState.length,
    activeMembers: membersState.filter((member) => member.status === MEMBER_STATUS_VALUES.ACTIVE).length,
    expiredMembers: membersState.filter((member) => member.status === MEMBER_STATUS_VALUES.EXPIRED).length,
    pendingMembers: membersState.filter((member) => member.status === MEMBER_STATUS_VALUES.PENDING).length,
    expiringThisWeek: membersState.filter((member) => {
      return getAdminMembersExpiryEligibility(member.expiryDate, new Date()).thisWeek;
    }).length,
    expiringThisMonth: membersState.filter((member) => getAdminMembersExpiryEligibility(member.expiryDate, new Date()).thisMonth).length,
    totalOutstanding: membersState.reduce((sum, member) => sum + member.pendingAmount, 0),
    newThisMonth: membersState.filter((member) => member.joinDate.slice(0, 7) === nowMonth).length,
  };
}

const response = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

export const adminMembersMockHandlers = [
  http.get('*/admin/members', ({ request }) => {
    const url = new URL(request.url);
    const page = normalizeAdminMembersDirectoryMockPagination(url.searchParams.get('page'), 1);
    const limit = normalizeAdminMembersDirectoryMockPagination(url.searchParams.get('limit'), 10, 100);
    const filtered = filterMembersForRequest(url);
    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = filtered.slice(start, start + limit);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: pageData,
      meta: { total: filtered.length, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 },
     requestId: globalThis.crypto.randomUUID() });
  }),
  http.get('*/admin/members/summary', () => response(computeSummary())),
  http.get('*/admin/members/export', ({ request }) => {
    const csv = AdminMembersCreateExportCsv(filterMembersForRequest(new URL(request.url)));
    return HttpResponse.json({ success: true, message: 'Member export ready', data: csv , requestId: globalThis.crypto.randomUUID() });
  }),
  http.get('*/admin/members/:id', ({ params }) => {
    const member = membersState.find((item) => item.id === String(params.id));
    return member
      ? response(member)
      : HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Member not found', data: null }, { status: StatusCodes.NOT_FOUND });
  }),
  http.get('*/admin/members/list', ({ request }) => {
    const url = new URL(request.url);
    const page = normalizeAdminMembersDirectoryMockPagination(url.searchParams.get('page'), 1);
    const limit = normalizeAdminMembersDirectoryMockPagination(url.searchParams.get('limit'), 10, 100);
    const filtered = filterMembersForRequest(url);
    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = filtered.slice(start, start + limit);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: pageData,
      meta: { total: filtered.length, page: safePage, limit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 },
     requestId: globalThis.crypto.randomUUID() });
  }),
];
