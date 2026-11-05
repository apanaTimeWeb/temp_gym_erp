// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { platformSettingSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_aliases.schemas';



describe('platformSettingSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(platformSettingSchema.safeParse({}).success).toBe(false);
  });
});
