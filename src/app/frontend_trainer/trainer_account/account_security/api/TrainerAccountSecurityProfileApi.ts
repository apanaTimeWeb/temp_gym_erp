// RESPONSIBILITY: API client for the Trainer Profile module with canonical response validation.
// DATA FLOW: HTTP response → Zod envelope/schema → TrainerAccountSecurityLogic → form/UI.
import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityTrainerInfrastructureApiResponseSchema';

import { TrainerAccountSecurityDataSchema, TrainerAccountSecurityTrainerPasswordResponseSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityProfileApiSchema';

import { TRAINER_ACCOUNT_SECURITY_URLS } from '@/app/frontend_trainer/trainer_account/account_security/config/trainer_account_security.url_config';

import type { TrainerAccountSecurityUpdatePasswordPayload } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileTypes';

import type { ApiResponse } from '@/lib/api';
const BASE = TRAINER_ACCOUNT_SECURITY_URLS.API.PROFILE;

export const TrainerAccountSecurityApi = {
  fetchProfile: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE);
    return TrainerInfrastructureApiResponseSchema(TrainerAccountSecurityDataSchema).parse(raw);
  },
  updatePassword: async (body: TrainerAccountSecurityUpdatePasswordPayload, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_ACCOUNT_SECURITY_URLS.API.PASSWORD, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey } });
    return TrainerAccountSecurityTrainerPasswordResponseSchema.parse(raw);
  },
};
