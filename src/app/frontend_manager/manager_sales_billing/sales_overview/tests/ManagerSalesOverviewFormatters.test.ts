import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewFormatters';

describe('ManagerSalesOverviewFormatters behavioral contract', () => {
  it('ManagerSalesOverviewFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerSalesOverviewFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerSalesOverviewFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerSalesOverviewFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerSalesOverviewFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerSalesOverviewFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerSalesOverviewFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerSalesOverviewFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerSalesOverviewDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerSalesOverviewDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerSalesOverviewDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerSalesOverviewMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerSalesOverviewMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerSalesOverviewFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerSalesOverviewFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerSalesOverviewFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerSalesOverviewFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
