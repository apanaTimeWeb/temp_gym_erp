import { describe, expect, it } from 'vitest';

import { managerPublicEnvSchema } from '@/app/frontend_manager/manager_infrastructure/schemas/ManagerInfrastructureEnvSchema';

const validPublicEnv = {
  NEXT_PUBLIC_GYM_NAME: 'GymSmart',
  NEXT_PUBLIC_GYM_PHONE: '+919800000000',
  NEXT_PUBLIC_GYM_GST: '22AAAAA0000A1Z5',
  NEXT_PUBLIC_GYM_ADDRESS: 'Verified Test Address',
  NEXT_PUBLIC_CURRENCY_CODE: 'INR',
  NEXT_PUBLIC_MANAGER_DEMO_MODE: 'false',
  NEXT_PUBLIC_API_URL: 'https://api.example.test',
};

describe('managerPublicEnvSchema', () => {
  it('accepts a complete valid public environment contract', () => {
    expect(managerPublicEnvSchema.safeParse(validPublicEnv).success).toBe(true);
  });

  it('rejects a malformed currency code instead of silently normalizing it', () => {
    expect(managerPublicEnvSchema.safeParse({ ...validPublicEnv, NEXT_PUBLIC_CURRENCY_CODE: 'IN' }).success).toBe(false);
  });

  it('rejects an invalid optional API URL when supplied', () => {
    expect(managerPublicEnvSchema.safeParse({ ...validPublicEnv, NEXT_PUBLIC_API_URL: '/relative-api' }).success).toBe(false);
  });
});
