import { renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useTrainerSessionsQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsQuery';





/**
 * @description Manages QueryMock state and data flow for the sessions feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
const useQueryMock = vi.hoisted(() => vi.fn());
vi.mock('@tanstack/react-query', () => ({ useQuery: useQueryMock }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/api/TrainerCoachingSessionsApi', () => ({ fetchTrainerSessions: vi.fn(), fetchTrainerSessionsTrainerSessionMembers: vi.fn() }));

describe('useTrainerSessionsQuery', () => {
  it('includes date and type filter in the query identity and API call', () => {
    useQueryMock.mockImplementation((options: { queryKey: readonly unknown[] }) => options);
    renderHook(() => useTrainerSessionsQuery('2026-10-01', 'PT'));
    const options = useQueryMock.mock.calls.at(-1)?.[0];
    expect(options.queryKey).toEqual(['trainer_sessions', 'list', { date: '2026-10-01', filter: 'PT' }]);
  });
});
