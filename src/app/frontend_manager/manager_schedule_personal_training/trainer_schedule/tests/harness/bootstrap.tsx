// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for trainer_schedule.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerTrainerScheduleHarness } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/tests/harness/ManagerTrainerScheduleHarness';

export function renderManagerTrainerSchedule(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerTrainerScheduleHarness>{children}</ManagerTrainerScheduleHarness> });
}
