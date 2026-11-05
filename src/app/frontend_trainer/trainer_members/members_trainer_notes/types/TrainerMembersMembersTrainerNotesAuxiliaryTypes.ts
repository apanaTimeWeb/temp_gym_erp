/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */
import type { z } from 'zod';
import type { TrainerMembersTrainerNotesFormSchema } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/schemas/TrainerMembersTrainerNotesSchemas';

export type TrainerMembersTrainerNotesFormValues = z.infer<typeof TrainerMembersTrainerNotesFormSchema>;

export type TrainerMembersTrainerNotesNavigateEvent = Event & { canIntercept: boolean; destination: { url: string; key?: string }; navigationType?: string };

export type TrainerMembersTrainerNotesNote = { id: string; text: string; date: string };
