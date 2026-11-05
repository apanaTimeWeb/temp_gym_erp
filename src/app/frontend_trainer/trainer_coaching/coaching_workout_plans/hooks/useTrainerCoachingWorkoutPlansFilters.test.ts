import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansFilters';
import { TRAINER_WORKOUT_PAGE_EXERCISES_NAV, TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';

const push = vi.fn();
const replace = vi.fn();
const pathname = TRAINER_WORKOUT_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); replace.mockClear(); params = new URLSearchParams(); });

describe('useTrainerWorkoutFilters', () => {
  it('updates shareable search state while retaining canonical view', () => {
    params = new URLSearchParams('view=plans&category=Strength');
    const { result } = renderHook(() => useTrainerWorkoutFilters());
    act(() => result.current.setSearch('squat'));
    const url = new URL(`http://localhost${push.mock.calls[0]![0]}`);
    expect(url.searchParams.get('search')).toBe('squat');
    expect(url.searchParams.get('view')).toBe('plans');
    expect(url.searchParams.get('category')).toBe('Strength');
  });

  it('normalizes obsolete tab URLs while preserving search, page, sort, and category', () => {
    params = new URLSearchParams('view=plans&tab=obsolete&search=squat&page=3&sortBy=name&sortDirection=desc&category=Mobility');
    const { result } = renderHook(() => useTrainerWorkoutFilters());
    expect(result.current.tab).toBe('plans');
    expect(replace).toHaveBeenCalledWith(`${pathname}?view=plans&search=squat&page=3&sortBy=name&sortDirection=desc&category=Mobility`, { scroll: false });
  });

  it('redirects a direct exercises deep link to the separately routed Exercise Management leaf', () => {
    params = new URLSearchParams('view=exercises&search=squat');
    const { result } = renderHook(() => useTrainerWorkoutFilters());
    expect(result.current.tab).toBe('plans');
    expect(replace).toHaveBeenCalledWith(`${TRAINER_WORKOUT_PAGE_EXERCISES_NAV}?view=exercises&search=squat`, { scroll: false });
  });

  it('writes canonical view state on tab change and preserves the existing tab-specific filter reset', () => {
    params = new URLSearchParams('view=plans&tab=obsolete&search=squat&page=3&sortBy=name&category=Strength');
    const { result } = renderHook(() => useTrainerWorkoutFilters());
    act(() => result.current.setTab('exercises'));
    expect(push).toHaveBeenCalledWith(`${TRAINER_WORKOUT_PAGE_EXERCISES_NAV}?view=exercises&search=squat&page=1&sortBy=name`, { scroll: false });
  });
});
