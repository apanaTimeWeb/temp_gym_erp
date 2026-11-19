// RESPONSIBILITY: Verify source-owned URL date selection, query-key preservation and impossible civil date messaging.
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminFinanceRevenueReportDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/date_filter/AdminFinanceRevenueReportDateFilterDropdown';

const route = vi.hoisted(() => ({ query: new URLSearchParams(), replace: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: route.replace }),
  usePathname: () => '/frontend_admin/admin_finance/finance_revenue_report',
  useSearchParams: () => route.query,
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/components/searchable_dropdown/AdminFinanceRevenueReportSearchableDropdown', () => ({
  AdminFinanceRevenueReportSearchableDropdown: ({ onChange }: { onChange: (val: string) => void }) => <button onClick={() => onChange('this_month')}>This month</button>,
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/components/date_filter/AdminFinanceRevenueReportDateRangePicker', () => ({
  default: ({ onChange }: { onChange: (start: string, end: string) => void }) => <>
    <button data-testid="revenue-start" onClick={() => onChange('2026-10-10', '')}>Start</button>
    <button data-testid="revenue-end" onClick={() => onChange('2026-10-10', '2026-10-20')}>End</button>
  </>,
}));

describe('Finance Revenue Report URL date controls', () => {
  beforeEach(() => { route.query = new URLSearchParams('range=custom&branchId=b1&page=5'); route.replace.mockReset(); });
  it('retains unrelated filters and clears pagination for rapid selected date changes', () => {
    render(<AdminFinanceRevenueReportDateFilterDropdown />);
    fireEvent.click(screen.getByTestId('revenue-start'));
    fireEvent.click(screen.getByTestId('revenue-end'));
    const finalUrl = new URL(String(route.replace.mock.lastCall?.[0]), 'https://example.test');
    expect(finalUrl.searchParams.get('startDate')).toBe('2026-10-10');
    expect(finalUrl.searchParams.get('endDate')).toBe('2026-10-20');
    expect(finalUrl.searchParams.get('branchId')).toBe('b1');
    expect(finalUrl.searchParams.has('page')).toBe(false);
    expect(route.replace).toHaveBeenCalledTimes(2);
  });
  it('shows an error for an impossible date, then accepts a leap-day range', () => {
    route.query = new URLSearchParams('range=custom&startDate=2026-02-30&endDate=2026-03-01');
    const view = render(<AdminFinanceRevenueReportDateFilterDropdown />);
    expect(screen.getByTestId('admin-finance-revenue-date-range-status')).toHaveClass('text-danger');
    route.query = new URLSearchParams('range=custom&startDate=2028-02-29&endDate=2028-03-01');
    view.rerender(<AdminFinanceRevenueReportDateFilterDropdown />);
    expect(screen.getByTestId('admin-finance-revenue-date-range-status')).toHaveClass('text-secondary');
  });
});
