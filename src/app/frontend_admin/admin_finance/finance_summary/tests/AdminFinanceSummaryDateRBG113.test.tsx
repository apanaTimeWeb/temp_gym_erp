// Host-only RTL/Vitest regression specification; authored, not executed in source archive.
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminFinanceOverviewDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_summary/components/date_filter/AdminFinanceSummaryDateFilterDropdown';
const state = vi.hoisted(() => ({ query: new URLSearchParams(), replace: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: state.replace }), usePathname: () => '/frontend_admin/admin_finance/finance_summary', useSearchParams: () => state.query }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_finance/finance_summary/components/searchable_dropdown/AdminFinanceSummarySearchableDropdown', () => ({ AdminNavigationLayoutSearchableDropdown: () => null }));
describe('Finance Summary custom date filtering', () => {
 beforeEach(() => { state.query = new URLSearchParams('range=custom&branchId=b2&page=8'); state.replace.mockReset(); });
 it('preserves two rapid edits, retains branch and removes page', () => {
  render(<AdminFinanceOverviewDateFilterDropdown />);
  fireEvent.change(screen.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-start-date'), {target:{value:'2026-11-01'}});
  fireEvent.change(screen.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-end-date'), {target:{value:'2026-11-30'}});
  const uri = new URL(String(state.replace.mock.lastCall?.[0]), 'https://example.test');
  expect(uri.searchParams.get('startDate')).toBe('2026-11-01');
  expect(uri.searchParams.get('endDate')).toBe('2026-11-30');
  expect(uri.searchParams.get('branchId')).toBe('b2');
  expect(uri.searchParams.has('page')).toBe(false);
 });
 it('marks impossible civil dates as invalid and never constrains native date input with them', () => {
  state.query = new URLSearchParams('range=custom&startDate=2026-02-30&endDate=2026-03-01');
  const result = render(<AdminFinanceOverviewDateFilterDropdown />);
  const start = screen.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-start-date');
  const end = screen.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-end-date');
  expect(start).toHaveAttribute('aria-invalid','true');
  expect(end).toHaveAttribute('aria-invalid','true');
  expect(end).not.toHaveAttribute('min');
  state.query = new URLSearchParams('range=custom&startDate=2028-02-29&endDate=2028-03-01');
  result.rerender(<AdminFinanceOverviewDateFilterDropdown />);
  expect(screen.getByTestId('finance-overview-finance-overview-date-filter-dropdown-admin-finance-custom-end-date')).toHaveAttribute('min','2028-02-29');
 });
});
