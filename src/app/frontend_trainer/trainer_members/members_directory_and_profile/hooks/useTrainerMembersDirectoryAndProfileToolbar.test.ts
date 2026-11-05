import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerMembersToolbar } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileToolbar';

const harness = vi.hoisted(() => ({
  search: 'Asha',
  setSearch: vi.fn(),
  statusFilter: 'all',
  setStatusFilter: vi.fn(),
  progressStatusFilter: 'all',
  setProgressStatusFilter: vi.fn(),
  invalidateQueries: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: harness.invalidateQueries }),
}));
vi.mock('@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileFilters', () => ({
  useTrainerMembersFilters: () => ({
    search: harness.search,
    setSearch: harness.setSearch,
    statusFilter: harness.statusFilter,
    setStatusFilter: harness.setStatusFilter,
    progressStatusFilter: harness.progressStatusFilter,
    setProgressStatusFilter: harness.setProgressStatusFilter,
  }),
}));

describe('useTrainerMembersToolbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    harness.search = 'Asha';
    harness.setSearch.mockClear();
    harness.invalidateQueries.mockClear();
  });

  afterEach(() => vi.useRealTimers());

  it('synchronizes a browser-history search change into the visible input state', () => {
    const { result, rerender } = renderHook(() => useTrainerMembersToolbar());
    expect(result.current.localSearch).toBe('Asha');

    harness.search = 'Neha';
    rerender();
    act(() => vi.advanceTimersByTime(0));

    expect(result.current.localSearch).toBe('Neha');
  });

  it('debounces local search edits before updating URL-backed query state', () => {
    const { result } = renderHook(() => useTrainerMembersToolbar());
    act(() => result.current.setLocalSearch('Riya'));
    act(() => vi.advanceTimersByTime(299));
    expect(harness.setSearch).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(harness.setSearch).toHaveBeenCalledWith('Riya');
  });

  it('refreshes only the canonical members list query', () => {
    const { result } = renderHook(() => useTrainerMembersToolbar());
    act(() => result.current.handleRefresh());
    expect(harness.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['trainer_members', 'list'] });
  });
});
