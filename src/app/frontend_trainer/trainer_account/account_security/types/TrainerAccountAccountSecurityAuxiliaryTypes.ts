/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { Dispatch, SetStateAction } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { TrainerAccountSecurityTrainerPasswordFormValues } from '@/app/frontend_trainer/trainer_account/account_security/types/TrainerAccountSecurityProfileTypes';
import type { TRAINER_ACCOUNT_SECURITY_PROFILE_TABS } from '../utils/TrainerAccountSecurityProfileConstants';
import type { TRAINER_ACCOUNT_SECURITY_SCREEN_VIEWS } from '@/app/frontend_trainer/trainer_account/account_security/config/trainer_account_security.url_config';

export type TrainerAccountSecurityPasswordVisibility = Record<'current' | 'next' | 'confirm', boolean>;

export interface TrainerAccountSecuritySecurityViewProps {
  passwordForm: UseFormReturn<TrainerAccountSecurityTrainerPasswordFormValues>;
  changePassword: (values: TrainerAccountSecurityTrainerPasswordFormValues) => Promise<unknown>;
  changePasswordPending: boolean;
  passwordVisibility: TrainerAccountSecurityPasswordVisibility;
  setPasswordVisibility: Dispatch<SetStateAction<TrainerAccountSecurityPasswordVisibility>>;
}

export type TrainerAccountSecurityProfileTabId = typeof TRAINER_ACCOUNT_SECURITY_PROFILE_TABS[number]['id'];

export type TrainerAccountSecurityScreenView = (typeof TRAINER_ACCOUNT_SECURITY_SCREEN_VIEWS)[number];
