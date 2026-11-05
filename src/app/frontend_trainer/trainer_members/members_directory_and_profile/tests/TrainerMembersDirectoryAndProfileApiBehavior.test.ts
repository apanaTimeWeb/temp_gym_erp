import { describe, expect, it, vi } from 'vitest';

import { TrainerMembersApi } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi';

import { TRAINER_MEMBERS_MOCK_MEMBERS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer members API behavior', () => {
  it('forwards search, status, page, and limit to the member list endpoint', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'members-list-test', message: 'OK', data: { members: [TRAINER_MEMBERS_MOCK_MEMBERS[0]], total: 1, page: 1, limit: 10 } });
    const result = await TrainerMembersApi.fetchMembers({ search: 'Rahul', status: 'ACTIVE', page: '1', limit: '10' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Rahul');
    expect(apiFetch.mock.calls[0][0]).toContain('status=ACTIVE');
    expect(result.data?.members[0]?.name).toBe('Rahul Sharma');
  });
  it('rejects a canonical failure envelope for member updates', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'members-update-failure', message: 'Update rejected', data: null, errorCode: 'MEMBER_UPDATE_REJECTED', statusCode: 409 });
    await expect(TrainerMembersApi.updateMember('MEM-001', { phone: '9000000000' }, 'members-update-test-key')).rejects.toMatchObject({ message: 'Update rejected', errorCode: 'MEMBER_UPDATE_REJECTED', statusCode: 409 });
  });
  it('rejects a canonical failure envelope for member-note mutations', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'members-note-failure', message: 'Note rejected', data: null, errorCode: 'NOTE_REJECTED', statusCode: 422 });
    await expect(TrainerMembersApi.addMemberNote('MEM-001', { text: 'hello' }, 'members-note-test-key')).rejects.toMatchObject({ message: 'Note rejected', errorCode: 'NOTE_REJECTED', statusCode: 422 });
  });
  it('rejects a canonical failure envelope for selected-member reads', async () => {
    apiFetch.mockResolvedValueOnce({ success: false, requestId: 'members-read-failure', message: 'Member unavailable', data: null, errorCode: 'MEMBER_READ_FAILED', statusCode: 503 });
    await expect(TrainerMembersApi.fetchMemberById('MEM-001')).rejects.toMatchObject({ message: 'Member unavailable', errorCode: 'MEMBER_READ_FAILED', statusCode: 503 });
  });
  it('sends member updates through the module API and returns the server representation', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'members-update-test', message: 'TrainerMembersMember updated', data: TRAINER_MEMBERS_MOCK_MEMBERS[0] });
    const result = await TrainerMembersApi.updateMember('MEM-001', { phone: '9000000000' }, 'members-update-test-key');
    expect(apiFetch.mock.calls[0][0]).toContain('MEM-001');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'PATCH' });
    expect(result.data?.id).toBe('MEM-001');
  });
});
