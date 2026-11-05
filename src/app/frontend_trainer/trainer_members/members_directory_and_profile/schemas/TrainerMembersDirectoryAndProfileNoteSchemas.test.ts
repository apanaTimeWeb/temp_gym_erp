import { describe, expect, it } from 'vitest';

import { TrainerMembersTrainerMemberNoteSchema } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/schemas/TrainerMembersDirectoryAndProfileNoteSchemas';

describe('Trainer member note schema', () => {
  it('uses string identifiers consistently with the note mock and API schema', () => {
    expect(TrainerMembersTrainerMemberNoteSchema.safeParse({ id: 'note-1', text: 'Follow up next week', date: '2026-10-16T00:00:00.000Z' }).success).toBe(true);
    expect(TrainerMembersTrainerMemberNoteSchema.safeParse({ id: 1, text: 'Follow up next week', date: '2026-10-16T00:00:00.000Z' }).success).toBe(false);
  });
});
