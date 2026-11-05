import { MANAGER_PROFILE_AND_SECURITY_API } from '@/app/frontend_manager/manager_dashboard/profile_and_security/config/manager_profile_and_security.url_config';
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MOCK_PROFILE } from '@/app/frontend_manager/manager_dashboard/profile_and_security/mocks/fixtures/ManagerProfileAndSecurityMockData';
import type { UpdateManagerProfileAndSecurityPayload } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security.types';


let profileDb = { ...MOCK_PROFILE };

/**
 * @description Provides the ManagerProfileAndSecurityMockHandlers implementation for the profile module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl; @/app/frontend_manager/manager_dashboard/manager_profile_mocks/manager_profile_mocks_fixtures/ManagerProfileAndSecurityMockData; @/app/frontend_manager/manager_dashboard/manager_profile_url_config; @/app/frontend_manager/manager_dashboard/manager_profile_types/ManagerProfileAndSecurityTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerProfileAndSecurityMockState(): void {
  profileDb = structuredClone(MOCK_PROFILE);
}

export const managerProfileHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_PROFILE_AND_SECURITY_API.BASE), () => {
    return HttpResponse.json({
      success: true,
      message: 'Profile fetched',
      data: profileDb
    });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_PROFILE_AND_SECURITY_API.BASE), async ({ request }) => {
    const body = await request.json() as UpdateManagerProfileAndSecurityPayload;
    profileDb = { ...profileDb, ...body };
    return HttpResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: profileDb
    });
  }),

  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_PROFILE_AND_SECURITY_API.PASSWORD), () => {
    return HttpResponse.json({
      success: true,
      message: 'Password updated successfully'
    });
  })
];
