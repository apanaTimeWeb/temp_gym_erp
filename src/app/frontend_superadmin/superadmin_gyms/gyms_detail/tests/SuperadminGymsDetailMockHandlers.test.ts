import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';

import { SUPERADMIN_GYMS_DETAIL_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockHandlers';
import { superadminGymDetailHandlers } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockHandlers';

const server = setupServer(...superadminGymDetailHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminGymsMockState());

describe('Superadmin Gym 360 MSW integration', () => {
  it('serves a detail fixture for every list gym identity', async () => {
    const ids = Object.keys(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES);
    expect(ids).toHaveLength(24);
    for (const gymId of ids) {
      const response = await fetch(`http://localhost${SUPERADMIN_GYMS_MANAGEMENT_API.GYM_DETAIL.BACKEND_API.BY_GYM(gymId)}`);
      expect(response.ok).toBe(true);
      const body = await response.json();
      expect(body.data.gymId).toBe(gymId);
    }
  });
});
