import { describe, expect, it, vi } from 'vitest';

import { TrainerProfileApi } from '@/app/frontend_trainer/trainer_account/account_personal_profile/api/TrainerAccountPersonalProfileProfileApi';



const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

const PROFILE = { id: 'tr-1', name: 'Trainer One', email: 'trainer@example.com', phone: '9000000000', role: 'TRAINER', specialization: ['Strength'], joinedAt: '2026-01-01', avatarInitial: 'T' };

describe('Trainer profile API behavior', () => {
  it('updates the profile through the module endpoint and preserves the response contract', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'profile-update-test-request', message: 'Profile updated', data: PROFILE });
    const result = await TrainerProfileApi.updateProfile({ name: 'Trainer One', phone: '9000000000', specialization: ['Strength'] }, 'profile-update-test-key');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH', headers: { 'Idempotency-Key': 'profile-update-test-key' } });
    expect(result.data?.name).toBe('Trainer One');
  });

  it('preserves a structured unsuccessful profile response instead of treating it as success', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'profile-read-failure-request', message: 'Profile unavailable', data: null, errorCode: 'PROFILE_UNAVAILABLE', statusCode: 503 });
    const result = await TrainerProfileApi.fetchProfile();
    expect(result.success).toBe(false);
    expect(result.message).toBe('Profile unavailable');
    expect(result.data).toBeNull();
  });

});
