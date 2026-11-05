import { describe, expect, it } from 'vitest';
import { createAdminFinancePnlCsv } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossCsvExport';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
const sample = { branchId:'b', branchName:'-2+2', location:'=cmd()', revenue:-150, expenses:-60.5, netProfit:-89.5, marginPct:-20, status:'LOSS', momDelta:0, revenueBreakdown:{ memberships:0,ptSessions:0,products:0,other:0 }, expenseBreakdown:{rent:0,salaries:0,utilities:0,maintenance:0,marketing:0}} as BranchPnlRecord;
describe('P&L numeric cells remain numeric', () => {
  it('preserves negative money and percentages, but escapes textual formula prefixes', () => {
    const csv = createAdminFinancePnlCsv([sample]);
    expect(csv).toContain('"-150","-60.5","-89.5","-20"');
    expect(csv).toContain('"\'-2+2"');
    expect(csv).toContain('"\'=cmd()"');
  });
});
