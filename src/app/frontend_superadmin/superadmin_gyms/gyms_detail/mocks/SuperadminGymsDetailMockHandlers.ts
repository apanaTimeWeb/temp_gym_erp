import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';

import { SUPERADMIN_GYMS_DETAIL_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGymsGymDetailMockHandlers owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures, @/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handlers for the route-specific Superadmin Gym 360 workspace.


let currentGymDetailFixtures = { ...SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES };

/** Resets the leaf-owned detail fixtures between tests without coupling to Directory mocks. */
export function resetSuperadminGymsMockState(): void {
  currentGymDetailFixtures = { ...SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES };
}

export const superadminGymDetailHandlers = [
    http.get('*' + SUPERADMIN_GYMS_MANAGEMENT_API.GYM_DETAIL.BACKEND_API.BASE, ({ request }) => {
        const gymId = new URL(request.url).searchParams.get('gymId');
        const fixture = gymId ? currentGymDetailFixtures[gymId] : undefined;
        if (!fixture) {
            return HttpResponse.json({ success: false, message: 'Gym details were not found.', data: null, statusCode: StatusCodes.NOT_FOUND , errorCode: 'NOT_FOUND', requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json({ success: true, message: 'Gym data loaded.', data: fixture, requestId: crypto.randomUUID()});
    }),
];
