import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/config/superadmin_platform_configuration_white_labeling_settings.url_config';
import { normalizeWhiteLabelSearch } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants';
import { mockWhiteLabelDomains } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/fixtures/SuperadminPlatformConfigurationWhiteLabelingSettingsMockFixtures';
import { UpdateDomainStatusSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas';

import type { WhiteLabelDomain } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationWhiteLabelingMockHandlers owned by the superadmin_platform_configuration_white_labeling feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/fixtures/SuperadminPlatformConfigurationWhiteLabelingSettingsMockFixtures, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/schemas/superadmin_platform_configuration_white_labeling_settings_aliases.schemas, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/constants/superadmin_platform_configuration_white_labeling_settings.constants, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/config/superadmin_platform_configuration_white_labeling_settings.url_config, @/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/types/superadmin_platform_configuration_white_labeling_settings.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns feature-specific MSW list filtering and mutable domain-status mutation behavior.


let domains: WhiteLabelDomain[] = mockWhiteLabelDomains.map((domain) => ({ ...domain }));
const idempotencyResponses = new Map<string, { fingerprint: string; response: WhiteLabelDomain; message: string }>();

export function resetSuperadminPlatformConfigurationWhiteLabelingMockState(): void {
  domains = mockWhiteLabelDomains.map((domain) => ({ ...domain }));
  idempotencyResponses.clear();
}

export const superadminWhiteLabelingHandlers = [
  http.get('*' + SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.DOMAINS, ({ request }) => {
    const url = new URL(request.url);
    const search = normalizeWhiteLabelSearch(url.searchParams.get('search'));
    const status = url.searchParams.get('status');
    const filtered = domains.filter((domain) => {
      const matchesSearch = !search || `${domain.gymName} ${domain.domain}`.toLowerCase().includes(search);
      const matchesStatus = !status || status === 'all' || domain.status === status;
      return matchesSearch && matchesStatus;
    });
    return HttpResponse.json<ApiResponse<WhiteLabelDomain[]>>({ success: true, message: 'Domains retrieved successfully.', data: filtered, requestId: crypto.randomUUID()});
  }),
  http.patch('*' + SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API.UPDATE_STATUS(':id'), async ({ params, request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (!idempotencyKey) return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: false, message: 'Idempotency-Key is required.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const parsed = UpdateDomainStatusSchema.safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: false, message: 'Invalid domain status.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: StatusCodes.BAD_REQUEST, requestId: crypto.randomUUID()}, { status: StatusCodes.BAD_REQUEST });
    const id = String(params.id);
    const fingerprint = `${id}:${parsed.data.status}`;
    const replay = idempotencyResponses.get(idempotencyKey);
    if (replay) {
      if (replay.fingerprint !== fingerprint) return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: false, message: 'Idempotency-Key was reused for a different request.', data: null, errorCode: 'CONFLICT', statusCode: StatusCodes.CONFLICT, requestId: crypto.randomUUID()}, { status: StatusCodes.CONFLICT });
      return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: true, message: replay.message, data: replay.response, requestId: crypto.randomUUID()});
    }
    const existing = domains.find((domain) => domain.id === id);
    if (!existing) return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: false, message: 'Domain not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });

    domains = domains.map((domain) => domain.id === id ? {
      ...domain,
      status: parsed.data.status,
      sslStatus: parsed.data.status === 'active' ? 'issued' : parsed.data.status === 'failed' ? 'failed' : 'pending',
    } : domain);
    const updated = domains.find((domain) => domain.id === id)!;
    const message = `Domain status successfully updated to ${parsed.data.status}.`;
    idempotencyResponses.set(idempotencyKey, { fingerprint, response: { ...updated }, message });
    return HttpResponse.json<ApiResponse<WhiteLabelDomain>>({ success: true, message, data: updated, requestId: crypto.randomUUID()});
  }),
];
