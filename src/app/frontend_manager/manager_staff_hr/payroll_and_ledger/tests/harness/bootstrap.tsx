// RESPONSIBILITY: Starts and resets the shared MSW server and provides the real isolated payroll/ledger test wrapper.
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

import { managerMswServer } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksMswTestServer';
import { managerHrHandlers, resetManagerPayrollAndLedgerMockState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/handlers/ManagerPayrollAndLedgerMockHandlers';
import { ManagerStaffPayrollAndAttendanceHarness } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/tests/harness/ManagerStaffPayrollAndAttendanceHarness';
import { setManagerPayrollAndLedgerMockScenario } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/scenarios/ManagerPayrollAndLedgerMockScenarios';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  // The payroll and staff-directory leaves share a legacy URL; make this leaf's handlers authoritative in its tests.
  managerMswServer.use(...managerHrHandlers);
});
afterEach(() => {
  managerMswServer.resetHandlers();
  resetManagerPayrollAndLedgerMockState();
  setManagerPayrollAndLedgerMockScenario('ACTIVE');
});
afterAll(() => managerMswServer.close());

export function renderManagerStaffPayrollAndAttendance(ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}) {
  return render(ui, { ...options, wrapper: ({ children }) => <ManagerStaffPayrollAndAttendanceHarness>{children}</ManagerStaffPayrollAndAttendanceHarness> });
}
