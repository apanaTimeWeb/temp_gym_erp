import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { useAdminPlansRevenueUrlQuerySync } from '../hooks/useAdminFinancePlanRevenueAnalyticsUrlQuerySync';

let query = 'period=LAST_MONTH&search=Alpha&page=3&branch=retain';
const replace = vi.fn();
const router = { replace };
vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => '/frontend_admin/admin_finance/finance_plan_revenue_analytics',
  useSearchParams: () => new URLSearchParams(query),
}));
function Filters() {
  const [period, setPeriod] = useState('THIS_MONTH');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  useAdminPlansRevenueUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (v) => setPeriod(v ?? 'THIS_MONTH') },
    { key: 'search', value: search, defaultValue: '', setValue: (v) => setSearch(v ?? '') },
    { key: 'page', value: page, defaultValue: 1, setValue: value => setPage(Number(value) || 1) },
  ]);
  return <div>
    <output data-testid="period">{period}</output><output data-testid="search">{search}</output><output data-testid="page">{page}</output>
    <button onClick={() => setSearch('Beta')}>Search Beta</button>
    <button onClick={() => setPeriod('THIS_YEAR')}>Year</button>
  </div>;
}
describe('RBG114 URL-state reconciliation', () => {
  beforeEach(() => { query = 'period=LAST_MONTH&search=Alpha&page=3&branch=retain'; replace.mockClear(); });
  it('hydrates URL, retains unknown params and combines consecutive edits without router acknowledgment', async () => {
    render(<Filters />);
    await waitFor(() => expect(screen.getByTestId('period').textContent).toBe('LAST_MONTH'));
    expect(screen.getByTestId('page').textContent).toBe('3');
    expect(replace).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Search Beta'));
    fireEvent.click(screen.getByText('Year'));
    await waitFor(() => {
      const latest = new URL(replace.mock.lastCall![0], 'https://test.invalid');
      expect(latest.searchParams.get('period')).toBe('THIS_YEAR');
      expect(latest.searchParams.get('search')).toBe('Beta');
      expect(latest.searchParams.get('branch')).toBe('retain');
    });
  });
  it('restores defaults when browser navigation removes query keys', async () => {
    const { rerender } = render(<Filters />);
    await waitFor(() => expect(screen.getByTestId('search').textContent).toBe('Alpha'));
    act(() => { query = 'branch=retain'; rerender(<Filters />); });
    await waitFor(() => {
      expect(screen.getByTestId('period').textContent).toBe('THIS_MONTH');
      expect(screen.getByTestId('search').textContent).toBe('');
      expect(screen.getByTestId('page').textContent).toBe('1');
    });
    expect(replace).not.toHaveBeenCalled();
  });
});
