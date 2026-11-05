import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';

import { env } from '@/config/env';
import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';
import { TrainerAttendanceMockHandlers, resetTrainerAttendanceMockData } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/mocks/handlers/TrainerOperationsMemberAttendanceAttendanceMockHandlers';

const server = setupServer(...TrainerAttendanceMockHandlers);
const base = env.NEXT_PUBLIC_API_URL;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => {
  resetTrainerAttendanceMockData();
  server.resetHandlers();
});

describe('TrainerAttendanceMockHandlers', () => {
  it('rejects a member create without member identity and leaves mutable state unchanged', async () => {
    const listUrl = `${base}${TRAINER_ATTENDANCE_URLS.API.BASE}?page=1&limit=10`;
    const before = await (await fetch(listUrl)).json() as { data: { attendance: unknown[]; total: number } };

    const response = await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'MEMBER', date: '2026-10-16', checkIn: '06:00' }),
    });
    expect(response.status).toBe(422);

    const after = await (await fetch(listUrl)).json() as { data: { attendance: unknown[]; total: number } };
    expect(after.data.total).toBe(before.data.total);
    expect(after.data.attendance).toEqual(before.data.attendance);
  });

  it('accepts a valid member record and makes the new record visible in the subsequent list read', async () => {
    const response = await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'attendance-test-create' },
      body: JSON.stringify({ type: 'MEMBER', memberId: 'm1', date: '2026-10-16', checkIn: '06:30' }),
    });
    expect(response.status).toBe(200);

    const list = await (await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}?page=1&limit=10`)).json() as { data: { attendance: Array<{ memberId?: string; checkIn?: string }> } };
    expect(list.data.attendance.some((record) => record.memberId === 'm1' && record.checkIn === '06:30')).toBe(true);
  });


  it('rejects self check-in without staff identity and does not create an unscoped record', async () => {
    const before = await (await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}?type=STAFF&page=1&limit=10`)).json() as { data: { total: number } };
    const response = await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'STAFF', date: '2026-10-16', isSelfCheckIn: true }),
    });
    expect(response.status).toBe(422);
    const after = await (await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}?type=STAFF&page=1&limit=10`)).json() as { data: { total: number } };
    expect(after.data.total).toBe(before.data.total);
  });

  it('keeps top-level and nested staff identity consistent for valid self check-in', async () => {
    const response = await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'attendance-self-check-in-test' },
      body: JSON.stringify({ type: 'STAFF', staffId: 'trainer-rbg1', date: '2026-10-16', isSelfCheckIn: true }),
    });
    expect(response.status).toBe(200);
    const list = await (await fetch(`${base}${TRAINER_ATTENDANCE_URLS.API.BASE}?type=STAFF&staffId=trainer-rbg1&page=1&limit=10`)).json() as { data: { attendance: Array<{ staffId?: string; staff?: { id: string } }> } };
    expect(list.data.attendance).toHaveLength(1);
    expect(list.data.attendance[0]).toMatchObject({ staffId: 'trainer-rbg1', staff: { id: 'trainer-rbg1' } });
  });

});
