import { describe, expect, it, vi, beforeEach } from 'vitest';
const api = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock('@/lib/api', () => ({ apiFetch: api.fetch }));
import { TrainerAccountSecurityApi } from '@/app/frontend_trainer/trainer_account/account_security/api/TrainerAccountSecurityProfileApi';

const requestId = 'password-mutation-1';
describe('Security password API mutation', () => {
 beforeEach(() => api.fetch.mockReset());
 it('sends an idempotent password mutation to the frozen URL contract', async () => {
  api.fetch.mockResolvedValue({success:true,requestId,message:'Password updated.',data:null});
  const result = await TrainerAccountSecurityApi.updatePassword({currentPassword:'old-password',newPassword:'new-password'}, 'safe-uuid-v4-key');
  expect(result.success).toBe(true);
  expect(api.fetch).toHaveBeenCalledWith(expect.stringContaining('/password'), expect.objectContaining({method:'PATCH', headers: {'Idempotency-Key':'safe-uuid-v4-key'}}));
 });
 it('rejects missing canonical response request identity', async () => {
  api.fetch.mockResolvedValue({success:true,message:'Password updated.',data:null});
  await expect(TrainerAccountSecurityApi.updatePassword({currentPassword:'old-password',newPassword:'new-password'}, 'safe-key')).rejects.toThrow();
 });
});
