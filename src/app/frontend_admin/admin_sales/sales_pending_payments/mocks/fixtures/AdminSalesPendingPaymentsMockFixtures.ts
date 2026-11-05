// RESPONSIBILITY: Fixtures for the pending-payments endpoint only.
import { ADMIN_SALES_PENDING_PAYMENT_STATUS } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsConstants';
import type { PendingPaymentMember } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsTypes';
export const MOCK_ADMIN_PENDING_PAYMENTS: PendingPaymentMember[] = [
  {
    id: 'm1', name: 'Ravi Verma', email: 'ravi@example.com', phone: '9876543210', gender: 'Male',
    branch: 'Andheri East', planId: 'p1', plan: 'Annual Pro', billingCycle: 'annual', status: ADMIN_SALES_PENDING_PAYMENT_STATUS.PENDING,
    joinDate: '2026-01-15', expiryDate: '2026-01-15', paidAmount: 0, pendingAmount: 18000,
    daysOverdue: 15, createdAt: '2026-01-15T10:00:00Z',
  },
];
