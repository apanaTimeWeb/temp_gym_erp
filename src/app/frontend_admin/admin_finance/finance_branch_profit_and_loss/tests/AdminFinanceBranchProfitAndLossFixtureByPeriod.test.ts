// RESPONSIBILITY: Defines regression tests for AdminFinanceBranchProfitAndLossFixtureByPeriod.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_branch_profit_and_loss/tests/AdminFinanceBranchProfitAndLossFixtureByPeriod.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminFinancePnlFixtureByPeriod } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/mocks/fixtures/AdminFinanceBranchProfitAndLossFixtureByPeriod';

describe('getAdminFinancePnlFixtureByPeriod', () => {
  it('returns period-specific fixture values', () => {
    const thisMonth = getAdminFinancePnlFixtureByPeriod('THIS_MONTH');
    const lastMonth = getAdminFinancePnlFixtureByPeriod('LAST_MONTH');
    expect(thisMonth[0]?.revenue).not.toBe(lastMonth[0]?.revenue);
  });
});
