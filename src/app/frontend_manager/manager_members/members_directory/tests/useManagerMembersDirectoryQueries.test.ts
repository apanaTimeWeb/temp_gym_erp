import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';

type QueryConfig = { queryKey: readonly unknown[]; queryFn: () => Promise<unknown>; enabled?: boolean };
const { queryConfigs, api } = vi.hoisted(() => ({
  queryConfigs: [] as QueryConfig[],
  api: {
    fetchMembers: vi.fn(), fetchMemberPlans: vi.fn(), fetchMemberStats: vi.fn(), fetchMemberTrainers: vi.fn(),
    fetchMemberPayments: vi.fn(), fetchMemberAttendance: vi.fn(), fetchMemberById: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config: unknown) => {
    queryConfigs.push(config as QueryConfig);
    return { data: undefined, isPending: false, isLoading: false, isFetching: false, isError: false, error: null, refetch: vi.fn() };
  }),
}));
vi.mock('@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api', () => ({ ManagerMembersDirectoryApi: api }));

const lastConfig = (): QueryConfig => {
  const config = queryConfigs.at(-1);
  if (!config) throw new Error('Expected the hook to register a query config');
  return config;
};

describe('useManagerMembersDirectoryQueries data and identity behavior', () => {
  beforeEach(() => {
    queryConfigs.length = 0;
    vi.clearAllMocks();
  });

  it('uses the same filters for cache identity and the list API request', async () => {
    const params = { page: '2', limit: '25', status: 'ACTIVE' };
    const expected = { members: [{ id: 'member-1', name: 'Aarav Patel' }], total: 1, page: 2, limit: 25 };
    api.fetchMembers.mockResolvedValue({ success: true, data: expected });

    moduleUnderTest.useFetchMembers(params);
    expect(lastConfig().queryKey).toEqual(['manager_members', 'list', params]);
    await expect(lastConfig().queryFn()).resolves.toEqual(expected);
    expect(api.fetchMembers).toHaveBeenCalledOnce();
    expect(api.fetchMembers).toHaveBeenCalledWith(params);
  });

  it('returns an empty collection and disables member payment requests when no member is selected', async () => {
    moduleUnderTest.useFetchPayments(null);
    expect(lastConfig().enabled).toBe(false);
    await expect(lastConfig().queryFn()).resolves.toEqual([]);
    expect(api.fetchMemberPayments).not.toHaveBeenCalled();
  });

  it('does not issue a detail request for a blank member ID', async () => {
    moduleUnderTest.useFetchMember('  ');
    expect(lastConfig().enabled).toBe(false);
    await expect(lastConfig().queryFn()).resolves.toBeNull();
    expect(api.fetchMemberById).not.toHaveBeenCalled();
  });

  it('normalizes missing trainer data into a usable empty selector', async () => {
    api.fetchMemberTrainers.mockResolvedValue({ success: true, data: undefined });
    moduleUnderTest.useFetchTrainers();
    await expect(lastConfig().queryFn()).resolves.toEqual([]);
  });
});
