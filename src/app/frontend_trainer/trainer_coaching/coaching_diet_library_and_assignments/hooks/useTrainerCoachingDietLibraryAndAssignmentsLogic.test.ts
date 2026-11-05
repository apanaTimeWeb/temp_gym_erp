import { act, renderHook } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerLibraryLogic } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsLogic';

const navigation = vi.hoisted(() => ({
  query: 'search=original&page=2',
  replace: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: navigation.replace }),
  usePathname: () => '/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments',
  useSearchParams: () => new URLSearchParams(navigation.query),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: { data: { dietPlans: [], total: 0 } }, isPending: false, isError: false, isSuccess: true, refetch: vi.fn() }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/TrainerCoachingDietLibraryAndAssignmentsuseTrainerInfrastructureDebounce', () => ({
  useTrainerInfrastructureDebounce: (value: string) => value,
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/api/TrainerCoachingDietLibraryAndAssignmentsApi', () => ({
  TrainerLibraryApi: { fetchDietPlans: vi.fn() },
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsDiet', () => ({
  useTrainerLibraryDiet: () => ({ showDietModal: false, editDietId: null, editDietData: null, openEditDiet: vi.fn(), closeDietModal: vi.fn() }),
}));

describe('useTrainerLibraryLogic', () => {
  beforeEach(() => {
    navigation.query = 'search=original&page=2';
    navigation.replace.mockClear();
  });

  it('reflects a browser-history URL search change without writing the stale local search back', () => {
    const { result, rerender } = renderHook(() => useTrainerLibraryLogic());
    expect(result.current.search).toBe('original');

    navigation.query = 'search=restored&page=3';
    rerender();

    expect(result.current.search).toBe('restored');
    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it('writes only a settled local search value and resets pagination', () => {
    const { result } = renderHook(() => useTrainerLibraryLogic());
    act(() => result.current.setSearch('new search'));

    expect(navigation.replace).toHaveBeenCalledWith('/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments?search=new+search&page=1', { scroll: false });
  });
});
