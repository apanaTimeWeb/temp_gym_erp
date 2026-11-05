import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_hr API URL contract', () => {
  it('matches the feature API contract for LEDGER', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER('sample-id')).toBe("/api/v1/manager/hr/ledger/sample-id"); });
  it('matches the feature API contract for LEDGER_ADVANCE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE).toBe("/api/v1/manager/hr/ledger/advance"); });
  it('matches the feature API contract for LEDGER_PAY_DUE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_PAY_DUE).toBe("/api/v1/manager/hr/ledger/paydue"); });
  it('matches the feature API contract for PAYROLLS_BASE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLLS_BASE).toBe("/api/v1/manager/hr/payrolls"); });
  it('matches the feature API contract for PAYROLL_CREATE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_CREATE).toBe("/api/v1/manager/hr/payrolls"); });
  it('matches the feature API contract for PAYROLL_GENERATE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_GENERATE).toBe("/api/v1/manager/hr/payrolls/generate"); });
  it('matches the feature API contract for PAYROLL_STATUS_UPDATE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_STATUS_UPDATE('sample-id')).toBe("/api/v1/manager/hr/payrolls/sample-id/status"); });
  it('matches the feature API contract for PAYROLL_UPDATE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_UPDATE('sample-id')).toBe("/api/v1/manager/hr/payrolls/sample-id"); });
  it('matches the feature API contract for STAFF_ATTENDANCE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_ATTENDANCE('sample-id', '2026-10')).toBe("/api/v1/manager/hr/staff/sample-id/attendance?month=2026-10"); });
  it('matches the feature API contract for STAFF_BASE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE).toBe("/api/v1/manager/hr/staff"); });
  it('matches the feature API contract for STAFF_GET_ONE', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_GET_ONE('sample-id')).toBe("/api/v1/manager/hr/staff/sample-id"); });
  it('matches the feature API contract for SUMMARY', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.SUMMARY).toBe("/api/v1/manager/hr/summary"); });
});
