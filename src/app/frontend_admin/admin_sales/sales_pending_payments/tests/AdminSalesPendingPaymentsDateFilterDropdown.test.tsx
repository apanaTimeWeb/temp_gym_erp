// RESPONSIBILITY: Exercises quick URL-backed date edits and invalid custom date accessibility.
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminSalesAnalyticsDateFilterDropdown } from '@/app/frontend_admin/admin_sales/sales_pending_payments/components/date_filter/AdminSalesPendingPaymentsDateFilterDropdown';
const nav = vi.hoisted(() => ({ query: new URLSearchParams(), replace: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: nav.replace }),
  useSearchParams: () => nav.query,
  usePathname: () => '/frontend_admin/admin_sales/sales_pending_payments',
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_sales/sales_pending_payments/components/searchable_dropdown/AdminSalesPendingPaymentsSearchableDropdown', () => ({
  AdminNavigationLayoutSearchableDropdown: ({ onChange }: { onChange: (value: string) => void }) => <button onClick={() => onChange('custom')}>Custom</button>,
}));

describe('Sales Pending Payments date selector', () => {
  beforeEach(() => { nav.query = new URLSearchParams('range=custom&branchId=b1&page=4'); nav.replace.mockReset(); });
  it('merges two edits before the asynchronous URL render catches up', () => {
    render(<AdminSalesAnalyticsDateFilterDropdown />);
    fireEvent.change(screen.getByTestId('admin_sales-custom-start-date'), { target: { value: '2026-01-10' } });
    fireEvent.change(screen.getByTestId('admin_sales-custom-end-date'), { target: { value: '2026-01-20' } });
    const finalUrl = new URL(String(nav.replace.mock.lastCall?.[0]), 'https://example.test');
    expect(finalUrl.searchParams.get('startDate')).toBe('2026-01-10');
    expect(finalUrl.searchParams.get('endDate')).toBe('2026-01-20');
    expect(finalUrl.searchParams.get('branchId')).toBe('b1');
    expect(finalUrl.searchParams.has('page')).toBe(false);
  });
  it('does not set an impossible URL date as the native minimum and exposes an associated error', () => {
    nav.query = new URLSearchParams('range=custom&startDate=2026-02-30&endDate=2026-03-04');
    render(<AdminSalesAnalyticsDateFilterDropdown />);
    const start = screen.getByTestId('admin_sales-custom-start-date');
    const end = screen.getByTestId('admin_sales-custom-end-date');
    expect(end).not.toHaveAttribute('min');
    expect(start).toHaveAttribute('aria-invalid', 'true');
    expect(end).toHaveAttribute('aria-invalid', 'true');
    expect(start.getAttribute('aria-describedby')).toBeTruthy();
    expect(end.getAttribute('aria-describedby')).toBe(start.getAttribute('aria-describedby'));
    expect(document.getElementById(start.getAttribute('aria-describedby')!)).toHaveAttribute('role', 'status');
  });
});
