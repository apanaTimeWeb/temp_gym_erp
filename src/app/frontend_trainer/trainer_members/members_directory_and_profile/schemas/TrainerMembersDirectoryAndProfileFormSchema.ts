// RESPONSIBILITY: Defines Trainer Members form validation and derived input types.
import { z } from 'zod';

import { TRAINER_MEMBERS_GENDER_VALUES } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';




/** Validates creation/edit fields for a Trainer Members record before API submission. */
export const TrainerMembersFormSchema = z.object({
  name: z.string().min(2, 'ERR_NAME_REQUIRED'),
  email: z.string().email('ERR_INVALID_EMAIL').optional().or(z.literal('')),
  phone: z.string().min(10, 'ERR_PHONE_MIN'),
  address: z.string().optional(),
  gender: z.enum(TRAINER_MEMBERS_GENDER_VALUES),
  planId: z.string().min(1, 'ERR_PLAN_REQUIRED').optional(),
  amount: z.number().min(0, 'ERR_AMOUNT_INVALID').optional(),
  joinDate: z.string().optional(),
});
