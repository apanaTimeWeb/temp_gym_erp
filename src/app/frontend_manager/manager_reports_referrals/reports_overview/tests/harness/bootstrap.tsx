// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for reports_overview.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerReportsOverviewHarness } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/tests/harness/ManagerReportsOverviewHarness';

export function renderManagerReportsOverview(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerReportsOverviewHarness>{children}</ManagerReportsOverviewHarness> });
}
