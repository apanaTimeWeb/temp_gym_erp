// RESPONSIBILITY: Validates public Manager runtime configuration once at the application boundary.

import { managerPublicEnvSchema } from '@/app/frontend_manager/manager_infrastructure/schemas/ManagerInfrastructureEnvSchema';

/**
 * @description Provides the ManagerEnvConfig implementation for the manager infrastructure module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

const parsedManagerPublicEnvResult = managerPublicEnvSchema.safeParse({
  NEXT_PUBLIC_GYM_NAME: process.env.NEXT_PUBLIC_GYM_NAME,
  NEXT_PUBLIC_GYM_PHONE: process.env.NEXT_PUBLIC_GYM_PHONE,
  NEXT_PUBLIC_GYM_GST: process.env.NEXT_PUBLIC_GYM_GST,
  NEXT_PUBLIC_GYM_ADDRESS: process.env.NEXT_PUBLIC_GYM_ADDRESS,
  NEXT_PUBLIC_CURRENCY_CODE: process.env.NEXT_PUBLIC_CURRENCY_CODE,
  NEXT_PUBLIC_MANAGER_DEMO_MODE: process.env.NEXT_PUBLIC_MANAGER_DEMO_MODE,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

const managerRuntimeProduction = process.env.NODE_ENV === 'production';
const managerDemoModeRequested = process.env.NEXT_PUBLIC_MANAGER_DEMO_MODE === 'true';

if (!parsedManagerPublicEnvResult.success && !managerDemoModeRequested) {
  throw new Error('[ManagerEnvConfig] Invalid public environment configuration. Check the documented NEXT_PUBLIC_* variables.');
}

const parsedManagerPublicEnv = parsedManagerPublicEnvResult.success
  ? parsedManagerPublicEnvResult.data
  : {
      NEXT_PUBLIC_GYM_NAME: 'GymSmart',
      NEXT_PUBLIC_GYM_PHONE: '+91 98000 00000',
      NEXT_PUBLIC_GYM_GST: '22AAAAA0000A1Z5',
      NEXT_PUBLIC_GYM_ADDRESS: 'Demo Address',
      NEXT_PUBLIC_CURRENCY_CODE: 'INR',
      NEXT_PUBLIC_MANAGER_DEMO_MODE: 'true' as const,
      NEXT_PUBLIC_API_URL: undefined,
    };

export const ManagerEnvConfig = {
  gymName: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_NAME,
  gymPhone: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_PHONE,
  gymGstNumber: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_GST,
  gymAddress: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_ADDRESS,
  currencyCode: parsedManagerPublicEnv.NEXT_PUBLIC_CURRENCY_CODE,
  demoMode: parsedManagerPublicEnv.NEXT_PUBLIC_MANAGER_DEMO_MODE === 'true',
  apiBaseUrl: parsedManagerPublicEnv.NEXT_PUBLIC_API_URL ?? '/api/v1',
  isProduction: managerRuntimeProduction,
} as const;
