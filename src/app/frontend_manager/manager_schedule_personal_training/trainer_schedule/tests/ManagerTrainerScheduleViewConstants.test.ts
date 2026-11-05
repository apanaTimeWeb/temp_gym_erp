import { describe, expect, it } from 'vitest';
import { MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW, MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_view.constants';
import { resolveManagerTrainerScheduleView } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleResolveView';

describe('Manager Schedule view routing', () => {
  it('resolves each canonical view and safely falls back for invalid input', () => {
    expect(resolveManagerTrainerScheduleView(MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW)).toBe(MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW);
    expect(resolveManagerTrainerScheduleView(MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW)).toBe(MANAGER_TRAINER_SCHEDULE_TRAINER_CARDS_VIEW);
    expect(resolveManagerTrainerScheduleView('__proto__')).toBe(MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW);
    expect(resolveManagerTrainerScheduleView(null)).toBe(MANAGER_TRAINER_SCHEDULE_WEEKLY_GRID_VIEW);
  });
});
