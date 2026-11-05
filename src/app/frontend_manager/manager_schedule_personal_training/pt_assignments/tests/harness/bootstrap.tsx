// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for pt_assignments.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerPtAssignmentsHarness } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/tests/harness/ManagerPtAssignmentsHarness';

export function renderManagerPtAssignments(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerPtAssignmentsHarness>{children}</ManagerPtAssignmentsHarness> });
}
