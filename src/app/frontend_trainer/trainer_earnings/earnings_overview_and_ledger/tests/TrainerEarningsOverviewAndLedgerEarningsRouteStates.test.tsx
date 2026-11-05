// RESPONSIBILITY: Renders the TrainerEarningsRouteStates.test route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/error';

import TrainerEarningsLoading from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/loading';







describe('Trainer earnings route states', () => {
  it('renders the feature skeleton while the route is loading', () => {
    const { container } = render(<TrainerEarningsLoading />);
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
