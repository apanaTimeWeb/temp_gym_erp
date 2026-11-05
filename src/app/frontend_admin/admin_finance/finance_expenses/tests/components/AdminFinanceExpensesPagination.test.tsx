// RESPONSIBILITY: Regression checks for hostile pagination props, clamped navigation, and accessible current-page state.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_finance/finance_expenses/components/AdminFinanceExpensesPagination';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string, args?: {page?: number}) => args?.page ? `${key} ${args.page}` : key }));
afterEach(cleanup);

describe('Finance Expenses pagination', () => {
  it('normalizes invalid page bounds and never asks to navigate to non-finite pages', () => {
    const onPageChange = vi.fn();
    render(<AdminNavigationLayoutPagination currentPage={Number.POSITIVE_INFINITY} totalPages={Number.NaN} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { current: 'page' })).toHaveTextContent('1');
    expect(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutPagination.text_4bfc194b68' })).toBeDisabled();
    expect(onPageChange).not.toHaveBeenCalled();
  });
  it('clamps the active page to the last valid page and goes backward', () => {
    const onPageChange = vi.fn();
    render(<AdminNavigationLayoutPagination currentPage={999} totalPages={3} onPageChange={onPageChange} totalItems={18} itemsPerPage={8} />);
    expect(screen.getByRole('button', { current: 'page' })).toHaveTextContent('3');
    fireEvent.click(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutPagination.text_81f547195b' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
