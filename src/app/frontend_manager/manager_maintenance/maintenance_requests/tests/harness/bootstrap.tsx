// RESPONSIBILITY: Exposes the isolated testing-library bootstrap for maintenance_requests.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ManagerMaintenanceRequestsHarness } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/tests/harness/ManagerMaintenanceRequestsHarness';

export function renderManagerMaintenanceRequests(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerMaintenanceRequestsHarness>{children}</ManagerMaintenanceRequestsHarness> });
}
