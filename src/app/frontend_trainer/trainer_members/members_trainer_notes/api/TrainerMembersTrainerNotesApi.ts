import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { TRAINER_NOTES_API } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/config/trainer_members_trainer_notes.url_config';
import { TrainerMembersTrainerNotesResponseSchema } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/schemas/TrainerMembersTrainerNotesSchemas';
export const TrainerMembersTrainerNotesApi = {
  async detail(id: string) {
    const response = TrainerMembersTrainerNotesResponseSchema.parse(await apiFetch<ApiResponse<unknown>>(TRAINER_NOTES_API.member(id)));
    if (!response.success) throw new Error(response.message);
    return response.data;
  },
  async add(id: string, text: string, idempotencyKey: string) {
    const response = TrainerMembersTrainerNotesResponseSchema.parse(await apiFetch<ApiResponse<unknown>>(TRAINER_NOTES_API.notes(id), {
      method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify({ text }),
    }));
    if (!response.success) throw new Error(response.message);
    return { data: response.data, message: response.message };
  },
};
