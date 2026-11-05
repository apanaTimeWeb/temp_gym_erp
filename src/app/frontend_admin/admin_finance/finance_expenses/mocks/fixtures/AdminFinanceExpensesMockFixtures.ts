// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_expenses/mocks/fixtures/AdminFinanceOverviewMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin finance feature.
import { FINANCE_RECORD_STATUSES } from '@/app/frontend_admin/admin_finance/finance_expenses/constants/AdminFinanceExpensesConstants';
import type { FinanceSummary } from '@/app/frontend_admin/admin_finance/finance_expenses/types/AdminFinanceExpensesTypes';
import type { Payment, Expense } from '@/app/frontend_admin/admin_finance/finance_expenses/types/AdminFinanceExpensesTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin finance feature.

export const MOCK_ADMIN_FINANCE_SUMMARY: FinanceSummary = {
  totalRevenue: 5400000,
  monthlyRevenue: 1200000,
  pendingAmount: 350000,
  totalPayments: 850,
  totalExpenses: 2800000,
  netProfit: 2600000,
  revenueByMethod: {
    UPI: 3200000,
    Cash: 500000,
    Card: 1200000,
    NetBanking: 500000
  },
  monthlyData: [
    { month: 'Jan', revenue: 1000000 },
    { month: 'Feb', revenue: 1100000 },
    { month: 'Mar', revenue: 1050000 },
    { month: 'Apr', revenue: 1150000 },
    { month: 'May', revenue: 1250000 },
    { month: 'Jun', revenue: 1200000 }
  ]
};

export const MOCK_ADMIN_PAYMENTS: Payment[] = [
  {
    id: 'p1',
    memberId: 'm1',
    amount: 15000,
    method: 'UPI',
    paymentMode: 'UPI',
    status: FINANCE_RECORD_STATUSES.COMPLETED,
    invoiceNo: 'INV-2023-001',
    paidAt: '2026-10-15T10:30:00Z',
    member: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', plan: { name: 'Annual Pro' } }
  },
  {
    id: 'p2',
    memberId: 'm2',
    amount: 5000,
    method: 'Cash',
    paymentMode: 'CASH',
    status: FINANCE_RECORD_STATUSES.COMPLETED,
    invoiceNo: 'INV-2023-002',
    paidAt: '2026-10-16T11:45:00Z',
    member: { name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', plan: { name: 'Quarterly' } }
  },
];

export const MOCK_ADMIN_PAYMENTS_EXPANDED: Payment[] = [
  ...MOCK_ADMIN_PAYMENTS,
  ...Array.from({ length: 16 }, (_, index) => {
    const n = index + 3;
    return {
      id: `pay${n}`,
      memberId: `m${n}`,
      amount: 1200 + (index % 8) * 950,
      method: ['UPI', 'Cash', 'Card', 'NetBanking'][index % 4]!,
      paymentMode: ['UPI', 'CASH', 'CARD', 'ONLINE'][index % 4]!,
      status: (index % 7 === 0 ? FINANCE_RECORD_STATUSES.PENDING : FINANCE_RECORD_STATUSES.COMPLETED) as Payment['status'],
      invoiceNo: `INV-2026-${String(n).padStart(3, '0')}`,
      paidAt: `2026-09-${String((index % 15) + 1).padStart(2, '0')}T${String(9 + (index % 8)).padStart(2, '0')}:30:00Z`,
      member: { name: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]! + ` ${n}`, email: `member${n}@example.com`, phone: `987654${(3210 + n).toString().slice(-4)}`, plan: { name: ['Annual Pro', 'Quarterly', 'Monthly Basic'][index % 3]! } },
    };
  }),
] as Payment[];

export const MOCK_ADMIN_EXPENSES: Expense[] = [
  { id: 'e1', category: 'Rent', amount: 85000, branchId: 'b1', date: '2026-09-01', notes: 'Monthly branch rent', recordedBy: 'Admin' },
  { id: 'e2', category: 'Utilities', amount: 21000, branchId: 'b2', date: '2026-09-05', notes: 'Utility bills', recordedBy: 'Admin' },
];
