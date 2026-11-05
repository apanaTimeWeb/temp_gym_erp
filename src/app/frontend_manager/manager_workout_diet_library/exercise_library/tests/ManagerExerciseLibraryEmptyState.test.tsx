import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import ManagerExerciseLibraryEmptyState from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerExerciseLibraryEmptyState';

describe('ManagerExerciseLibraryEmptyState', () => {
  it('renders an accessible feature-local empty state', () => {
    render(<ManagerExerciseLibraryEmptyState search="ZZZ" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-testid', 'manager-exercise-library-empty-state');
    expect(screen.getByRole('status').textContent).toContain('COPY_NO_EXERCISES_FOUND_MATCHING_QUOT_2ZZZ');
  });
});
