import { MANAGER_TRAINER_SCHEDULE_API } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/config/manager_trainer_schedule.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_schedule API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_TRAINER_SCHEDULE_API.BASE).toBe("/api/v1/manager/schedule"); });
  it('matches the feature API contract for SHIFT', () => { expect(MANAGER_TRAINER_SCHEDULE_API.SHIFT('sample-id')).toBe("/api/v1/manager/schedule/shifts/sample-id"); });
  it('matches the feature API contract for SHIFTS', () => { expect(MANAGER_TRAINER_SCHEDULE_API.SHIFTS).toBe("/api/v1/manager/schedule/shifts"); });
});
