// RESPONSIBILITY: Defines regression tests for AdminFinanceBranchProfitAndLossCsvExport.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_branch_profit_and_loss/tests/AdminFinanceBranchProfitAndLossCsvExport.test.ts)

import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAdminFinancePnlCsv, getAdminFinancePnlExportDateKey } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossCsvExport';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

const record: BranchPnlRecord = { branchId: 'b1', branchName: '=HYPERLINK("x")', location: 'North, "Hall"', revenue: 100.25, expenses: 40.5, netProfit: 59.75, marginPct: 59.6, status: 'PROFITABLE', momDelta: 2, revenueBreakdown: { memberships: 0, ptSessions: 0, products: 0, other: 0 }, expenseBreakdown: { rent: 0, salaries: 0, utilities: 0, maintenance: 0, marketing: 0 } };

describe('createAdminFinancePnlCsv', () => {
  it('quotes CSV cells, preserves numeric precision, and neutralizes formula-like labels', () => {
    const csv = createAdminFinancePnlCsv([record]);
    expect(csv).toContain(`"'=HYPERLINK(""x"")"`);
    expect(csv).toContain(`"North, ""Hall"""`);
    expect(csv).toContain('"100.25","40.5","59.75"');
  });
});

afterEach(() => { vi.useRealTimers(); });

describe('getAdminFinancePnlExportDateKey', () => {
  it('uses the UTC date portion for export filenames', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T23:30:00.000Z'));
    expect(getAdminFinancePnlExportDateKey()).toBe('2026-10-28');
  });
});

describe('Finance P&L CSV control-prefix safety', () => {
  it('neutralizes hidden or multiline formula prefixes in text columns', () => {
    const csv = createAdminFinancePnlCsv([{ ...record, branchName: '\n=HYPERLINK("x")', location: '\uFEFF@call' }]);
    expect(csv).toContain(`"'\n=HYPERLINK(""x"")"`);
    expect(csv).toContain(`"'\uFEFF@call"`);
  });
  it('retains non-formula financial numeric precision', () => {
    const csv = createAdminFinancePnlCsv([{ ...record, branchName: 'Branch A', location: 'East' }]);
    expect(csv).toContain('"100.25","40.5","59.75","59.6"');
  });
});

describe('Finance P&L negative financial amounts', () => {
  it('preserves negative numeric amounts as numbers without formula-apostrophe prefixes', () => {
    const csv = createAdminFinancePnlCsv([{ ...record, branchName: '-1+1', location: 'East', revenue: -15.25, expenses: -2, netProfit: -13.25, marginPct: -86.5 }]);
    expect(csv).toContain('"-15.25","-2","-13.25","-86.5"');
    expect(csv).toContain(`"'-1+1"`);
  });
});
