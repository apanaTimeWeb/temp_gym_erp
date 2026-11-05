import {describe, expect, it, beforeEach} from 'vitest';

import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockHandlers';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockFixtures';
import { resetSuperadminGymsMockState as resetV1MockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockHandlers';
import { SuperadminGymsV1DataSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas';


beforeEach(() => {
  resetSuperadminGymsMockState();
});

beforeEach(() => {
  resetV1MockState();
});

describe('Tenant Growth & Bulk Controls contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymsV1DataSchema.safeParse(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
