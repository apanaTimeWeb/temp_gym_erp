import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminPagination from '../components/AdminFinancePlanRevenueAnalyticsPagination';
import PeriodSelector from '../components/period_selector/AdminFinancePlanRevenueAnalyticsPeriodSelector';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('RBG114 pagination and period accessible state', () => {
  it('caps out-of-range pagination and does not emit invalid next-page actions', () => {
    const onPageChange = vi.fn();
    render(<AdminPagination currentPage={30} totalPages={3} totalItems={25} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(screen.getAllByRole('button', { name: 'AdminNavigationLayoutPagination.auto_goToPage' })).toHaveLength(3);
    expect(screen.getByRole('button', { current: 'page' }).textContent).toBe('3');
    const buttons = screen.getAllByRole('button');
    expect((buttons.at(-1) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(buttons[0]!);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
  it('exposes exactly one pressed selection', () => {
    render(<PeriodSelector period="LAST_MONTH" onPeriodChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    expect(buttons.filter(b => b.getAttribute('aria-pressed') === 'true')).toHaveLength(1);
    expect(buttons[1]!.getAttribute('aria-pressed')).toBe('true');
  });
});
