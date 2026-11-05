import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';

describe('ManagerReportsOverviewFormatters behavioral contract', () => {
  it('ManagerReportsOverviewFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerReportsOverviewFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerReportsOverviewFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerReportsOverviewFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerReportsOverviewFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerReportsOverviewFormatPercent(12.5, 'en-IN')).toContain('12.5');
  });
  it('ManagerReportsOverviewFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerReportsOverviewFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerReportsOverviewDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerReportsOverviewDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerReportsOverviewDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerReportsOverviewMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerReportsOverviewMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerReportsOverviewFormatDate applies the active locale and safely handles invalid input', () => {
    const english = moduleUnderTest.ManagerReportsOverviewFormatDate('2026-01-02', 'en-IN');
    const hindi = moduleUnderTest.ManagerReportsOverviewFormatDate('2026-01-02', 'hi-IN');
    expect(english).not.toBe('—');
    expect(hindi).not.toBe(english);
    expect(moduleUnderTest.ManagerReportsOverviewFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
  it('ManagerReportsOverviewFormatDateTime applies locale and safely handles invalid input', () => {
    expect(moduleUnderTest.ManagerReportsOverviewFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
    expect(moduleUnderTest.ManagerReportsOverviewFormatDateTime('invalid', 'en-IN')).toBe('—');
  });
});
