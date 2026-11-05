// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { describe, expect, it } from 'vitest';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';

describe('ManagerStaffPayrollAndAttendanceAttendanceHistory contract', () => {
  it('uses a stable attendance row key shape', () => {
    const record = { date: '2024-05-31T10:00:00Z', status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT };
    expect(`${record.date}-${record.status}`).toBe('2024-05-31T10:00:00Z-PRESENT');
  });
});
