import { describe, expect, it } from 'vitest';
import { TrainerMembersTrainerNotesFormSchema, TrainerMembersTrainerNotesResponseSchema } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/schemas/TrainerMembersTrainerNotesSchemas';
describe('Notes local verified contract', () => {
  it('rejects blank text and trims valid notes', () => {
    expect(TrainerMembersTrainerNotesFormSchema.safeParse({ text: '  ' }).success).toBe(false);
    expect(TrainerMembersTrainerNotesFormSchema.parse({ text: '  Good progress  ' }).text).toBe('Good progress');
  });
  it('accepts a canonical GET_ONE note projection', () => {
    expect(TrainerMembersTrainerNotesResponseSchema.safeParse({success:true,requestId:'req-notes-schema',message:'OK',data:{id:'MEM-001',name:'Rahul Sharma',trainerNotes:[]}}).success).toBe(true);
  });
  it('rejects success envelopes without the required requestId', () => {
    expect(TrainerMembersTrainerNotesResponseSchema.safeParse({success:true,message:'OK',data:{id:'MEM-001',name:'Rahul Sharma',trainerNotes:[]}}).success).toBe(false);
  });
});
