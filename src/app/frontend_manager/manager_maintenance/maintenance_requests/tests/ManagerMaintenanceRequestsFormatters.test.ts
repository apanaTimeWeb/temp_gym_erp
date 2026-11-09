import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_maintenance/maintenance_requests/utils/ManagerMaintenanceRequestsFormatters';

describe('ManagerMaintenanceRequestsFormatters behavioral contract', () => {
  it('ManagerMaintenanceRequestsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerMaintenanceRequestsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerMaintenanceRequestsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsFormatNumber(123456, 'en-IN')).toBe('1,23,456');
  });
  it('ManagerMaintenanceRequestsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerMaintenanceRequestsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerMaintenanceRequestsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerMaintenanceRequestsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerMaintenanceRequestsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerMaintenanceRequestsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerMaintenanceRequestsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerMaintenanceRequestsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
