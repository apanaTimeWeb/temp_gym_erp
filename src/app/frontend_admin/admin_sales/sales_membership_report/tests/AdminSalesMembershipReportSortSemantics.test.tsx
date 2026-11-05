// RESPONSIBILITY: Ensures visible sortable header semantics reflect actual membership report ordering.
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminSalesAnalyticsMembershipReport from '@/app/frontend_admin/admin_sales/sales_membership_report/components/membership_report/AdminSalesMembershipReportMembershipReport';

const model = vi.hoisted(() => ({
  membershipReport: [
    { id: 1, plan: 'Starter', receivable: 100, received: 50, remaining: 50, refund: 0 },
    { id: 2, plan: 'Growth', receivable: 300, received: 100, remaining: 200, refund: 0 },
  ],
  membershipTotals: { totalReceivable: 400, totalReceived: 150, remaining: 250, refunds: 0 },
  membershipReportStatus: 'success',
  membershipReportError: '',
  retryMembershipReport: vi.fn(),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, params?: { label?: string }) => params?.label ? `${key} ${params.label}` : key, useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportLogic', () => ({
  useAdminSalesLogic: () => model,
}));

describe('membership report column header sorting', () => {
  beforeEach(() => model.retryMembershipReport.mockReset());
  it('puts aria-sort on the column header and updates it after a user change', () => {
    render(<AdminSalesAnalyticsMembershipReport />);
    const receivable = screen.getByRole('columnheader', { name: /totalReceivable/ });
    const plan = screen.getByRole('columnheader', { name: /plan/ });
    expect(receivable).toHaveAttribute('aria-sort', 'descending');
    expect(within(receivable).getByRole('button')).not.toHaveAttribute('aria-sort');
    expect(plan).not.toHaveAttribute('aria-sort');
    fireEvent.click(within(plan).getByRole('button'));
    expect(plan).toHaveAttribute('aria-sort', 'descending');
    expect(receivable).not.toHaveAttribute('aria-sort');
    fireEvent.click(within(plan).getByRole('button'));
    expect(plan).toHaveAttribute('aria-sort', 'ascending');
  });
});
