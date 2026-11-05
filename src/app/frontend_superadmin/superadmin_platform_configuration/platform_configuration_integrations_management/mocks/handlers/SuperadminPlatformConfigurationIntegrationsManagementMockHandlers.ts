import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/config/superadmin_platform_configuration_integrations_management.url_config';
import { SUPERADMIN_INTEGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/fixtures/SuperadminPlatformConfigurationIntegrationsManagementMockFixtures';
import { SuperadminGenerateApiKeyFormSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_generate_api_key.schemas';

import type { SuperadminGenerateApiKeyResult } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationIntegrationsMockHandlers owned by the superadmin_platform_configuration_integrations feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/fixtures/SuperadminPlatformConfigurationIntegrationsManagementMockFixtures, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/schemas/superadmin_platform_configuration_integrations_management_generate_api_key.schemas, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/constants/superadmin_platform_configuration_integrations_management.constants, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/config/superadmin_platform_configuration_integrations_management.url_config, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns feature-specific MSW behavior for Superadmin Integrations, including mutable API-key creation.


let mockIntegrations = structuredClone(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE);
const idempotentResults = new Map<string, ApiResponse<SuperadminGenerateApiKeyResult>>();

export function resetSuperadminPlatformConfigurationIntegrationsMockState(): void {
  mockIntegrations = structuredClone(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE);
  idempotentResults.clear();
}

export const superadminIntegrationsHandlers = [
  http.get('*' + SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MANAGEMENT_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin integrations data loaded.', data: mockIntegrations, requestId: crypto.randomUUID()})),
  http.post('*' + SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MANAGEMENT_API.GENERATE_API_KEY, async ({ request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (idempotencyKey) {
      const replay = idempotentResults.get(idempotencyKey);
      if (replay) return HttpResponse.json(replay);
    }

    const parsed = SuperadminGenerateApiKeyFormSchema.safeParse(await request.json());
    if (!parsed.success) {
      return HttpResponse.json<ApiResponse<SuperadminGenerateApiKeyResult>>({ success: false, message: 'Invalid API key request.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    }

    const tenant = mockIntegrations.tenants.find((item) => item.id === parsed.data.tenantId);
    if (!tenant) {
      return HttpResponse.json<ApiResponse<SuperadminGenerateApiKeyResult>>({ success: false, message: 'Selected tenant was not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
    }

    const suffix = String(mockIntegrations.keys.length + 1);
    const generatedKey = {
      id: `key${Date.now()}`,
      tenant: tenant.name,
      label: parsed.data.label,
      status: SUPERADMIN_INTEGRATION_STATUS_CODES.ACTIVE,
      lastUsed: null,
      rateLimit: '120/min',
    };
    const result: ApiResponse<SuperadminGenerateApiKeyResult> = {
      success: true,
      message: 'API key generated successfully.',
      data: {
        key: generatedKey,
        secretKey: `sg360_${tenant.id}_${suffix}_${crypto.randomUUID().replaceAll('-', '')}`,
      },
      requestId: crypto.randomUUID(),
    };

    mockIntegrations = { ...mockIntegrations, keys: [generatedKey, ...mockIntegrations.keys] };
    if (idempotencyKey) idempotentResults.set(idempotencyKey, result);
    return HttpResponse.json(result);
  }),
];
