// RESPONSIBILITY: Owns Trainer Members note validation schemas.
import { z } from 'zod';
export const TrainerMembersTrainerMemberNoteSchema = z.object({ id:z.string(), text:z.string().min(1), date:z.string() });
export const TrainerMembersCreateMemberNoteSchema = TrainerMembersTrainerMemberNoteSchema.omit({id:true,date:true});
