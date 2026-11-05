import { z } from 'zod';

import { TRAINER_ACCOUNT_SECURITY_TAB_IDS } from '@/app/frontend_trainer/trainer_account/account_security/utils/TrainerAccountSecurityProfileConstants';

import { TrainerAccountSecurityFormSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityProfileSchema';

import { TrainerAccountSecurityTrainerPasswordFormSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityProfileSchema';




// RESPONSIBILITY: TypeScript types for the Trainer Profile module.

export interface TrainerAccountSecurityData {
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

export interface TrainerAccountSecurityUpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}


export type TrainerAccountSecurityTab = (typeof TRAINER_ACCOUNT_SECURITY_TAB_IDS)[number];

export type TrainerAccountSecurityFormValues = z.infer<typeof TrainerAccountSecurityFormSchema>;
export type TrainerAccountSecurityTrainerPasswordFormValues = z.infer<typeof TrainerAccountSecurityTrainerPasswordFormSchema>;