import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/utils/ManagerPtAssignmentsFormatters';

describe('ManagerPtAssignmentsFormatters behavioral contract', () => {
  it('ManagerPtAssignmentsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerPtAssignmentsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerPtAssignmentsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsFormatNumber(123456, 'en-IN')).toBe('1,23,456');
  });
  it('ManagerPtAssignmentsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerPtAssignmentsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerPtAssignmentsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerPtAssignmentsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerPtAssignmentsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerPtAssignmentsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerPtAssignmentsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerPtAssignmentsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
