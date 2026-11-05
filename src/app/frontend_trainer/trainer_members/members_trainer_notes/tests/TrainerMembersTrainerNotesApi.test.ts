import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TrainerMembersTrainerNotesApi } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/api/TrainerMembersTrainerNotesApi';
import { apiFetch } from '@/lib/api';
vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));
beforeEach(() => vi.resetAllMocks());
describe('trainer notes verified backend contract', () => {
 it('POST uses documented endpoint, only text and supplied idempotency key', async () => {
  vi.mocked(apiFetch).mockResolvedValue({success:true,requestId:'req-notes-save',message:'Note saved',data:{id:'MEM-001',name:'Rahul Sharma',trainerNotes:[]}});
  await TrainerMembersTrainerNotesApi.add('MEM-001','Progress improving','uuid-v4-supplied');
  expect(apiFetch).toHaveBeenCalledWith('/trainer/trainer_members/MEM-001/notes', expect.objectContaining({
   method:'POST',headers: {'Idempotency-Key':'uuid-v4-supplied'}, body: JSON.stringify({text:'Progress improving'}),
  }));
 });
 it('GET encodes member identity and never invents a notes-list endpoint', async () => {
  vi.mocked(apiFetch).mockResolvedValue({success:true,requestId:'req-notes-detail',message:'OK',data:{id:'MEM-001',name:'Rahul Sharma',trainerNotes:[]}});
  await TrainerMembersTrainerNotesApi.detail('MEM-001');
  expect(apiFetch).toHaveBeenCalledWith('/trainer/trainer_members/MEM-001');
 });
});
