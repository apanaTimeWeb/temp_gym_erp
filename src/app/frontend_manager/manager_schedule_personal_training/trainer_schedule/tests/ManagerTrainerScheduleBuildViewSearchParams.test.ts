import { describe, expect, it } from 'vitest';
import { ManagerTrainerScheduleBuildViewSearchParams } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/utils/ManagerTrainerScheduleBuildViewSearchParams';

describe('Manager Schedule URL view updates', () => {
  it('preserves search and day filters when changing presentation mode', () => {
    const params = new URLSearchParams(ManagerTrainerScheduleBuildViewSearchParams('search=Ravi&day=Monday', 'trainer-cards'));
    expect(params.get('view')).toBe('trainer-cards');
    expect(params.get('search')).toBe('Ravi');
    expect(params.get('day')).toBe('Monday');
  });
});
