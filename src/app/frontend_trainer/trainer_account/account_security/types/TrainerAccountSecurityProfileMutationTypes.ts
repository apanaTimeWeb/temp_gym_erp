// RESPONSIBILITY: Defines mutation command envelopes for Trainer Profile writes.
import type { TrainerAccountSecurityFormValues, TrainerAccountSecurityTrainerPasswordFormValues } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileTypes';
export interface TrainerAccountSecuritySaveMutationVariables { values: TrainerAccountSecurityFormValues; idempotencyKey: string; }
export interface TrainerAccountSecurityPasswordMutationVariables { values: TrainerAccountSecurityTrainerPasswordFormValues; idempotencyKey: string; }
