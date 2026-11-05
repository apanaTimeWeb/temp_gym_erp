// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for grievance_resolution.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerGrievanceResolutionHarness } from '@/app/frontend_manager/manager_grievances/grievance_resolution/tests/harness/ManagerGrievanceResolutionHarness';

export function renderManagerGrievanceResolution(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerGrievanceResolutionHarness>{children}</ManagerGrievanceResolutionHarness> });
}
