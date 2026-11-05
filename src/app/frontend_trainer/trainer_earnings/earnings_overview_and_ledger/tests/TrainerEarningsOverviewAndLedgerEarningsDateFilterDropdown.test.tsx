import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const navigation = vi.hoisted(() => ({ params: null as URLSearchParams | null, replace: vi.fn() }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_trainer/trainer_earnings/earnings_overview_and_ledger',
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => navigation.params,
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import TrainerEarningsDateFilterDropdown from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsDateFilterDropdown';

describe('TrainerEarningsDateFilterDropdown custom-range recovery', () => {
  beforeEach(() => {
    navigation.params = new URLSearchParams('range=this_month');
    navigation.replace.mockReset();
    navigation.replace.mockImplementation((url: string) => {
      navigation.params = new URLSearchParams(url.split('?')[1] ?? '');
    });
  });

  it('keeps both date inputs reachable from custom selection through a valid completed range', () => {
    const view = render(<TrainerEarningsDateFilterDropdown />);
    fireEvent.change(screen.getByLabelText('TEXT_EARNINGS_DATE_RANGE'), { target: { value: 'custom' } });
    expect(navigation.replace).toHaveBeenLastCalledWith(expect.stringContaining('range=custom'), { scroll: false });

    view.rerender(<TrainerEarningsDateFilterDropdown />);
    expect(screen.getByLabelText('TEXT_EARNINGS_START_DATE')).toBeInTheDocument();
    expect(screen.getByLabelText('TEXT_EARNINGS_END_DATE')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('TEXT_EARNINGS_START_DATE'), { target: { value: '2026-10-01' } });
    view.rerender(<TrainerEarningsDateFilterDropdown />);
    expect(screen.getByLabelText('TEXT_EARNINGS_START_DATE')).toHaveValue('2026-10-01');
    expect(screen.getByLabelText('TEXT_EARNINGS_END_DATE')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('TEXT_EARNINGS_END_DATE'), { target: { value: '2026-10-31' } });
    view.rerender(<TrainerEarningsDateFilterDropdown />);
    expect(screen.getByLabelText('TEXT_EARNINGS_START_DATE')).toHaveValue('2026-10-01');
    expect(screen.getByLabelText('TEXT_EARNINGS_END_DATE')).toHaveValue('2026-10-31');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
