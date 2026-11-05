import { describe, expect, it } from 'vitest';

import { isSensitivePlatformSettingKey, isSuperadminSettingValueValid, PlatformSettingSchema, redactSensitivePlatformSettingValues } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';

describe('Superadmin setting value validation', () => {
  it('redacts server-returned credential values before they enter UI/query state', () => {
    const settings = [
      { id: 'secret', key: 'STRIPE_WEBHOOK_SECRET', value: 'whsec_actual-secret', description: '', category: 'Integrations', dataType: 'string' as const },
      { id: 'limit', key: 'MAX_GLOBAL_TENANTS', value: '1000', description: '', category: 'Limits', dataType: 'number' as const },
    ];
    const safe = redactSensitivePlatformSettingValues(settings);
    expect(safe[0].value).toBe('');
    expect(safe[1].value).toBe('1000');
    expect(settings[0].value).toBe('whsec_actual-secret');
  });

  it('classifies credential-bearing settings as write-only', () => {
    expect(isSensitivePlatformSettingKey('STRIPE_WEBHOOK_SECRET')).toBe(true);
    expect(isSensitivePlatformSettingKey('EMAIL_API_KEY')).toBe(true);
    expect(isSensitivePlatformSettingKey('ADMIN_PASSWORD')).toBe(true);
    expect(isSensitivePlatformSettingKey('MAX_GLOBAL_TENANTS')).toBe(false);
  });
  it('accepts finite numeric values and rejects empty/non-finite values', () => {
    expect(isSuperadminSettingValueValid('number', '1000')).toBe(true);
    expect(isSuperadminSettingValueValid('number', '1.25')).toBe(true);
    expect(isSuperadminSettingValueValid('number', '')).toBe(false);
    expect(isSuperadminSettingValueValid('number', 'Infinity')).toBe(false);
    expect(isSuperadminSettingValueValid('number', 'NaN')).toBe(false);
  });

  it('accepts only explicit boolean values for boolean settings', () => {
    expect(isSuperadminSettingValueValid('boolean', 'true')).toBe(true);
    expect(isSuperadminSettingValueValid('boolean', 'false')).toBe(true);
    expect(isSuperadminSettingValueValid('boolean', 'yes')).toBe(false);
  });

  it('validates response values against their declared type', () => {
    const setting = { id: 's1', key: 'MAX_GLOBAL_TENANTS', value: 'NaN', description: '', category: 'Limits', dataType: 'number' as const };
    expect(PlatformSettingSchema.safeParse(setting).success).toBe(false);
  });
});
