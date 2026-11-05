// RESPONSIBILITY: Owns Trainer Members embedded diet snapshot types derived from the feature validation schema.
import { z } from 'zod';

import { TrainerMembersDietSnapshotSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileSnapshotSchemas';




export type TrainerMembersDietSnapshot = z.infer<typeof TrainerMembersDietSnapshotSchema>;
