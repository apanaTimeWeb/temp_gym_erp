// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_payouts_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { PayoutTab } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';
export interface AdminPayoutsStore {
  activeTab: PayoutTab;
  setActiveTab: (t: PayoutTab) => void;
  monthFilter: string;
  setMonthFilter: (m: string) => void;
  gymFilter: string;
  setGymFilter: (g: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
