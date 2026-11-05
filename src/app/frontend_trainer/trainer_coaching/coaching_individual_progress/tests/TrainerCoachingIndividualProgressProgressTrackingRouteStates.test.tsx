// RESPONSIBILITY: Renders the TrainerProgressTrackingtrackingRouteStates.test route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/error';

import TrainerProgressTrackingLoading from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/loading';







describe('Trainer progress-tracking route states', () => {
  it('renders the feature skeleton while the route is loading', () => {
    const { container } = render(<TrainerProgressTrackingLoading />);
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
