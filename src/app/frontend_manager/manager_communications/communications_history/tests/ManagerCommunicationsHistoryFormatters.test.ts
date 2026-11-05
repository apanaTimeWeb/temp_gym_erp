import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_communications/communications_history/utils/ManagerCommunicationsHistoryFormatters';

describe('ManagerCommunicationsCampaignsFormatters behavioral contract', () => {
  it('ManagerCommunicationsCampaignsFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerCommunicationsCampaignsFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerCommunicationsCampaignsFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerCommunicationsCampaignsFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerCommunicationsCampaignsFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerCommunicationsCampaignsDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerCommunicationsCampaignsDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerCommunicationsCampaignsMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerCommunicationsCampaignsFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerCommunicationsCampaignsFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerCommunicationsCampaignsFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});
