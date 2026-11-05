// RBG115: expanded breakdown has stable ID matching its control; run with host RTL.
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminFinanceBranchProfitAndLossTable from '../../components/table/AdminFinanceBranchProfitAndLossTable';
import { MOCK_ADMIN_BRANCH_PNL } from '../../mocks/fixtures/AdminFinanceBranchProfitAndLossMockFixtures';
vi.mock('next-intl', () => ({useLocale: () => 'hi-IN', useTranslations: () => (key: string) => key }));
describe('RBG115 expandable finance P&L table', () => {
  it('connects expanded disclosure to an existing details row', () => {
    const { container } = render(<AdminFinanceBranchProfitAndLossTable
      data={[MOCK_ADMIN_BRANCH_PNL[0]]} sortKey="netProfit" sortDir="desc"
      onSort={() => {}} expandedBranchId="b1" onToggleExpand={() => {}}
      statusFilter="ALL" onResetFilter={() => {}} />);
    const button = screen.getByRole('button', { expanded: true });
    const target = button.getAttribute('aria-controls');
    expect(target).toBeTruthy();
    expect(container.querySelector('tr[id]')?.id).toBe(target);
  });
});
