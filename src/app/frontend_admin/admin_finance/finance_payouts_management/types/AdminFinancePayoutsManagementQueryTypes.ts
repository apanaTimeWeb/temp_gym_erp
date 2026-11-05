// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_payouts_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementQueryTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminPayoutsSortDirection } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementSortTypes';
export interface AdminPayoutsQueryParams { month?: string; gymId?: string; status?: string; page?: number; limit?: number; sortKey?: string; sortDir?: AdminPayoutsSortDirection; }
