import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryWorkoutPlansQuery';

const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn((config: unknown) => { queryConfigs.push(config); return { data: undefined, isPending: false, isLoading: false, isFetching: false, isError: false, error: null, refetch: vi.fn() }; }),
  useMutation: vi.fn((config: unknown) => { mutationConfigs.push(config); return { mutate: vi.fn(), mutateAsync: vi.fn().mockResolvedValue({ success: true, message: 'Test mutation succeeded', data: null }), isPending: false, isSuccess: false, isError: false, error: null }; }),
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn(), setQueryData: vi.fn(), getQueryData: vi.fn() })),
  useIsMutating: vi.fn(() => 0),
}));

describe('useManagerMembersDirectoryWorkoutPlansQuery co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerMembersDirectoryWorkoutPlansQuery).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerMembersDirectoryWorkoutPlansQuery as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook(false));
    expect(result.current).toBeDefined();
    expect(queryConfigs.length + mutationConfigs.length).toBeGreaterThan(0);
  });
});
