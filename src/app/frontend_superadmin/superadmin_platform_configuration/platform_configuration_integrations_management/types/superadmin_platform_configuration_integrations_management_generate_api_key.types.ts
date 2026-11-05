// RESPONSIBILITY: Defines API-key generation validation, response, and modal view contracts for Superadmin Integrations.
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_generate_api_key.schemas';
import {
  SuperadminGenerateApiKeyResultSchema,
  SuperadminIntegrationTenantSchema,
  SuperadminPlatformConfigurationIntegrationsResponseSchema,
} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_types.schemas';

import type { infer as ZodInfer } from 'zod';


export type SuperadminGenerateApiKeyFormValues = ZodInfer<typeof SuperadminGenerateApiKeyFormSchema>;
export type SuperadminGenerateApiKeyResult = ZodInfer<typeof SuperadminGenerateApiKeyResultSchema>;
export type SuperadminIntegrationTenant = ZodInfer<typeof SuperadminIntegrationTenantSchema>;
export type SuperadminPlatformConfigurationIntegrationsResponseContract = ZodInfer<typeof SuperadminPlatformConfigurationIntegrationsResponseSchema>;

export interface SuperadminGenerateApiKeyMutationInput {
  payload: SuperadminGenerateApiKeyFormValues;
  idempotencyKey: string;
}

export interface SuperadminGenerateApiKeyModalProps {
  isOpen: boolean;
  tenants: SuperadminIntegrationTenant[];
  onClose: () => void;
}
