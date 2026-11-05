import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_grievances/grievance_resolution/utils/ManagerGrievanceResolutionFormatters';

describe('ManagerGrievanceResolutionFormatters behavioral contract', () => {
  it('ManagerGrievanceResolutionFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerGrievanceResolutionFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerGrievanceResolutionFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerGrievanceResolutionFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerGrievanceResolutionFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerGrievanceResolutionDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerGrievanceResolutionDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerGrievanceResolutionMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerGrievanceResolutionFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerGrievanceResolutionFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerGrievanceResolutionFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
