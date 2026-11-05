/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAccountProfileMockHandlers owned by the superadmin_account_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_account/account_security/mocks/fixtures/SuperadminAccountSecurityMockFixtures, @/app/frontend_superadmin/superadmin_account/account_security/config/superadmin_account_security.url_config, @/app/frontend_superadmin/superadmin_account/account_security/types/superadmin_account_security.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_ACCOUNT_SECURITY_API as SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_account/account_security/config/superadmin_account_security.url_config';
import { MOCK_SUPERADMIN_ACCOUNT_PROFILE } from '@/app/frontend_superadmin/superadmin_account/account_security/mocks/fixtures/SuperadminAccountSecurityMockFixtures';

import type { SuperadminAccountProfileData } from '@/app/frontend_superadmin/superadmin_account/account_security/types/superadmin_account_security.types';
import type { ApiResponse } from '@/lib/api';


const BASE_URL = SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.BASE;
let mockProfile: SuperadminAccountProfileData = { ...MOCK_SUPERADMIN_ACCOUNT_PROFILE };

export function resetSuperadminAccountProfileMockState(): void {
  mockProfile = { ...MOCK_SUPERADMIN_ACCOUNT_PROFILE };
}
export const superadminProfileHandlers = [
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<SuperadminAccountProfileData>>({ success: true, message: 'Success', data: mockProfile, requestId: crypto.randomUUID()});
    }),
    http.patch(BASE_URL, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Record<string, unknown>;
        mockProfile = { ...mockProfile, ...body };
        return HttpResponse.json<ApiResponse<SuperadminAccountProfileData>>({ success: true, message: 'Profile updated', data: mockProfile, requestId: crypto.randomUUID()});
    }),
    http.patch(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.PASSWORD, async () => {
        await delay(600);
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Password updated successfully', data: null, requestId: crypto.randomUUID()});
    }),
    http.patch(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.TWO_FACTOR, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Record<string, unknown>;
        mockProfile.twoFactorEnabled = Boolean(body.enabled);
        return HttpResponse.json<ApiResponse<SuperadminAccountProfileData>>({ success: true, message: '2FA toggled', data: mockProfile, requestId: crypto.randomUUID()});
    }),

    http.post(SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API.EXPORT_DATA, async () => {
        await delay(300);
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Export started. You will receive an email with a secure download link within a few minutes.', data: null, requestId: crypto.randomUUID()}, { status: StatusCodes.ACCEPTED });
    }),
];
