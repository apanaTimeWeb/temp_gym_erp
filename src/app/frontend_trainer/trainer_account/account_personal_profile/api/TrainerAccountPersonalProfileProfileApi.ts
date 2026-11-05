// RESPONSIBILITY: API client for the Trainer Profile module with canonical response validation.
// DATA FLOW: HTTP response → Zod envelope/schema → TrainerProfileLogic → form/UI.
import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_account/account_personal_profile/schemas/TrainerAccountPersonalProfileTrainerInfrastructureApiResponseSchema';

import { TrainerProfileDataSchema } from '@/app/frontend_trainer/trainer_account/account_personal_profile/schemas/TrainerAccountPersonalProfileProfileApiSchema';

import { TRAINER_PROFILE_URLS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

import type { TrainerProfileUpdatePayload } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileTypes';

import type { ApiResponse } from '@/lib/api';
const BASE = TRAINER_PROFILE_URLS.API.PROFILE;

export const TrainerProfileApi = {
  fetchProfile: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE);
    return TrainerInfrastructureApiResponseSchema(TrainerProfileDataSchema).parse(raw);
  },
  updateProfile: async (body: TrainerProfileUpdatePayload, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey } });
    return TrainerInfrastructureApiResponseSchema(TrainerProfileDataSchema).parse(raw);
  },

};
