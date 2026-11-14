import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/AdminBillingSubscriptionInvoicesPagination';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('RBG130 invoice paginator defensive render', () => {
  it('normalizes impossible currentPage/totalPages before creating navigation controls', () => {
    const onPageChange = vi.fn();
    render(<AdminNavigationLayoutPagination currentPage={999} totalPages={2} totalItems={11} itemsPerPage={10} onPageChange={onPageChange}/>);
    expect(screen.getAllByText('11')[0]).toBeTruthy();
    const previous = screen.getByRole('button', { name: 'admin_layout.AdminNavigationLayoutPagination.text_81f547195b' });
    fireEvent.click(previous);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
