import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/utils/ManagerMembershipLifecycleFormatters';

describe('ManagerMembershipLifecycleFormatters behavioral contract', () => {
  it('ManagerMembershipLifecycleFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerMembershipLifecycleFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerMembershipLifecycleFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerMembershipLifecycleFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerMembershipLifecycleFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerMembershipLifecycleDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerMembershipLifecycleDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerMembershipLifecycleMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerMembershipLifecycleFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerMembershipLifecycleFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerMembershipLifecycleFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
