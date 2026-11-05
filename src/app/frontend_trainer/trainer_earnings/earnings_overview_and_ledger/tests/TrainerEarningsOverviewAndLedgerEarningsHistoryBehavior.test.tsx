import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

const refetch = vi.fn();
const useTrainerEarningsQuery = vi.hoisted(() => vi.fn());
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/useTrainerEarningsOverviewAndLedgerEarningsQuery', () => ({ useTrainerEarningsQuery }));
vi.mock('next-intl', () => ({ useLocale: () => 'en', useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('page=1'), usePathname: () => '/earnings', useRouter: () => ({ replace: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/TrainerEarningsOverviewAndLedgeruseTrainerInfrastructureDebounce', () => ({ useTrainerInfrastructureDebounce: (value: string) => value }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsEmptyState', () => ({ default: () => <div data-testid="empty-state" /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureTooltip', () => ({ default: ({ children }: { children: ReactNode }) => <>{children}</> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureSkeletonBlock', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters', () => ({ TrainerEarningsFormatDate: (value: string) => value, TrainerEarningsFormatNumber: (value: number) => String(value) }));
vi.mock('@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency', () => ({ TrainerEarningsFormatCurrency: (value: number) => String(value) }));
vi.mock('@/lib/display_value', () => ({ displayValue: (value: unknown) => String(value ?? '—') }));

import TrainerEarningsHistory from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsHistory';

const validDataWithoutPagination = {
  kpis: { totalEarnings: 1000, currency: 'INR', pendingPayouts: 0, sessionsCompleted: 1, commissionRate: 0, taxDeduction: 0 },
  pendingPayouts: [],
  history: [{ id: 'entry-1', date: '2026-10-01', type: 'Session', description: 'Session', amount: 1000, currency: 'INR', status: 'settled' }],
};

describe('TrainerEarningsHistory pagination metadata', () => {
  it('does not silently infer a single page when server pagination metadata is absent', () => {
    useTrainerEarningsQuery.mockReturnValue({ data: validDataWithoutPagination, isPending: false, isError: false, isFetching: false, refetch });
    render(<TrainerEarningsHistory />);
    expect(screen.getByTestId('trainer_earnings-earnings-history_pagination_metadata_error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'TEXT_RETRY' })).toBeInTheDocument();
    expect(screen.queryByText(/TEXT_OF/)).not.toBeInTheDocument();
  });
});
