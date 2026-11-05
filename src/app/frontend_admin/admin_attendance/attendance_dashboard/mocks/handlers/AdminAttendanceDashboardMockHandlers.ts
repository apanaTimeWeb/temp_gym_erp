import { normalizeAdminAttendanceDashboardMockPagination } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardMockPagination';
// RESPONSIBILITY: Owns MSW handlers for the Admin attendance feature.
// DATA FLOW: attendance API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.

import { format } from 'date-fns';
import { http, HttpResponse } from 'msw';

import type { AdminAttendanceJsonObject } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardMockHandlerTypes';
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
function asRecord(value: unknown): AdminAttendanceJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminAttendanceJsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.min(100, Number.isSafeInteger(limit) && limit > 0 ? limit : 10);
  const totalPages = Math.max(1, Math.ceil(data.length / safeLimit));
  const safePage = Math.min(totalPages, Number.isSafeInteger(page) && page > 0 ? page : 1);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 }  , requestId: globalThis.crypto.randomUUID()});
};

import { MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/mocks/fixtures/AdminAttendanceDashboardMockFixtures';


const DAY_MS = 86_400_000;
const ATTENDANCE_FIXTURE_ANCHOR = new Date('2026-10-06T00:00:00.000Z');
function getCurrentAttendanceRecords() {
  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const anchorKey = format(ATTENDANCE_FIXTURE_ANCHOR, 'yyyy-MM-dd');
  const shiftDays = Math.round((new Date(`${todayKey}T00:00:00.000Z`).getTime() - new Date(`${anchorKey}T00:00:00.000Z`).getTime()) / DAY_MS);
  return MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED.map((record) => {
    const originalDate = new Date(`${record.date}T00:00:00.000Z`);
    const shiftedDate = new Date(originalDate.getTime() + shiftDays * DAY_MS);
    const shiftTimestamp = (value: string | null) => value ? new Date(new Date(value).getTime() + shiftDays * DAY_MS).toISOString() : null;
    return { ...record, date: format(shiftedDate, 'yyyy-MM-dd'), checkInTime: shiftTimestamp(record.checkInTime) ?? record.checkInTime, checkOutTime: shiftTimestamp(record.checkOutTime) };
  });
}
function rangeStartAndEnd(range: string, today = new Date()) {
  const start = new Date(`${format(today, 'yyyy-MM-dd')}T00:00:00.000Z`);
  const end = new Date(`${format(today, 'yyyy-MM-dd')}T23:59:59.999Z`);
  if (range === 'yesterday') { start.setUTCDate(start.getUTCDate() - 1); end.setUTCDate(end.getUTCDate() - 1); }
  else if (range === 'this_week') start.setUTCDate(start.getUTCDate() - 6);
  else if (range === 'this_month') start.setUTCDate(1);
  else if (range === 'last_month') { start.setUTCMonth(start.getUTCMonth() - 1, 1); end.setUTCDate(0); }
  return { start, end };
}

export const adminAttendanceMockHandlers = [
  // --- Attendance ---
  http.get('*/admin/attendance/records', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const status = (url.searchParams.get('status') ?? '').toLowerCase();
    const branchId = url.searchParams.get('branchId');
    const dateRange = url.searchParams.get('dateRange') ?? 'today';
    const page = normalizeAdminAttendanceDashboardMockPagination(url.searchParams.get('page'), 1, 100_000);
    const limit = normalizeAdminAttendanceDashboardMockPagination(url.searchParams.get('limit'), 10, 100);
    const now = new Date();
    const nowISO = format(now, 'yyyy-MM-dd');
    const { start, end } = rangeStartAndEnd(dateRange, now);
    const allRecords = getCurrentAttendanceRecords();
    const filtered = allRecords.filter((a) => {
      const matchesText = !search || `${a.memberName} ${a.memberPhone}`.toLowerCase().includes(search);
      const matchesBranch = !branchId || branchId === 'all' || a.branchId === branchId;
      const matchesStatus = !status || status === 'all' || a.status.toLowerCase() === status;
      const day = new Date(`${a.date}T12:00:00Z`);
      const matchesDate = dateRange === 'today' ? a.date === nowISO : day >= start && day <= end;
      return matchesText && matchesBranch && matchesStatus && matchesDate;
    });
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/attendance/summary', ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId');
    const range = url.searchParams.get('dateRange') ?? 'today';
    const { start, end } = rangeStartAndEnd(range);
    const records = getCurrentAttendanceRecords().filter((record) => (!branchId || branchId === 'all' || record.branchId === branchId) && new Date(`${record.date}T12:00:00.000Z`) >= start && new Date(`${record.date}T12:00:00.000Z`) <= end);
    const todayKey = format(new Date(), 'yyyy-MM-dd');
    const todayRecords = records.filter((record) => record.date === todayKey);
    const hourCounts = new Map<string, number>();
    for (const record of todayRecords) { const hour = format(new Date(record.checkInTime), 'HH:00'); hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + 1); }
    const peakHour = [...hourCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
    const uniqueMembersThisMonth = new Set(getCurrentAttendanceRecords().filter((record) => record.date.slice(0, 7) === todayKey.slice(0, 7) && (!branchId || branchId === 'all' || record.branchId === branchId)).map((record) => record.memberId)).size;
    return ok({ todayTotal: todayRecords.length, todayPresent: todayRecords.filter((record) => record.status === 'present').length, todayLate: todayRecords.filter((record) => record.status === 'late').length, weeklyAverage: Math.round(records.length / Math.max(1, range === 'this_month' ? Number(todayKey.slice(8, 10)) : 7)), peakHour, trendVsLastWeek: 0, uniqueMembersThisMonth });
  }),
  http.get('*/admin/attendance/trend', ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId');
    const range = url.searchParams.get('dateRange') ?? 'this_week';
    const { start, end } = rangeStartAndEnd(range);
    const rows = getCurrentAttendanceRecords().filter((record) => (!branchId || branchId === 'all' || record.branchId === branchId) && new Date(`${record.date}T12:00:00.000Z`) >= start && new Date(`${record.date}T12:00:00.000Z`) <= end);
    const counts = new Map<string, number>();
    rows.forEach((record) => counts.set(record.date, (counts.get(record.date) ?? 0) + 1));
    return ok([...counts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count })));
  })
];
