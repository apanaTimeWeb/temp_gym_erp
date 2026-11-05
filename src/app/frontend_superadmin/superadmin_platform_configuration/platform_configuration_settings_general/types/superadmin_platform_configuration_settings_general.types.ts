/** TypeScript domain contract inferred from the canonical runtime schema. */


import { PlatformSettingSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/schemas/superadmin_platform_configuration_settings_general_contract.schemas';

import type { infer as ZodInfer } from 'zod';

export type PlatformSetting = ZodInfer<typeof PlatformSettingSchema>;
