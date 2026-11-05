// RESPONSIBILITY: Selects the Admin Finance P&L fixture for a reporting period with deterministic fallback.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_branch_profit_and_loss/mocks/fixtures/AdminFinanceBranchProfitAndLossFixtureByPeriod.ts)

import type { BranchPnlRecord, PnlPeriod } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
import { MOCK_ADMIN_BRANCH_PNL, MOCK_ADMIN_BRANCH_PNL_BY_PERIOD } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/mocks/fixtures/AdminFinanceBranchProfitAndLossMockFixtures';

export function getAdminFinancePnlFixtureByPeriod(period: PnlPeriod): BranchPnlRecord[] {
  return MOCK_ADMIN_BRANCH_PNL_BY_PERIOD[period] ?? MOCK_ADMIN_BRANCH_PNL;
}
