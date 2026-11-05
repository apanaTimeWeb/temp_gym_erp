import type { TrainerProfileProfileTabId } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
import { TRAINER_PROFILE_SCREEN_VIEWS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

// RESPONSIBILITY: Centralized static UI configuration for Trainer Profile.
// DATA FLOW: Profile UI -> translation keys -> rendered labels; values remain domain identifiers.
export const TRAINER_PROFILE_PROFILE_TABS = [
  { id: TRAINER_PROFILE_SCREEN_VIEWS[0], labelKey: 'TEXT_PERSONAL_INFO' },
  { id: TRAINER_PROFILE_SCREEN_VIEWS[1], labelKey: 'TEXT_SECURITY' },
] as const;



export const TRAINER_PROFILE_SPECIALIZATIONS = [
  { value: 'Strength & Conditioning', labelKey: 'TEXT_SPECIALIZATION_STRENGTH_CONDITIONING' },
  { value: 'Yoga & Flexibility', labelKey: 'TEXT_SPECIALIZATION_YOGA_FLEXIBILITY' },
  { value: 'HIIT & Cardio', labelKey: 'TEXT_SPECIALIZATION_HIIT_CARDIO' },
  { value: 'Bodybuilding', labelKey: 'TEXT_SPECIALIZATION_BODYBUILDING' },
  { value: 'CrossFit', labelKey: 'TEXT_SPECIALIZATION_CROSSFIT' },
  { value: 'Pilates', labelKey: 'TEXT_SPECIALIZATION_PILATES' },
  { value: 'Nutrition & Wellness', labelKey: 'TEXT_SPECIALIZATION_NUTRITION_WELLNESS' },
  { value: 'Sports Performance', labelKey: 'TEXT_SPECIALIZATION_SPORTS_PERFORMANCE' },
] as const;

export const TRAINER_PROFILE_TAB_IDS = TRAINER_PROFILE_SCREEN_VIEWS;


export type { TrainerProfileProfileTabId } from '../types/TrainerAccountAccountPersonalProfileAuxiliaryTypes';
