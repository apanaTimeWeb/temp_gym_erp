import { describe, expect, it } from 'vitest';

import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockFixtures';
import { addGymSchema, emailOwnerSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_aliases.schemas';
// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { SuperadminGymsEmptyResponseSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_api.schemas';
import { SuperadminGymsV1DataSchema, SuperadminGymsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_v1_contract.schemas';

describe('addGymSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(addGymSchema.safeParse({}).success).toBe(false);
  });
});

describe('emailOwnerSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(emailOwnerSchema.safeParse({}).success).toBe(false);
  });
});


describe('SuperadminGymsEmptyResponseSchema', () => {
  it('accepts explicit null, an empty object, and a transport that omits the data body', () => {
    expect(SuperadminGymsEmptyResponseSchema.safeParse(null).success).toBe(true);
    expect(SuperadminGymsEmptyResponseSchema.safeParse({}).success).toBe(true);
    expect(SuperadminGymsEmptyResponseSchema.safeParse(undefined).success).toBe(true);
  });
});
describe('Superadmin Gyms V1 response discriminant', () => {
  it('accepts the module success fixture and failure without data', () => {
    expect(SuperadminGymsV1DataSchema.safeParse(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE).success).toBe(true);
    expect(SuperadminGymsV1ResponseSchema.safeParse({ success: true, message: 'ok', data: SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE, requestId: 'req-1' }).success).toBe(true);
    expect(SuperadminGymsV1ResponseSchema.safeParse({ success: false, message: 'unavailable', data: null, errorCode: 'UNAVAILABLE', statusCode: 503, requestId: 'req-2' }).success).toBe(true);
  });
  it('rejects invalid success and failure data combinations', () => {
    expect(SuperadminGymsV1ResponseSchema.safeParse({ success: true, message: 'missing data', requestId: 'req-3' }).success).toBe(false);
    expect(SuperadminGymsV1ResponseSchema.safeParse({ success: false, message: 'failure', data: {}, errorCode: 'DOWN', statusCode: 500, requestId: 'req-4' }).success).toBe(false);
  });
});
