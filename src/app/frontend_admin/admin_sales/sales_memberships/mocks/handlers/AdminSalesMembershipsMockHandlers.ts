// RESPONSIBILITY: MSW handler for the Sales all-memberships endpoint only.
import { getAdminSalesMembershipsDaysLeft } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsFormatters';
import { http, HttpResponse } from 'msw';
import { normalizeAdminSalesMembershipsMockPagination } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsMockPagination';
import { ADMIN_SALES_MEMBERSHIP_FILTER, ADMIN_SALES_MEMBERSHIP_STATUS, DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';
import { MOCK_ADMIN_ALL_MEMBERSHIPS } from '@/app/frontend_admin/admin_sales/sales_memberships/mocks/fixtures/AdminSalesMembershipsMockFixtures';
import { isValidAdminSalesMembershipsDateRange, getAdminSalesMembershipsPresetDateRange } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsDateRangeUtils';

const fail = (message: string, code: number) => HttpResponse.json(
  { success: false, requestId: globalThis.crypto.randomUUID(), message, errorCode: code === 400 ? 'ADMIN_API_400' : 'ADMIN_API_500', statusCode: code, data: null },
  { status: code },
);

export const adminSalesMockHandlers = [http.get('*/admin/sales/all-memberships', ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get('scenario') === 'error' || url.searchParams.get('mockError') === 'true') {
    return fail('Simulated Sales membership-list failure', 500);
  }
  const page = normalizeAdminSalesMembershipsMockPagination(url.searchParams.get('page'), 1);
  const limit = normalizeAdminSalesMembershipsMockPagination(url.searchParams.get('limit'), 10, 100);
  const search = (url.searchParams.get('search') ?? '').toLowerCase();
  const branchId = url.searchParams.get('branchId') ?? 'all';
  const range = url.searchParams.get('range') ?? 'this_month';
  const startDate = url.searchParams.get('startDate') ?? '';
  const endDate = url.searchParams.get('endDate') ?? '';
  const filter = url.searchParams.get('membershipFilter') ?? 'all';
  if (!(DATE_FILTERS as readonly string[]).includes(range)) return fail('Unsupported Sales range.', 400);
  if (range === 'custom' && !isValidAdminSalesMembershipsDateRange(startDate, endDate)) {
    return fail('A valid startDate and endDate are required for custom range.', 400);
  }
  const window = range === 'custom'
    ? { startDate, endDate }
    : getAdminSalesMembershipsPresetDateRange(range as Parameters<typeof getAdminSalesMembershipsPresetDateRange>[0]);
  // Use one instant and one expiry calculation per member, avoiding a split
  // classification at the request boundary. The original response DTO is unchanged.
  const observedAt = Date.now();
  const classified = MOCK_ADMIN_ALL_MEMBERSHIPS.filter(member =>
    (!branchId || branchId === 'all' || member.branch === ({ b1: 'Andheri East', b2: 'Bandra West', b3: 'Powai', b4: 'Thane' } as Record<string, string>)[branchId]) &&
    (!search || [member.name, member.email, member.phone, member.plan?.name].some(value => String(value ?? '').toLowerCase().includes(search))) &&
    (!window || (member.createdAt.slice(0, 10) >= window.startDate && member.createdAt.slice(0, 10) <= window.endDate)),
  ).map(member => {
    const daysLeft = getAdminSalesMembershipsDaysLeft(member.expiryDate, observedAt);
    const isExpiredByDate = Number.isFinite(daysLeft) && daysLeft <= 0;
    const normalizedMember = isExpiredByDate && member.status !== ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED
      ? { ...member, status: ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED }
      : member;
    return { member: normalizedMember, daysLeft, isExpiredByDate };
  });

  const filtered = classified.filter(({ member, daysLeft, isExpiredByDate }) => {
    if (filter === ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE) {
      return member.status === ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE && daysLeft > 30;
    }
    if (filter === ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON) {
      return member.status === ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE && daysLeft > 0 && daysLeft <= 30;
    }
    if (filter === ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED) {
      return member.status === ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED || isExpiredByDate;
    }
    return true;
  });
  const start = (page - 1) * limit;
  return HttpResponse.json({
    success: true,
    requestId: globalThis.crypto.randomUUID(),
    message: 'Sales memberships fetched',
    data: { members: filtered.slice(start, start + limit).map(row => row.member), total: filtered.length },
  });
})];
