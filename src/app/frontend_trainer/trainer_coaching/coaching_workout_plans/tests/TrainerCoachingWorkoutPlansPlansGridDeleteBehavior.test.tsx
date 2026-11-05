import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  confirm: vi.fn(),
  showSuccess: vi.fn(),
  showError: vi.fn(),
  begin: vi.fn(),
  clear: vi.fn(),
  deleteWorkout: vi.fn(),
  setPage: vi.fn(),
  setEditWorkoutId: vi.fn(),
  setShowWkModal: vi.fn(),
  refetch: vi.fn(),
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansTrainerInfrastructureConstants', () => ({ TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE: 10 }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansTrainerInfrastructureUserSafeError', () => ({ TrainerInfrastructureUserSafeError: () => 'safe error' }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureConfirm', () => ({ useTrainerInfrastructureConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureFeedback', () => ({ useTrainerInfrastructureFeedback: () => ({ showSuccess: mocks.showSuccess, showError: mocks.showError }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureIdempotencyKey', () => ({ useTrainerInfrastructureIdempotencyKey: () => ({ begin: mocks.begin, clear: mocks.clear }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructurePagination', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansEmptyState', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansLoadingSkeleton', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansPlanCard', () => ({ default: ({ plan, onDelete }: { plan: { name: string }; onDelete: () => void }) => <button type="button" data-testid="delete-plan" onClick={onDelete}>Delete {plan.name}</button> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansFilters', () => ({ useTrainerWorkoutFilters: () => ({ search: '', category: 'All', page: 1, setPage: mocks.setPage, sortBy: 'name', sortDirection: 'asc' }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansMutations', () => ({ useTrainerWorkoutMutations: () => ({ deleteWorkout: mocks.deleteWorkout }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansQuery', () => ({ useTrainerWorkoutsQuery: () => ({ data: { workouts: [{ id: 'plan-1', name: 'Plan 1' }], total: 1 }, status: 'success', isFetching: false, refetch: mocks.refetch, error: null }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/state/useTrainerCoachingWorkoutPlansStore', () => ({ useTrainerWorkoutStore: () => ({ setEditWorkoutId: mocks.setEditWorkoutId, setShowWkModal: mocks.setShowWkModal }) }));

import TrainerWorkoutPlansGrid from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansPlansGrid';

describe('TrainerWorkoutPlansGrid delete failure feedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.confirm.mockResolvedValue(true);
    mocks.begin.mockReturnValue('delete-plan-key');
    mocks.deleteWorkout.mockRejectedValue(new Error('Plan deletion rejected'));
  });

  it('shows an error and never reports success when the delete mutation rejects', async () => {
    render(<TrainerWorkoutPlansGrid />);
    fireEvent.click(screen.getByTestId('delete-plan'));

    await waitFor(() => expect(mocks.showError).toHaveBeenCalledWith(expect.any(Error), 'delete-workout-plan-1'));
    expect(mocks.showSuccess).not.toHaveBeenCalled();
    expect(mocks.deleteWorkout).toHaveBeenCalledWith({ id: 'plan-1', idempotencyKey: 'delete-plan-key' });
    expect(mocks.clear).not.toHaveBeenCalledWith('delete-workout-plan-1');
  });
});
