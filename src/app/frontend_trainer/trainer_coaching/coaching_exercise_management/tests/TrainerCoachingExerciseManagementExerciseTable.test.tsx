import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { ReactNode } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import TrainerWorkoutExerciseTable from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementExerciseTable';

const setEditExerciseId = vi.fn();
const setShowExModal = vi.fn();
const deleteExercise = vi.fn(async () => ({ message: 'Exercise deleted.' }));
const showSuccess = vi.fn();
const showError = vi.fn();
const beginIdempotencyKey = vi.fn(() => 'idempotency-ex-1');
const clearIdempotencyKey = vi.fn();
const confirm = vi.fn(async () => true);
const refetch = vi.fn();

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => values?.name ? `${key}:${values.name}` : key,
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters', () => ({
  useTrainerWorkoutFilters: () => ({
    search: '',
    category: 'All',
    page: 1,
    setPage: vi.fn(),
    sortBy: 'name',
    sortDirection: 'asc',
    setSort: vi.fn(),
  }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementQuery', () => ({
  useTrainerWorkoutExercisesQuery: () => ({
    data: {
      exercises: [{ id: 'ex-1', name: 'Squat', muscleGroup: 'Legs', equipment: 'Barbell', difficulty: 'INTERMEDIATE' }],
      total: 1,
    },
    isPending: false,
    isError: false,
    isFetching: false,
    error: null,
    refetch,
  }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementMutations', () => ({
  useTrainerWorkoutMutations: () => ({ deleteExercise }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/state/useTrainerCoachingExerciseManagementStore', () => ({
  useTrainerWorkoutStore: () => ({ setEditExerciseId, setShowExModal }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureConfirm', () => ({
  useTrainerInfrastructureConfirm: () => ({ confirm }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureFeedback', () => ({
  useTrainerInfrastructureFeedback: () => ({ showSuccess, showError }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureIdempotencyKey', () => ({
  useTrainerInfrastructureIdempotencyKey: () => ({ begin: beginIdempotencyKey, clear: clearIdempotencyKey }),
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureTooltip', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureTableSkeleton', () => ({
  default: () => <div data-testid="exercise-table-skeleton" />,
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructurePagination', () => ({
  default: () => null,
}));

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/utils/TrainerCoachingExerciseManagementTrainerInfrastructureUserSafeError', () => ({
  TrainerInfrastructureUserSafeError: () => 'Unable to load exercises.',
}));

describe('TrainerWorkoutExerciseTable behavior', () => {
  beforeEach(() => { vi.clearAllMocks(); });
  it('keeps data rows semantic and exposes a keyboard-accessible edit action', () => {
    render(<TrainerWorkoutExerciseTable />);

    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
    expect(screen.getAllByRole('button', { name: 'TEXT_EDIT_EXERCISE_ARIA:Squat' }).length).toBeGreaterThanOrEqual(1);
    fireEvent.click(screen.getByTestId('trainer_workout-exercise-table-edit-ex-1'));

    expect(setEditExerciseId).toHaveBeenCalledTimes(1);
    expect(setEditExerciseId).toHaveBeenCalledWith('ex-1');
    expect(setShowExModal).toHaveBeenCalledTimes(1);
  });

  it('announces the active sort direction on the corresponding column header', () => {
    render(<TrainerWorkoutExerciseTable />);
    expect(screen.getByRole('columnheader', { name: /TEXT_EXERCISE/i }).getAttribute('aria-sort')).toBe('ascending');
  });

  it('keeps nested edit/delete actions independent from row activation', async () => {
    render(<TrainerWorkoutExerciseTable />);

    const editButton = screen.getByTestId('trainer_workout-exercise-table-edit-ex-1');
    fireEvent.click(editButton);
    expect(setEditExerciseId).toHaveBeenCalledTimes(1);

    const deleteButton = screen.getByTestId('trainer_workout-exercise-table-delete-ex-1');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteExercise).toHaveBeenCalledWith({ id: 'ex-1', idempotencyKey: 'idempotency-ex-1' }));
    expect(setEditExerciseId).toHaveBeenCalledTimes(1);
    expect(setShowExModal).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(beginIdempotencyKey).toHaveBeenCalledWith('delete-exercise-ex-1');
    expect(clearIdempotencyKey).toHaveBeenCalledWith('delete-exercise-ex-1');
    expect(showSuccess).toHaveBeenCalledWith('Exercise deleted.', 'delete-exercise-ex-1');
  });
});
