import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_dashboard/dashboard_overview/utils/ManagerDashboardOverviewFormatters';

describe('ManagerDashboardOverviewFormatters behavioral contract', () => {
  it('ManagerDashboardOverviewFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerDashboardOverviewFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('uses Indian digit grouping for INR when the app locale is the base English locale', () => {
    const formatted = moduleUnderTest.ManagerDashboardOverviewFormatCurrency(12345678, 'INR', 'en');
    expect(formatted).toContain('1,23,456');
  });
  it('ManagerDashboardOverviewFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerDashboardOverviewFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerDashboardOverviewFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerDashboardOverviewDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerDashboardOverviewDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerDashboardOverviewMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerDashboardOverviewFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerDashboardOverviewFormatDate uses the requested supported date locale', () => {
    const english = moduleUnderTest.ManagerDashboardOverviewFormatDate('2026-01-02', 'en');
    const hindi = moduleUnderTest.ManagerDashboardOverviewFormatDate('2026-01-02', 'hi');

    expect(hindi).not.toBe(english);
    expect(hindi).not.toBe('—');
  });
  it('ManagerDashboardOverviewFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerDashboardOverviewFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
