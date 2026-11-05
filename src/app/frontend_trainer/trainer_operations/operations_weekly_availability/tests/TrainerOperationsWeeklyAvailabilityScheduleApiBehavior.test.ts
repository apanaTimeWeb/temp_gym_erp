import { describe, expect, it, vi } from 'vitest';

import { TrainerScheduleApi } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/api/TrainerOperationsWeeklyAvailabilityScheduleApi';
import { TRAINER_SCHEDULE_MOCK_AVAILABILITY } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/mocks/fixtures/TrainerOperationsWeeklyAvailabilityScheduleMockData';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer weekly availability API behavior', () => {
  it('uses PATCH and preserves the idempotency key and canonical response metadata', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'weekly-availability-update-1', message: 'Availability updated', data: TRAINER_SCHEDULE_MOCK_AVAILABILITY });
    const result = await TrainerScheduleApi.updateAvailability(TRAINER_SCHEDULE_MOCK_AVAILABILITY, 'availability-contract-test-key');
    expect(apiFetch.mock.calls[0]?.[0]).toContain('/availability');
    expect(apiFetch.mock.calls[0]?.[1]).toMatchObject({ method: 'PATCH', headers: { 'Idempotency-Key': 'availability-contract-test-key' } });
    expect(result.message).toBe('Availability updated');
    expect(result.data).toHaveLength(7);
  });

  it('rejects a canonical failure envelope rather than returning mutation success', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'weekly-availability-update-2', message: 'Schedule update denied', data: null, errorCode: 'FORBIDDEN', statusCode: 403 });
    await expect(TrainerScheduleApi.updateAvailability(TRAINER_SCHEDULE_MOCK_AVAILABILITY, 'availability-failure-key')).rejects.toThrow('Schedule update denied');
  });
});
