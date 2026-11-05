import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_account/account_security/schemas/TrainerAccountSecurityTrainerInfrastructureApiResponseSchema';






export const TrainerAccountSecurityDataSchema = z.object({
  id: z.string(), name: z.string(), email: z.string().email(), phone: z.string(), role: z.string(),
  specialization: z.array(z.string()), joinedAt: z.string(), avatarInitial: z.string(),
  certifications: z.array(z.string()).optional(), specialties: z.array(z.string()).optional(),
  emergencyContact: z.object({ name: z.string(), phone: z.string(), relation: z.string() }).optional(),
  bio: z.string().optional(), experienceYears: z.number().optional(), profilePhotoUrl: z.string().url().optional(),
  languagesSpoken: z.array(z.string()).optional(),
});

export const TrainerAccountSecurityTrainerPasswordResponseSchema = TrainerInfrastructureApiResponseSchema(z.null());
