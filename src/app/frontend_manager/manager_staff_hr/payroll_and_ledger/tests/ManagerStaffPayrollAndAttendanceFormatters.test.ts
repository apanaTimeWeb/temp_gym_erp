import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';

describe('ManagerStaffPayrollAndAttendanceFormatters behavioral contract', () => {
  it('ManagerStaffPayrollAndAttendanceFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerStaffPayrollAndAttendanceFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerStaffPayrollAndAttendanceFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceFormatNumber(123456, 'en-IN')).toBe('1,23,456');
  });
  it('ManagerStaffPayrollAndAttendanceFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerStaffPayrollAndAttendanceFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerStaffPayrollAndAttendanceDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerStaffPayrollAndAttendanceMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceMaskSensitiveData('anuj@example.com', 'email')).not.toBe('anuj@example.com');
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceMaskSensitiveData('123456789012', 'identifier')).not.toBe('123456789012');
  });
  it('ManagerStaffPayrollAndAttendanceFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerStaffPayrollAndAttendanceFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerStaffPayrollAndAttendanceFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
