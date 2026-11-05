import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiFetch } from '@/lib/api';
import { TrainerScheduleApi } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/api/TrainerOperationsLeaveRequestsScheduleApi';
import { TRAINER_SCHEDULE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/config/trainer_operations_leave_requests.url_config';
vi.mock('@/lib/api', () => ({apiFetch: vi.fn()}));
const dto = {startDate:'2026-11-20',endDate:'2026-11-21',reason:'Family event',leaveType:'Personal' as const};
const leave = { ...dto, id:'LR-001', trainerId:'TR-101', status:'PENDING' as const, createdAt:'2026-11-01T00:00:00.000Z'};
beforeEach(() => vi.clearAllMocks());
describe('Leave Request owned mutation API', () => {
 it('preserves canonical URL and idempotency header while decoding success response', async () => {
  vi.mocked(apiFetch).mockResolvedValue({success:true,requestId:'req-leave',message:'Created',data:leave});
  const result = await TrainerScheduleApi.requestLeave(dto,'a550b8aa-87a4-42d2-90a8-26602f28f2ec');
  expect(result.data).toMatchObject({id:'LR-001'});
  expect(apiFetch).toHaveBeenCalledWith(TRAINER_SCHEDULE_URLS.API.LEAVES,expect.objectContaining({method:'POST',headers:expect.objectContaining({'Idempotency-Key':'a550b8aa-87a4-42d2-90a8-26602f28f2ec'})}));
 });
 it('rejects incomplete canonical failure envelope', async () => {
  vi.mocked(apiFetch).mockResolvedValue({success:false,requestId:'req-leave',message:'invalid',data:null,statusCode:422} as any);
  await expect(TrainerScheduleApi.requestLeave(dto,'a550b8aa-87a4-42d2-90a8-26602f28f2ec')).rejects.toThrow();
 });
});
