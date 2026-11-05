import {describe, expect, it, beforeEach} from 'vitest';

import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockHandlers';
import { SuperadminGymDetailDataSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/schemas/superadmin_gyms_detail_contract.schemas';


beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('Gym 360 Overview contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymDetailDataSchema.safeParse(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t1);
        expect(result.success).toBe(true);
    });
});
