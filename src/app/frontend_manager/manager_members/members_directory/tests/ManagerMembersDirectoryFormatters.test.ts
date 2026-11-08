import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';

describe('ManagerMembersDirectoryFormatters behavioral contract', () => {
  it('ManagerMembersDirectoryFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerMembersDirectoryFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted.replace(/[^0-9.]/g, '')).toContain('123.45');
  });
  it('ManagerMembersDirectoryFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryFormatNumber(123456, 'en-IN').replace(/[^0-9]/g, '')).toContain('123456');
  });
  it('ManagerMembersDirectoryFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerMembersDirectoryFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerMembersDirectoryDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerMembersDirectoryDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerMembersDirectoryMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
    expect(moduleUnderTest.ManagerMembersDirectoryMaskSensitiveData('anuj@example.com', 'email')).not.toBe('anuj@example.com');
    expect(moduleUnderTest.ManagerMembersDirectoryMaskSensitiveData('123456789012', 'identifier')).not.toBe('123456789012');
  });
  it('ManagerMembersDirectoryFormatDate formats a date value and rejects invalid input', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
    expect(moduleUnderTest.ManagerMembersDirectoryFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
  it('ManagerMembersDirectoryFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerMembersDirectoryFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
