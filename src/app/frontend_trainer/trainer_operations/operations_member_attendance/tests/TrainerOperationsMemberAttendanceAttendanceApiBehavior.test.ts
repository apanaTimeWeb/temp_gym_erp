import { describe, expect, it, vi } from 'vitest';

import { fetchAllTrainerAttendanceRecords, fetchTrainerAttendanceRecords, createTrainerAttendanceRecord, checkOutTrainerAttendance } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/api/TrainerOperationsMemberAttendanceAttendanceApi';

import { TRAINER_ATTENDANCE_MOCK_RECORDS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/mocks/fixtures/TrainerOperationsMemberAttendanceAttendanceMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer attendance API behavior', () => {
  it('forwards search, page, and date filters to the API and renders returned records', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'OK', data: { attendance: [TRAINER_ATTENDANCE_MOCK_RECORDS[0]], total: 1, page: 2, limit: 10 } });
    const result = await fetchTrainerAttendanceRecords({ page: 2, limit: 10, search: 'Rahul', date: '2026-09-14' });
    expect(apiFetch.mock.calls[0]?.[0]).toEqual(expect.stringContaining('page=2'));
    expect(apiFetch.mock.calls[0][0]).toContain('search=Rahul');
    expect(apiFetch.mock.calls[0][0]).toContain('date=2026-09-14');
    expect(result.records[0]?.member?.name).toBe('Rahul Sharma');
    expect(result).toMatchObject({ page: 2, limit: 10, total: 1 });
  });
  it('rejects a paged attendance response whose page or limit differs from the request', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'req-attendance-page-mismatch', message: 'OK', data: { attendance: [], total: 0, page: 2, limit: 20 } });
    await expect(fetchTrainerAttendanceRecords({ page: 1, limit: 10 })).rejects.toThrow(/unexpected pagination metadata/i);
  });

  it('propagates the backend mutation message from the create path', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'Attendance recorded', data: TRAINER_ATTENDANCE_MOCK_RECORDS[0] });
    const result = await createTrainerAttendanceRecord({ type: 'MEMBER', memberId: 'm1', date: '2026-09-14' }, 'attendance-create-test-key');
    expect(result.message).toBe('Attendance recorded');
    expect(apiFetch.mock.calls[0]?.[1]?.headers).toMatchObject({ 'Idempotency-Key': 'attendance-create-test-key' });
  });

  it('uses the documented POST method for checkout and preserves idempotency', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'Check-out recorded', data: null });
    const result = await checkOutTrainerAttendance('staff-1', '2026-10-16T10:00:00.000Z', 'attendance-checkout-test-key');
    expect(apiFetch.mock.calls[0]?.[0]).toContain('/checkout/staff-1');
    expect(apiFetch.mock.calls[0]?.[1]).toMatchObject({ method: 'POST', body: JSON.stringify({ checkOutTime: '2026-10-16T10:00:00.000Z' }), headers: { 'Idempotency-Key': 'attendance-checkout-test-key' } });
    expect(result.message).toBe('Check-out recorded');
  });

  it('fetches every page for trainer history independently of table pagination', async () => {
    const makePage = (start: number, count: number) => Array.from({ length: count }, (_, index) => ({
      ...TRAINER_ATTENDANCE_MOCK_RECORDS[0],
      id: `history-${start + index}`,
      type: 'STAFF' as const,
      staffId: 's1',
      staff: { id: 's1', name: 'Trainer Demo' },
      memberId: undefined,
      member: undefined,
    }));
    apiFetch
      .mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'OK', data: { attendance: makePage(0, 10), total: 15, page: 1, limit: 10 } })
      .mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'OK', data: { attendance: makePage(10, 5), total: 15, page: 2, limit: 10 } });

    const records = await fetchAllTrainerAttendanceRecords({ type: 'STAFF', staffId: 's1' });

    expect(records).toHaveLength(15);
    expect(apiFetch).toHaveBeenCalledTimes(2);
    expect(apiFetch.mock.calls[0]?.[0]).toContain('staffId=s1');
    expect(apiFetch.mock.calls[0]?.[0]).toContain('page=1');
    expect(apiFetch.mock.calls[1]?.[0]).toContain('page=2');
    expect(apiFetch.mock.calls.every(([url]) => String(url).includes('type=STAFF'))).toBe(true);
    expect(apiFetch.mock.calls.every(([url]) => String(url).includes('sortBy=date') && String(url).includes('sortDirection=asc'))).toBe(true);
  });

  it('rejects history when the server total changes between pages', async () => {
    const makePage = (start: number, count: number) => Array.from({ length: count }, (_, index) => ({
      ...TRAINER_ATTENDANCE_MOCK_RECORDS[0],
      id: `history-${start + index}`,
      type: 'STAFF' as const,
      staffId: 's1',
      staff: { id: 's1', name: 'Trainer Demo' },
      memberId: undefined,
      member: undefined,
    }));
    apiFetch
      .mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'OK', data: { attendance: makePage(0, 10), total: 15, page: 1, limit: 10 } })
      .mockResolvedValueOnce({ success: true, requestId: 'req-attendance-test', message: 'OK', data: { attendance: makePage(10, 5), total: 16, page: 2, limit: 10 } });

    await expect(fetchAllTrainerAttendanceRecords({ type: 'STAFF', staffId: 's1' })).rejects.toThrow(/changed while it was loading/i);
  });

  it('rejects complete history when the first returned page does not match page one', async () => {
    const records = Array.from({ length: 10 }, (_, index) => ({ ...TRAINER_ATTENDANCE_MOCK_RECORDS[0], id: `wrong-page-${index}` }));
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'req-wrong-page', message: 'OK', data: { attendance: records, total: 15, page: 2, limit: 10 } });
    await expect(fetchAllTrainerAttendanceRecords({ type: 'STAFF', staffId: 'staff-1' })).rejects.toThrow(/unexpected pagination metadata/i);
  });
});
