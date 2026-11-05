// RESPONSIBILITY: Owns Trainer Members note domain and create-payload type contracts derived from the feature schemas.
import { z } from 'zod';

import { TrainerMembersCreateMemberNoteSchema, TrainerMembersTrainerMemberNoteSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileNoteSchemas';




export type TrainerMembersTrainerMemberNote = z.infer<typeof TrainerMembersTrainerMemberNoteSchema>;
export type TrainerMembersCreateMemberNote = z.infer<typeof TrainerMembersCreateMemberNoteSchema>;
