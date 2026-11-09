import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/notifications_inbox/utils/ManagerNotificationsInboxFormatters';

describe('ManagerNotificationsInboxFormatters behavioral contract', () => {
  it('ManagerNotificationsInboxFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerNotificationsInboxFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerNotificationsInboxFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxFormatNumber(123456, 'en-IN')).toBe('1,23,456');
  });
  it('ManagerNotificationsInboxFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerNotificationsInboxFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerNotificationsInboxDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerNotificationsInboxDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerNotificationsInboxMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerNotificationsInboxFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerNotificationsInboxFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerNotificationsInboxFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
