import { z } from 'zod';

import { TRAINER_PROFILE_TAB_IDS } from '@/app/frontend_trainer/trainer_account/account_personal_profile/utils/TrainerAccountPersonalProfileProfileConstants';

import { TrainerProfileFormSchema } from '@/app/frontend_trainer/trainer_account/account_personal_profile/schemas/TrainerAccountPersonalProfileProfileSchema';




// RESPONSIBILITY: TypeScript types for the Trainer Profile module.

export interface TrainerProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string[]; // Trainers can have multiple specializations (stored as JSON array in DB)
  joinedAt: string;
  avatarInitial: string;
  certifications?: string[];
  specialties?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  bio?: string;
  experienceYears?: number;
  profilePhotoUrl?: string;
  languagesSpoken?: string[];
}

export interface TrainerProfileUpdatePayload {
  name: string;
  phone: string;
  specialization: string[]; // Array; backend stores as JSON column
}

export type TrainerProfileTab = (typeof TRAINER_PROFILE_TAB_IDS)[number];

export type TrainerProfileFormValues = z.infer<typeof TrainerProfileFormSchema>;
