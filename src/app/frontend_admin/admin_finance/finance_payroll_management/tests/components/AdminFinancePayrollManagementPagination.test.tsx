// RBG124: pagination renders bounded current state when API and URL metadata diverge.
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Pagination from '@/app/frontend_admin/admin_finance/finance_payroll_management/components/AdminFinancePayrollManagementPagination';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
afterEach(cleanup);
describe('Finance payroll pagination RBG124', () => {
  it('does not advertise a page past the last available page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={900} totalPages={3} totalItems={23} itemsPerPage={10} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'AdminNavigationLayoutPagination.auto_goToPage', current: 'page' })).toHaveTextContent('3');
    expect(screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutPagination.text_4bfc194b68' })).toBeDisabled();
  });
});
