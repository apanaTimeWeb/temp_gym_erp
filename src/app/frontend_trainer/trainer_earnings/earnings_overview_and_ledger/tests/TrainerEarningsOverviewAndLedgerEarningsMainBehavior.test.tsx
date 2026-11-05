import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import TrainerEarningsMain from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsMain';




const refetch = vi.fn();
const useTrainerEarningsQuery = vi.hoisted(() => vi.fn());
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/useTrainerEarningsOverviewAndLedgerEarningsQuery', () => ({ useTrainerEarningsQuery }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsKPIs', () => ({ default: () => <div data-testid="kpis" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsPending', () => ({ default: () => <div data-testid="pending" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsHistory', () => ({ default: () => <div data-testid="history" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsDateFilterDropdown', () => ({ default: () => <div data-testid="date-filter" /> }));
describe('TrainerEarningsMain behavior', () => {
  it('renders the earnings sections from the query success state', () => {
    useTrainerEarningsQuery.mockReturnValue({ isPending: false, isError: false, isInvalidRange: false, refetch });
    render(<TrainerEarningsMain />);
    expect(screen.getByRole('heading', { name: 'Earnings' })).toBeInTheDocument();
    expect(screen.getByTestId('kpis')).toBeInTheDocument();
    expect(screen.getByTestId('history')).toBeInTheDocument();
    expect(screen.getByTestId('pending')).toBeInTheDocument();
  });

  it('keeps the date filter mounted when an incomplete custom range disables the query', () => {
    useTrainerEarningsQuery.mockReturnValue({ isPending: true, isError: false, isInvalidRange: true, refetch });
    render(<TrainerEarningsMain />);
    expect(screen.getByRole('heading', { name: 'TEXT_EARNINGS' })).toBeInTheDocument();
    expect(screen.getByTestId('date-filter')).toBeInTheDocument();
    expect(screen.queryByTestId('trainer_earnings-main-loading-state')).not.toBeInTheDocument();
  });

});
