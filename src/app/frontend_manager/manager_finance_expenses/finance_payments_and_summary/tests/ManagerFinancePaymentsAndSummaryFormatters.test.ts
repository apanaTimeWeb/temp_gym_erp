import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';

describe('ManagerFinancePaymentsAndSummaryFormatters behavioral contract', () => {
  it('ManagerFinancePaymentsAndSummaryFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerFinancePaymentsAndSummaryFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerFinancePaymentsAndSummaryFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerFinancePaymentsAndSummaryFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerFinancePaymentsAndSummaryDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerFinancePaymentsAndSummaryMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryMaskSensitiveData('anuj@example.com', 'email')).not.toBe('anuj@example.com');
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryMaskSensitiveData('123456789012', 'identifier')).not.toBe('123456789012');
  });
  it('ManagerFinancePaymentsAndSummaryFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerFinancePaymentsAndSummaryFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
  it('uses the requested locale and safely falls back for invalid dates', () => {
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatDate('not-a-date', 'en-IN')).toBe('—');
    expect(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatDate('2026-01-02', 'en-US')).not.toBe(moduleUnderTest.ManagerFinancePaymentsAndSummaryFormatDate('2026-01-02', 'en-IN'));
  });
});
