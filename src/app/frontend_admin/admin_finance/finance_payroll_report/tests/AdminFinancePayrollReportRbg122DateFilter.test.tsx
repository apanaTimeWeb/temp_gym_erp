import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminFinancePayrollReportDateFilterDropdown } from '../components/date_filter/AdminFinancePayrollReportDateFilterDropdown';

const nav = vi.hoisted(() => ({
  search: 'range=custom&branchId=branch-a&page=4',
  replacements: [] as string[],
}));
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_admin/admin_finance/finance_payroll_report',
  useSearchParams: () => new URLSearchParams(nav.search),
  useRouter: () => ({ replace: (url: string) => nav.replacements.push(url) }),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('../components/searchable_dropdown/AdminFinancePayrollReportSearchableDropdown', () => ({
  AdminFinancePayrollReportSearchableDropdown: ({ onChange }: { onChange: (value: string) => void }) =>
    <button type="button" onClick={() => onChange('this_month')}>Preset</button>,
}));
vi.mock('../components/date_filter/AdminFinancePayrollReportDateRangePicker', () => ({
  default: ({ onChange }: { onChange: (start: string, end: string) => void }) =>
    <div><button type="button" onClick={() => onChange('2028-02-29', '')}>Set start</button>
    <button type="button" onClick={() => onChange('2028-02-29', '2028-03-01')}>Set end</button></div>,
}));

beforeEach(() => { nav.search = 'range=custom&branchId=branch-a&page=4'; nav.replacements.length = 0; });

describe('RBG122 Payroll Report date URL synchronization', () => {
  it('merges two rapid boundary updates, retains other filters and removes an obsolete page', () => {
    render(<AdminFinancePayrollReportDateFilterDropdown />);
    fireEvent.click(screen.getByRole('button', { name: 'Set start' }));
    fireEvent.click(screen.getByRole('button', { name: 'Set end' }));
    expect(nav.replacements).toHaveLength(2);
    const url = new URL(nav.replacements[1], 'http://localhost');
    expect(url.searchParams.get('startDate')).toBe('2028-02-29');
    expect(url.searchParams.get('endDate')).toBe('2028-03-01');
    expect(url.searchParams.get('branchId')).toBe('branch-a');
    expect(url.searchParams.has('page')).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Set end' }));
    expect(nav.replacements).toHaveLength(2);
  });

  it('drops unacknowledged changes when browser history provides a different URL', () => {
    const view = render(<AdminFinancePayrollReportDateFilterDropdown />);
    fireEvent.click(screen.getByRole('button', { name: 'Set start' }));
    nav.search = 'range=custom&branchId=branch-b&startDate=2028-02-29&endDate=2028-03-01';
    view.rerender(<AdminFinancePayrollReportDateFilterDropdown />);
    fireEvent.click(screen.getByRole('button', { name: 'Set end' }));
    const url = new URL(nav.replacements.at(-1)!, 'http://localhost');
    expect(url.searchParams.get('branchId')).toBe('branch-b');
  });

  it('uses full civil-date validation for the visible custom range state', () => {
    nav.search = 'range=custom&startDate=2028-02-30&endDate=2028-03-01';
    const view = render(<AdminFinancePayrollReportDateFilterDropdown />);
    expect(screen.getByTestId('admin-finance-payroll-date-range-status').className).toContain('text-danger');
    nav.search = 'range=custom&startDate=2028-02-29&endDate=2028-03-01';
    view.rerender(<AdminFinancePayrollReportDateFilterDropdown />);
    expect(screen.getByTestId('admin-finance-payroll-date-range-status').className).toContain('text-secondary');
  });
});
