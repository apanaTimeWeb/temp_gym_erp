import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary.constants';
import type { Payment, FinanceSummary } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary.types';

/**
 * @description Provides the ManagerFinancePaymentsAndSummaryMockData implementation for the finance module.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_finance_types/ManagerFinancePaymentsAndSummaryTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_FINANCE_SUMMARY: FinanceSummary = {
  totalRevenue: 150000000,
  monthlyRevenue: 12500000,
  pendingAmount: 1500000,
  totalPayments: 450,
  gstCollected: 2250000,
  totalRefunds: 500000,
  netRevenue: 149500000,
  revenueByMethod: {
    'UPI': 80000,
    'Card': 30000,
    'Cash': 15000,
    'NetBanking': 0,
    'Cheque': 0,
    'Other': 0 },
  monthlyData: [
    { month: 'Jan', revenue: 11000000 },
    { month: 'Feb', revenue: 11500000 },
    { month: 'Mar', revenue: 12000000 },
    { month: 'Apr', revenue: 11800000 },
    { month: 'May', revenue: 12500000 },
  ] };

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay1',
    memberId: 'm1',
    amount: 1500000,
    method: 'UPI',
    status: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES.PAID,
    invoiceNumber: 'INV-001',
    receiptNumber: 'REC-001',
    paidAt: '2024-05-01T10:00:00Z',
    gstAmount: 270000,
    discountAmount: 0,
    taxableAmount: 1230000,
    member: { name: 'Aarav Patel', email: 'aarav.p@example.com', phone: '+919876543210', plan: { name: 'Annual Pro' } } },
  {
    id: 'pay2',
    memberId: 'm2',
    amount: 200000,
    method: 'Card',
    status: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES.PAID,
    invoiceNumber: 'INV-002',
    receiptNumber: 'REC-002',
    paidAt: '2024-05-10T14:30:00Z',
    gstAmount: 36000,
    discountAmount: 50000,
    taxableAmount: 164000,
    member: { name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+919876543211', plan: { name: 'Quarterly Starter' } } },
  {
    id: 'pay3',
    memberId: 'm3',
    amount: 200000,
    method: 'Cash',
    status: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_STATUS_VALUES.PAID,
    invoiceNumber: 'INV-003',
    receiptNumber: 'REC-003',
    paidAt: '2024-05-15T09:15:00Z',
    gstAmount: 36000,
    discountAmount: 0,
    taxableAmount: 164000,
    member: { name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '+919876543212', plan: { name: 'Monthly Basic' } } }
];
