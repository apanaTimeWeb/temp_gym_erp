import { describe, expect, it } from 'vitest';

import { mockWhiteLabelDomains } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/fixtures/SuperadminPlatformConfigurationWhiteLabelingSettingsMockFixtures';
import { WhiteLabelDomainSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas';
import { WhiteLabelDomainsDataSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas';

describe('Superadmin White-labeling contract', () => {
  it('accepts the module-owned domain fixture', () => {
    expect(WhiteLabelDomainsDataSchema.safeParse(mockWhiteLabelDomains).success).toBe(true);
  });
});


describe('WhiteLabelDomainSchema hostname boundary', () => {
  const base = { id: 'c3f5b1c6-9d9d-4d30-a95d-1e68c55a9000', gymId: 'c3f5b1c6-9d9d-4d30-a95d-1e68c55a9001', gymName: 'Example Gym', status: 'pending', sslStatus: 'pending', createdAt: '2026-01-02T12:00:00Z' };
  it('accepts a valid hostname and rejects blank or malformed hostnames', () => {
    expect(WhiteLabelDomainSchema.safeParse({ ...base, domain: 'api.example.co.in' }).success).toBe(true);
    expect(WhiteLabelDomainSchema.safeParse({ ...base, domain: '' }).success).toBe(false);
    expect(WhiteLabelDomainSchema.safeParse({ ...base, domain: 'https://example.com/path' }).success).toBe(false);
    expect(WhiteLabelDomainSchema.safeParse({ ...base, domain: 'bad..example.com' }).success).toBe(false);
  });
});
