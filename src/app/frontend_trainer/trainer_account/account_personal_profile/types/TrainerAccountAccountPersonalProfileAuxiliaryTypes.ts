/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { UseFormReturn } from 'react-hook-form';
import type { TrainerProfileData, TrainerProfileFormValues } from '@/app/frontend_trainer/trainer_account/account_personal_profile/types/TrainerAccountPersonalProfileProfileTypes';
import type { TRAINER_PROFILE_PROFILE_TABS } from '../utils/TrainerAccountPersonalProfileProfileConstants';
import type { TRAINER_PROFILE_SCREEN_VIEWS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

export interface TrainerProfilePersonalViewProps {
  profileForm: UseFormReturn<TrainerProfileFormValues>;
  user: Pick<TrainerProfileData, 'email'>;
  saveProfile: (values: TrainerProfileFormValues) => Promise<unknown>;
  saveProfilePending: boolean;
}

export type GuardNavigateEvent = Event & {
  canIntercept: boolean;
  destination: { url: string; key?: string };
  navigationType?: string;
};

export type GuardNavigation = EventTarget & { traverseTo?: (key: string) => Promise<unknown> };

export interface TrainerInfrastructureNavigationGuardStoreState {
  dirtySources: Record<string, true>;
  setSourceDirty: (sourceId: string, isDirty: boolean) => void;
  hasDirtySources: () => boolean;
}

export type TrainerProfileProfileTabId = typeof TRAINER_PROFILE_PROFILE_TABS[number]['id'];

export type TrainerProfileScreenView = (typeof TRAINER_PROFILE_SCREEN_VIEWS)[number];

export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
