import { describe, expect, it, vi } from 'vitest';
import { selfCheckInTrainerAttendance, checkOutTrainerAttendance } from '../api/TrainerOperationsTrainerAttendanceAttendanceApi';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));
import { z } from 'zod';
import { TrainerInfrastructureApiResponseSchema } from '../schemas/TrainerOperationsTrainerAttendanceTrainerInfrastructureApiResponseSchema';
const schema = TrainerInfrastructureApiResponseSchema(z.object({ total: z.number() }));
describe('Trainer attendance canonical transport', () => {
  it('accepts only complete success/failure envelopes', () => {
    expect(schema.safeParse({success:true,requestId:'req-1',message:'ok',data:{total:2}}).success).toBe(true);
    expect(schema.safeParse({success:true,message:'ok',data:{total:2}}).success).toBe(false);
    expect(schema.safeParse({success:false,requestId:'req-2',message:'no',data:null,errorCode:'DENIED',statusCode:403}).success).toBe(true);
    expect(schema.safeParse({success:false,requestId:'req-3',message:'no',data:null}).success).toBe(false);
    expect(schema.safeParse({success:true,requestId:'req-4',message:'bad',data:null}).success).toBe(false);
  });

  it('rejects a complete-history response whose returned page does not match the requested page', async () => {
    const { fetchAllTrainerAttendanceRecords } = await import('../api/TrainerOperationsTrainerAttendanceAttendanceApi');
    const { TRAINER_ATTENDANCE_MOCK_RECORDS } = await import('../mocks/fixtures/TrainerOperationsTrainerAttendanceAttendanceMockData');
    const attendance = Array.from({ length: 10 }, (_, index) => ({ ...TRAINER_ATTENDANCE_MOCK_RECORDS[0], id: `wrong-page-${index}`, type: 'STAFF' as const, staffId: 's1', memberId: undefined, member: undefined }));
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'req-page', message: 'OK', data: { attendance, total: 15, page: 2, limit: 10 } });
    await expect(fetchAllTrainerAttendanceRecords({ type: 'STAFF', staffId: 's1' })).rejects.toThrow(/unexpected pagination metadata/i);
  });

  it('rejects canonical failure envelopes for trainer self check-in and check-out', async () => {
    const failure = { success: false, requestId: 'req-denied', message: 'Attendance denied', data: null, errorCode: 'DENIED', statusCode: 403 };
    apiFetch.mockResolvedValueOnce(failure).mockResolvedValueOnce(failure);
    await expect(selfCheckInTrainerAttendance('staff-1', 'checkin-key')).rejects.toMatchObject({ message: 'Attendance denied', errorCode: 'DENIED', statusCode: 403 });
    await expect(checkOutTrainerAttendance('staff-1', '2026-10-16T10:00:00.000Z', 'checkout-key')).rejects.toMatchObject({ message: 'Attendance denied', errorCode: 'DENIED', statusCode: 403 });
  });
});
