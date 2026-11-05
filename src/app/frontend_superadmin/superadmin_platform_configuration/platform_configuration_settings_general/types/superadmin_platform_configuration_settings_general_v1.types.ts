/** TypeScript contracts inferred from the canonical runtime schemas. */


import {
  SuperadminPlatformConfigurationSettingsV1DataSchema,
  SuperadminPlatformConfigurationSettingsV1ResponseSchema,
} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_v1_contract.schemas';

import type { infer as ZodInfer } from 'zod';

export type SuperadminPlatformConfigurationSettingsV1Data = ZodInfer<typeof SuperadminPlatformConfigurationSettingsV1DataSchema>;
export type SuperadminPlatformConfigurationSettingsV1Response = ZodInfer<typeof SuperadminPlatformConfigurationSettingsV1ResponseSchema>;

export interface SuperadminPlatformConfigurationSettingsV1SectionProps {
  data: SuperadminPlatformConfigurationSettingsV1Data;
}
