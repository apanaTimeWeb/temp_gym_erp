// RESPONSIBILITY: Verify source-owned URL date selection, query-key preservation and impossible civil date messaging.
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminFinanceProfitAndLossReportDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/date_filter/AdminFinanceProfitAndLossReportDateFilterDropdown';

const route = vi.hoisted(() => ({ query: new URLSearchParams(), replace: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: route.replace }),
  usePathname: () => '/frontend_admin/admin_finance/finance_profit_and_loss_report',
  useSearchParams: () => route.query,
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/searchable_dropdown/AdminFinanceProfitAndLossReportSearchableDropdown', () => ({
  AdminFinanceProfitAndLossReportSearchableDropdown: ({ onChange }: { onChange: (val: string) => void }) => <button onClick={() => onChange('this_month')}>This month</button>,
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/components/date_filter/AdminFinanceProfitAndLossReportDateRangePicker', () => ({
  default: ({ onChange }: { onChange: (start: string, end: string) => void }) => <>
    <button data-testid="pnl-start" onClick={() => onChange('2026-10-10', '')}>Start</button>
    <button data-testid="pnl-end" onClick={() => onChange('2026-10-10', '2026-10-20')}>End</button>
  </>,
}));

describe('Finance Profit and Loss Report URL date controls', () => {
  beforeEach(() => { route.query = new URLSearchParams('range=custom&branchId=g1&page=5'); route.replace.mockReset(); });
  it('retains unrelated filters and clears pagination for rapid selected date changes', () => {
    render(<AdminFinanceProfitAndLossReportDateFilterDropdown />);
    fireEvent.click(screen.getByTestId('pnl-start'));
    fireEvent.click(screen.getByTestId('pnl-end'));
    const finalUrl = new URL(String(route.replace.mock.lastCall?.[0]), 'https://example.test');
    expect(finalUrl.searchParams.get('startDate')).toBe('2026-10-10');
    expect(finalUrl.searchParams.get('endDate')).toBe('2026-10-20');
    expect(finalUrl.searchParams.get('branchId')).toBe('g1');
    expect(finalUrl.searchParams.has('page')).toBe(false);
    expect(route.replace).toHaveBeenCalledTimes(2);
  });
  it('shows an error for an impossible date, then accepts a leap-day range', () => {
    route.query = new URLSearchParams('range=custom&startDate=2026-02-30&endDate=2026-03-01');
    const view = render(<AdminFinanceProfitAndLossReportDateFilterDropdown />);
    expect(screen.getByTestId('reports-analytics-reports-analytics-date-filter-dropdown-status-region')).toHaveClass('text-danger');
    route.query = new URLSearchParams('range=custom&startDate=2028-02-29&endDate=2028-03-01');
    view.rerender(<AdminFinanceProfitAndLossReportDateFilterDropdown />);
    expect(screen.getByTestId('reports-analytics-reports-analytics-date-filter-dropdown-status-region')).toHaveClass('text-secondary');
  });
});
