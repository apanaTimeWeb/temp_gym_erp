import { z } from 'zod';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants';

export const SuperadminGenerateApiKeyFormSchema = z.object({
  label: z.string().trim().min(3, 'validation.label_min_length'),
  tenantId: z.string().min(1, 'validation.tenant_required'),
  scopes: z.array(z.enum(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_KEY_SCOPES)).min(1, 'validation.scope_required'),
});
