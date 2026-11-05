import { describe, expect, it, vi } from 'vitest';

const useQuery = vi.fn((options) => options);
const fetchMemberProgressEntries = vi.fn();
const fetchMemberAttendance = vi.fn();
const fetchDietPlans = vi.fn();
const fetchWorkoutPlans = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useQuery }));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/api/TrainerMembersDirectoryAndProfileApi', () => ({
  TrainerMembersApi: { fetchMemberProgressEntries, fetchMemberAttendance, fetchDietPlans, fetchWorkoutPlans },
}));

describe('useTrainerMembersProfileQueries', () => {
  it('includes member identity in attendance/progress query keys', async () => {
    const { useTrainerMembersMemberAttendanceQuery, useTrainerMembersMemberProgressEntriesQuery } = await import('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries');
    useTrainerMembersMemberAttendanceQuery('member-1');
    useTrainerMembersMemberProgressEntriesQuery('member-1');
    expect(useQuery.mock.calls[0][0].queryKey).toEqual(['trainer_members', 'attendance', 'member-1']);
    expect(useQuery.mock.calls[1][0].queryKey).toEqual(['trainer_members', 'progress', 'member-1']);
  });

  it('keeps relationship queries disabled until the owning surface enables them', async () => {
    const { useTrainerMembersMemberDietPlansQuery, useTrainerMembersMemberWorkoutPlansQuery } = await import('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileProfileQueries');
    useTrainerMembersMemberDietPlansQuery(false);
    useTrainerMembersMemberWorkoutPlansQuery(false);
    expect(useQuery.mock.calls[2][0].enabled).toBe(false);
    expect(useQuery.mock.calls[3][0].enabled).toBe(false);
  });
});
