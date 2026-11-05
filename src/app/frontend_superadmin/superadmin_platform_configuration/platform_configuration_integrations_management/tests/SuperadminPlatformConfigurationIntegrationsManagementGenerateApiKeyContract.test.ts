import { describe, expect, it } from 'vitest';

import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_generate_api_key.schemas';



describe('SuperadminGenerateApiKeyFormSchema', () => {
  it('rejects an incomplete API-key request', () => {
    const result = SuperadminGenerateApiKeyFormSchema.safeParse({ label: '', tenantId: '', scopes: [] });
    expect(result.success).toBe(false);
  });

  it('accepts a valid tenant-scoped API-key request', () => {
    const result = SuperadminGenerateApiKeyFormSchema.safeParse({ label: 'Zapier Integration', tenantId: 't1', scopes: ['READ'] });
    expect(result.success).toBe(true);
  });
});
