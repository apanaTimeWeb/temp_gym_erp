import { z } from 'zod';
/** Source evidence: original TrainerMembersTrainerMemberNoteSchema and GET_ONE response. */
export const TrainerMembersTrainerNotesNoteSchema = z.object({ id: z.string(), text: z.string(), date: z.string() });
export const TrainerMembersTrainerNotesMemberSchema = z.object({
  id: z.string(), name: z.string(), trainerNotes: z.array(TrainerMembersTrainerNotesNoteSchema).optional(),
}).passthrough();
export const TrainerMembersTrainerNotesFormSchema = z.object({ text: z.string().trim().min(1) });
export const TrainerMembersTrainerNotesResponseSchema = z.discriminatedUnion('success', [
  z.object({ success: z.literal(true), requestId: z.string().min(1), message: z.string(), data: TrainerMembersTrainerNotesMemberSchema }),
  z.object({ success: z.literal(false), requestId: z.string().min(1), message: z.string(), data: z.null(), errorCode: z.string().min(1), statusCode: z.number().int().min(400).max(599) }),
]);
