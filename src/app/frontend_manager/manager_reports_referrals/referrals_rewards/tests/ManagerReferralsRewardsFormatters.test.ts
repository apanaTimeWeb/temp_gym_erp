import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/utils/ManagerReferralsRewardsFormatters';

describe('ManagerReferralsRewardsFormatters behavioral contract', () => {
  it('ManagerReferralsRewardsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerReferralsRewardsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerReferralsRewardsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerReferralsRewardsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerReferralsRewardsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerReferralsRewardsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerReferralsRewardsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerReferralsRewardsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerReferralsRewardsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerReferralsRewardsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerReferralsRewardsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
