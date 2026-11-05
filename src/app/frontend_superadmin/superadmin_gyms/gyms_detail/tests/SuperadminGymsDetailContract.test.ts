import { describe, expect, it } from 'vitest';

import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures';
import { SuperadminGymDetailResponseSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/schemas/superadmin_gyms_detail_contract.schemas';
import { SuperadminGymDetailDataSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/schemas/superadmin_gyms_detail_contract.schemas';

describe('Superadmin Gym Detail contract', () => {
  it('accepts every route-specific fixture', () => {
    for (const fixture of Object.values(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES)) {
      expect(SuperadminGymDetailDataSchema.safeParse(fixture).success).toBe(true);
    }
  });

  it('keeps distinct resource identities distinct in fixture data', () => {
    const ids = Object.keys(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES);
    expect(ids.length).toBeGreaterThan(1);
    expect(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[ids[0]!]!.gymId).not.toBe(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES[ids[1]!]!.gymId);
  });
});
describe('Superadmin Gym Detail response discriminant', () => {
  it('accepts valid success data and a failure without data', () => {
    const data = Object.values(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES)[0];
    expect(SuperadminGymDetailResponseSchema.safeParse({ success: true, message: 'ok', data, requestId: 'req-1' }).success).toBe(true);
    expect(SuperadminGymDetailResponseSchema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'DOWN', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects a success branch without data and a failure with object data', () => {
    expect(SuperadminGymDetailResponseSchema.safeParse({ success: true, message: 'missing data', requestId: 'req-3' }).success).toBe(false);
    expect(SuperadminGymDetailResponseSchema.safeParse({ success: false, message: 'failure', data: {}, errorCode: 'DOWN', statusCode: 500, requestId: 'req-4' }).success).toBe(false);
  });
});
