// RESPONSIBILITY: Renders the TrainerWorkoutRouteStates.test route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/error';

import TrainerWorkoutLoading from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/loading';







describe('Trainer workout route states', () => {
  it('renders the feature skeleton while the route is loading', () => {
    const { container } = render(<TrainerWorkoutLoading />);
    expect(container.firstElementChild).toHaveClass('p-6');
  });

  it('renders a retry action for the route error state', () => {
    const reset = vi.fn();
    render(<ErrorBoundary error={new Error('test')} reset={reset} />);
    const retry = screen.getByRole('button');
    expect(retry).toBeInTheDocument();
    retry.click();
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
