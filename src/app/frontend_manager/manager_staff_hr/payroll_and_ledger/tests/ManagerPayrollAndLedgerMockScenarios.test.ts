// RESPONSIBILITY: Guards the required eight-state mock catalog for staff_payroll_and_attendance.
import { describe, expect, it } from 'vitest';
import { MANAGERPAYROLLANDLEDGER_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/scenarios/ManagerPayrollAndLedgerMockScenarios';

describe('ManagerStaffPayrollAndAttendance mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERPAYROLLANDLEDGER_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
