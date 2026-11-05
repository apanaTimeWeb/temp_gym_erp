import { describe, it, expect } from 'vitest';
import { TrainerMembersTrainerNotesResponseSchema } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/schemas/TrainerMembersTrainerNotesSchemas';
describe('Trainer Notes canonical envelope', () => {
 it('requires request identity for success', () => {
  expect(TrainerMembersTrainerNotesResponseSchema.safeParse({success: true, requestId:'req-notes', message:'ok', data:{id:'one',name:'Member'}}).success).toBe(true);
  expect(TrainerMembersTrainerNotesResponseSchema.safeParse({success: true,message:'ok',data:{id:'one',name:'Member'}}).success).toBe(false);
 });
 it('requires structured failure metadata', () => {
  expect(TrainerMembersTrainerNotesResponseSchema.safeParse({success:false,requestId:'req-notes',message:'not found',data:null,errorCode:'NOT_FOUND',statusCode:404}).success).toBe(true);
  expect(TrainerMembersTrainerNotesResponseSchema.safeParse({success:false,requestId:'req-notes',message:'not found'}).success).toBe(false);
 });
});
