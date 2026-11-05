import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/utils/ManagerExpenseRegisterAndReportingFormatters';

describe('ManagerExpenseRegisterAndReportingFormatters behavioral contract', () => {
  it('ManagerExpenseRegisterAndReportingFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerExpenseRegisterAndReportingFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerExpenseRegisterAndReportingFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerExpenseRegisterAndReportingFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerExpenseRegisterAndReportingFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerExpenseRegisterAndReportingDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerExpenseRegisterAndReportingMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerExpenseRegisterAndReportingFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerExpenseRegisterAndReportingFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
  it('uses the requested locale and safely falls back for invalid dates', () => {
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatDate('not-a-date', 'en-IN')).toBe('—');
    expect(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatDate('2026-01-02', 'en-US')).not.toBe(moduleUnderTest.ManagerExpenseRegisterAndReportingFormatDate('2026-01-02', 'en-IN'));
  });
});
