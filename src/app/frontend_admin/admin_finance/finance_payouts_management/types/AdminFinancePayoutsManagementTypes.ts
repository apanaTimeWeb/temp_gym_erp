// RESPONSIBILITY: TypeScript types for the Admin Payouts module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes.ts)

export type PayoutTab = 'summary' | 'pnl';
export type PayoutSortKey = 'gymName' | 'month' | 'grossRevenue' | 'staffPayroll' | 'operationalExpenses' | 'platformFee' | 'netProfit' | 'payoutStatus';
export type PnlSortKey = 'gymName' | 'month' | 'revenue' | 'cogs' | 'grossProfit' | 'staffCost' | 'rentUtilities' | 'marketing' | 'miscExpenses' | 'ebitda' | 'tax' | 'netProfit';
export type PnlSortDirection = 'asc' | 'desc';
export type PayoutSortDirection = 'asc' | 'desc';
export type GymPayoutStatus = 'paid' | 'pending' | 'processing';

export interface GymPayout {
  gymId: string;
  gymName: string;
  month: string;
  grossRevenue: number;
  staffPayroll: number;
  operationalExpenses: number;
  platformFee: number;
  netProfit: number;
  payoutStatus: GymPayoutStatus;
  paidOn?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export interface PnLEntry {
  gymId: string;
  gymName: string;
  month: string;
  revenue: number;
  cogs: number;
  grossProfit: number;
  staffCost: number;
  rentUtilities: number;
  marketing: number;
  miscExpenses: number;
  ebitda: number;
  tax: number;
  netProfit: number;
}

export interface PayoutsKPIData {
  totalNetProfit: number;
  totalGrossRevenue: number;
  totalExpenses: number;
  pendingPayouts: number;
}
