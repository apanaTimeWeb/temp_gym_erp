// RESPONSIBILITY: Validates public Manager environment values using the module-owned runtime schema.

import { z } from 'zod';

import { MANAGER_INFRASTRUCTURE_BOOLEAN_ENV_VALUES } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConstants';

export const managerPublicEnvSchema = z.object({
  NEXT_PUBLIC_GYM_NAME: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_NAME is required'),
  NEXT_PUBLIC_GYM_PHONE: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_PHONE is required'),
  NEXT_PUBLIC_GYM_GST: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_GST is required'),
  NEXT_PUBLIC_GYM_ADDRESS: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_ADDRESS is required'),
  NEXT_PUBLIC_CURRENCY_CODE: z.string().trim().toUpperCase().regex(/^[A-Z]{3}$/, 'NEXT_PUBLIC_CURRENCY_CODE must be a three-letter ISO 4217 code').refine((value) => { try { new Intl.NumberFormat('en', { style: 'currency', currency: value }).format(0); return true; } catch { return false; } }, 'NEXT_PUBLIC_CURRENCY_CODE must be a valid ISO 4217 currency code'),
  NEXT_PUBLIC_MANAGER_DEMO_MODE: z.enum(MANAGER_INFRASTRUCTURE_BOOLEAN_ENV_VALUES).optional().default('false'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});
