import { fireEvent, render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerLibraryMain from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsMain';

const assignment = vi.hoisted(() => ({ assignDietPlan: vi.fn(), refetch: vi.fn() }));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsLogic', async () => {
  const React = await import('react');
  return {
    useTrainerLibraryLogic: () => {
      const [showDietModal, setShowDietModal] = React.useState(true);
      const [selectedDiet, setSelectedDiet] = React.useState<{ id: string; name: string; goal: string; meals: unknown[]; isActive: boolean } | null>({ id: 'd1', name: 'Lean Plan', goal: 'Weight Loss', meals: [], isActive: true });
      return {
        dietPlans: [{ id: 'd1', name: 'Lean Plan', goal: 'Weight Loss', meals: [], isActive: true }],
        totalDietPlans: 1,
        isPending: false,
        isError: false,
        isSuccess: true,
        search: 'Lean',
        debouncedSearch: 'Lean',
        filterGoal: 'Weight Loss',
        currentPage: 1,
        setSearch: vi.fn(),
        setFilterGoal: vi.fn(),
        setCurrentPage: vi.fn(),
        loadAll: vi.fn(),
        showDietModal,
        editDietData: selectedDiet,
        editDietId: selectedDiet?.id ?? null,
        openEditDiet: vi.fn(),
        closeDietModal: () => { setShowDietModal(false); setSelectedDiet(null); },
      };
    },
  };
});

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/hooks/useTrainerCoachingDietLibraryAndAssignmentsAssignment', () => ({
  useTrainerLibraryAssignment: () => ({
    membersQuery: { data: [], isPending: false, isError: false, refetch: assignment.refetch },
    isSaving: false,
    isError: false,
    error: null,
    assignDietPlan: assignment.assignDietPlan,
  }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTabs', () => ({ default: (props: { search: string }) => <div data-testid="trainer_library-main-behavior-test-library-tabs">Search: {props.search}</div> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsDietGrid', () => ({ default: (props: { dietPlans: Array<{ name: string }> }) => <div data-testid="trainer_library-main-behavior-test-diet-grid">{props.dietPlans[0]?.name}</div> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsDietModal', () => ({ default: (props: { isOpen: boolean; onAssign: () => void }) => props.isOpen ? <button type="button" onClick={props.onAssign}>Assign selected plan</button> : null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsAssignModal', () => ({ default: (props: { isOpen: boolean; plan: { name: string } | null }) => props.isOpen ? <div role="dialog" aria-label="Assignment dialog">Plan: {props.plan?.name ?? 'NO PLAN RETAINED'}</div> : null }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('TrainerLibraryMain behavior', () => {
  it('renders server-backed diet data from the query logic without duplicated toast state', () => {
    render(<TrainerLibraryMain />);
    expect(screen.getByTestId('trainer_library-main-behavior-test-library-tabs')).toHaveTextContent('Search: Lean');
    expect(screen.getByTestId('trainer_library-main-behavior-test-diet-grid')).toHaveTextContent('Lean Plan');
  });

  it('retains the selected plan when transitioning from details to assignment', () => {
    render(<TrainerLibraryMain />);
    fireEvent.click(screen.getByRole('button', { name: 'Assign selected plan' }));

    expect(screen.queryByRole('button', { name: 'Assign selected plan' })).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Assignment dialog' })).toHaveTextContent('Plan: Lean Plan');
  });
});
