import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime, formatDecimal, formatDuration, formatKPI, formatNumber, formatPercent1dp, superadminIntegrationsDisplayValue } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/utils/SuperadminPlatformConfigurationIntegrationsManagementFormatters';
describe('Integrations formatters', () => {
  it('formats nullish values with an explicit fallback', () => { expect(formatNumber(null)).toBe('—'); expect(formatDate(undefined)).toBe('—'); expect(formatDuration(null)).toBe('—'); });
  it('uses locale-aware number formats', () => { expect(formatNumber(1234567)).toBe('12,34,567'); expect(formatPercent1dp(12.34)).toBe('12.3%'); expect(formatDecimal(12.3456)).toBe('12.35'); expect(formatDecimal(99.8, 1)).toBe('99.8'); });
  it('formats dates using requested locale and rejects invalid date input', () => {
    expect(formatDate(new Date(2026, 0, 2, 13, 45), 'en')).toBe('02 Jan 2026');
    expect(formatDateTime(new Date(2026, 0, 2, 13, 45), 'en')).toBe('02 Jan 2026, 13:45');
    expect(formatDate('not-a-date', 'en')).toBe('—');
    expect(formatDuration(3661)).toBe('1h 1m');
  });
  it('formats compact KPIs', () => { expect(formatKPI(1500)).toBe('1.5K'); });
  it('uses the feature-owned nullable display fallback', () => { expect(superadminIntegrationsDisplayValue(null)).toBe('—'); expect(superadminIntegrationsDisplayValue('ok')).toBe('ok'); });
});
