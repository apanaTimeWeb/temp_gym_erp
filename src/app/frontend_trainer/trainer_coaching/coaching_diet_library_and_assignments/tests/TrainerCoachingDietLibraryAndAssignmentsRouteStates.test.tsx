// RESPONSIBILITY: Renders the TrainerLibraryRouteStates.test route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/error';

import TrainerLibraryLoading from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/loading';







describe('Trainer library route states', () => {
  it('renders the feature skeleton while the route is loading', () => {
    const { container } = render(<TrainerLibraryLoading />);
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
