import { superadminIntegrationsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_fetch.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/config/superadmin_platform_configuration_integrations_management.url_config';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_generate_api_key.schemas';
import { SuperadminGenerateApiKeyResultSchema, SuperadminPlatformConfigurationIntegrationsResponseSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_types.schemas';

import type { SuperadminGenerateApiKeyFormValues, SuperadminGenerateApiKeyResult } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';
import type { SuperadminPlatformConfigurationIntegrationsResponse } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management.types';
import type { ApiResponse } from '@/lib/api';


// RESPONSIBILITY: Provides API access for the Superadmin Integrations feature. All server communication is contract-validated.


export async function fetchIntegrations(): Promise<ApiResponse<SuperadminPlatformConfigurationIntegrationsResponse>> {
  return apiFetch<SuperadminPlatformConfigurationIntegrationsResponse>(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MANAGEMENT_API.BASE, {
    dataSchema: SuperadminPlatformConfigurationIntegrationsResponseSchema,
  });
}

/**
 * Purpose: Creates one tenant-scoped developer API key and validates the response before UI consumption.
 * Side effects: Sends the caller-supplied idempotency key to prevent duplicate creation from repeated submission.
 */
export async function generateSuperadminApiKey(
  payload: SuperadminGenerateApiKeyFormValues,
  idempotencyKey: string,
): Promise<ApiResponse<SuperadminGenerateApiKeyResult>> {
  const validatedPayload = SuperadminGenerateApiKeyFormSchema.parse(payload);
  return apiFetch<SuperadminGenerateApiKeyResult>(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MANAGEMENT_API.GENERATE_API_KEY, {
    method: 'POST',
    body: JSON.stringify(validatedPayload),
    headers: { 'Idempotency-Key': idempotencyKey },
    dataSchema: SuperadminGenerateApiKeyResultSchema,
  });
}
