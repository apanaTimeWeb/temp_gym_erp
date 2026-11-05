import { replayTrainerMockMutation } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/mocks/utils/TrainerOperationsTrainerAttendanceIdempotentMockResponse';

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_ATTENDANCE_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceHttpStatusCodes';

import { TRAINER_ATTENDANCE_MOCK_RECORDS, TRAINER_ATTENDANCE_MOCK_MEMBERS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/mocks/fixtures/TrainerOperationsTrainerAttendanceAttendanceMockData';

import { TrainerAttendanceCreateDtoSchema } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/schemas/TrainerOperationsTrainerAttendanceAttendanceDomainSchemas';

import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/config/trainer_operations_trainer_attendance.url_config';

;

/** Canonical typed MSW envelope keeps the mock response consistent with API consumers. */
const trainerMockJson = (body: unknown, init?: Parameters<typeof HttpResponse.json>[1]) => {
  if (!body || typeof body !== 'object' || !('success' in body)) return HttpResponse.json(body as Parameters<typeof HttpResponse.json>[0], init);
  const response = body as Record<string, unknown>;
  const success = response.success === true;
  const statusCode = init?.status ?? 400;
  return HttpResponse.json({
    ...response,
    requestId: typeof response.requestId === 'string' ? response.requestId : crypto.randomUUID(),
    ...(!success ? {
      data: null,
      errorCode: typeof response.errorCode === 'string' ? response.errorCode : `MOCK_HTTP_${statusCode}`,
      statusCode,
    } : {}),
  }, { ...init, status: success ? init?.status : statusCode });
};

const BASE = env.NEXT_PUBLIC_API_URL;
const MOCK_DELAY_MS = 400; const MOCK_SHORT_DELAY_MS = 200; const MOCK_FAST_DELAY_MS = 250;
let attendanceDB = [...TRAINER_ATTENDANCE_MOCK_RECORDS];

/** Reset mutable mock state between tests so failed mutations can be verified as non-mutating. */
export function resetTrainerAttendanceMockData(): void {
  attendanceDB = [...TRAINER_ATTENDANCE_MOCK_RECORDS];
}

const todayIsoDate = () => new Date().toISOString().slice(0, 10);
export const TrainerAttendanceMockHandlers = [
  http.get(`${BASE}${TRAINER_ATTENDANCE_URLS.API.BASE}`, async ({ request }) => {
    await delay(MOCK_FAST_DELAY_MS); const url = new URL(request.url); const type = url.searchParams.get('type'); const staffId = url.searchParams.get('staffId'); const search = url.searchParams.get('search')?.toLowerCase() || ''; const date = url.searchParams.get('date'); const page = Number(url.searchParams.get('page') ?? '1'); const limit = Number(url.searchParams.get('limit') ?? '10');
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
      return trainerMockJson({success:false,message:'Invalid pagination values.',data:null},{status:400});
    }
    let filtered = [...attendanceDB];
    if (type) filtered = filtered.filter(r => r.type === type);
    if (staffId) filtered = filtered.filter(r => r.staffId === staffId || r.staff?.id === staffId);
    if (search) filtered = filtered.filter(r => r.member?.name?.toLowerCase().includes(search) || r.staff?.name?.toLowerCase().includes(search));
    if (date && date !== 'ALL_TIME') { const today = new Date(); filtered = filtered.filter(r => { const d = new Date(r.date); if (date === 'TODAY') return d.toDateString() === today.toDateString(); if (date === 'YESTERDAY') { const y = new Date(today); y.setDate(y.getDate()-1); return d.toDateString() === y.toDateString(); } if (date === 'LAST_7_DAYS') { const cutoff = new Date(today); cutoff.setDate(cutoff.getDate()-7); return d >= cutoff && d <= today; } if (date === 'THIS_MONTH') return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(); return true; }); }
    const sortBy = url.searchParams.get('sortBy') || 'date'; const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 1 : -1;
    filtered.sort((a, b) => {
      const getValue = (record: typeof filtered[number]) => sortBy === 'name' ? (record.member?.name ?? record.staff?.name ?? '') : sortBy === 'durationMinutes' ? (record.durationMinutes ?? -1) : (record[sortBy as keyof typeof record] ?? '');
      const left = getValue(a); const right = getValue(b);
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * sortDirection;
      return String(left).localeCompare(String(right)) * sortDirection;
    });
    const start = (page-1)*limit; const totalPages = Math.ceil(filtered.length / limit) || 1;
    return trainerMockJson({ success: true, message: 'Attendance records fetched successfully', data: { attendance: filtered.slice(start,start+limit), total: filtered.length, page, limit }, meta: { total: filtered.length, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 } });
  }),
  http.get(`${BASE}${TRAINER_ATTENDANCE_URLS.API.STATS}`, async () => { await delay(MOCK_SHORT_DELAY_MS); const todaysRecords = attendanceDB.filter((record) => record.date === todayIsoDate()); const data = { totalCheckIns: todaysRecords.length, memberCheckIns: todaysRecords.filter((record) => record.type === 'MEMBER').length, staffCheckIns: todaysRecords.filter((record) => record.type === 'STAFF').length }; return trainerMockJson({ success: true, message: 'Attendance stats fetched successfully', data }); }),
  http.get(`${BASE}${TRAINER_ATTENDANCE_URLS.API.MEMBERS_BASIC}`, async () => { await delay(MOCK_SHORT_DELAY_MS); return trainerMockJson({ success: true, message: 'Attendance members fetched successfully', data: TRAINER_ATTENDANCE_MOCK_MEMBERS }); }),
  http.post(`${BASE}${TRAINER_ATTENDANCE_URLS.API.BASE}`, async ({ request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_DELAY_MS); const parsedBody = TrainerAttendanceCreateDtoSchema.safeParse(await request.json()); if (!parsedBody.success) return trainerMockJson({ success: false, message: 'Invalid attendance payload.', data: null }, { status: TRAINER_ATTENDANCE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY }); const body = parsedBody.data;
    if (body.isSelfCheckIn) {
      const staffId = body.staffId; const open = attendanceDB.find(r => r.staffId === staffId && r.type === 'STAFF' && !r.checkOut);
      if (open) return trainerMockJson({ success: false, message: 'You are already checked in.', data: null }, { status: TRAINER_ATTENDANCE_HTTP_STATUS_CODES.CONFLICT });
      if (!staffId?.trim()) return trainerMockJson({ success: false, message: 'A staff identity is required for self check-in.', data: null }, { status: TRAINER_ATTENDANCE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
      const staff = { id: staffId, name: 'Trainer Demo' };
      const record = { id: `att-${Date.now()}`, type: 'STAFF' as const, date: todayIsoDate(), checkIn: new Date().toISOString(), staffId, staff, checkInMethod: 'Self' as const };
      attendanceDB = [record as typeof attendanceDB[0], ...attendanceDB];
      return trainerMockJson({ success: true, message: 'Check-in recorded.', data: null });
    }
    const record = { id: `att-${Date.now()}`, type: body.type, date: body.date, checkIn: body.checkIn, checkOut: body.checkOut, notes: body.notes, memberId: body.memberId, staffId: body.staffId, member: body.memberId ? TRAINER_ATTENDANCE_MOCK_MEMBERS.find(m => m.id === body.memberId) : undefined, checkInMethod: 'Manual' as const };
    attendanceDB = [record, ...attendanceDB]; return trainerMockJson({ success: true, message: 'Attendance record created successfully', data: record });
  
    });
  }),
  http.post(`${BASE}${TRAINER_ATTENDANCE_URLS.API.CHECKOUT(':staffId')}`, async ({ params, request }) => {
    return replayTrainerMockMutation(request, async () => {
    await delay(MOCK_FAST_DELAY_MS); const index = attendanceDB.findIndex(r => r.staffId === params.staffId && r.type === 'STAFF' && !r.checkOut); if (index === -1) return trainerMockJson({ success: false, message: 'No open attendance found.', data: null }, { status: TRAINER_ATTENDANCE_HTTP_STATUS_CODES.NOT_FOUND }); const body = await request.json() as { checkOutTime?: unknown }; const checkOut = typeof body.checkOutTime === 'string' ? body.checkOutTime : new Date().toISOString(); attendanceDB[index] = { ...attendanceDB[index]!, checkOut }; return trainerMockJson({ success: true, message: 'Check-out recorded.', data: null });
  
    });
  }),
];

