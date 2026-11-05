import { SuperadminIntegrationTenantSchema, SuperadminIntegrationKeySchema, SuperadminGenerateApiKeyResultSchema, SuperadminPlatformConfigurationIntegrationsResponseSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
export type SuperadminPlatformConfigurationIntegrationsResponse = ZodInfer<typeof SuperadminPlatformConfigurationIntegrationsResponseSchema>;

export interface SuperadminPlatformConfigurationIntegrationsSectionProps {
    data: SuperadminPlatformConfigurationIntegrationsResponse;
}

export type SuperadminIntegrationTenant = ZodInfer<typeof SuperadminIntegrationTenantSchema>;
export type SuperadminIntegrationKey = ZodInfer<typeof SuperadminIntegrationKeySchema>;
export type SuperadminGenerateApiKeyResult = ZodInfer<typeof SuperadminGenerateApiKeyResultSchema>;
