// RESPONSIBILITY: Defines mutation command envelopes for personal-profile writes.
import type { TrainerProfileFormValues } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileTypes';
export interface TrainerProfileSaveMutationVariables { values: TrainerProfileFormValues; idempotencyKey: string; }
