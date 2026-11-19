// RBG115: repository-native URL race/history regression; requires real host Vitest/RTL.
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminFinancePnlUrlQuerySync } from '../../hooks/useAdminFinanceBranchProfitAndLossUrlQuerySync';
let query = 'period=LAST_MONTH&other=preserve';
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/frontend_admin/admin_finance/finance_branch_profit_and_loss',
  useSearchParams: () => new URLSearchParams(query),
}));
beforeEach(() => { query = 'period=LAST_MONTH&other=preserve'; push.mockClear(); });
describe('RBG115 canonical P&L URL edits', () => {
  it('merges consecutive actions before a Next router acknowledgment', () => {
    const { result } = renderHook(() => useAdminFinancePnlUrlQuerySync());
    act(() => {
      result.current.setValue('status', 'LOSS', 'ALL');
      result.current.setValue('period', 'Q2', 'THIS_MONTH');
    });
    const url = new URL(String(push.mock.lastCall?.[0]), 'https://test.invalid');
    expect(url.searchParams.get('status')).toBe('LOSS');
    expect(url.searchParams.get('period')).toBe('Q2');
    expect(url.searchParams.get('other')).toBe('preserve');
    expect(result.current.getValue('status')).toBe('LOSS');
  });
  it('does not generate duplicate history entries or clobber Back navigation', () => {
    const { result, rerender } = renderHook(() => useAdminFinancePnlUrlQuerySync());
    act(() => result.current.setValue('period', 'Q2', 'THIS_MONTH'));
    expect(push).toHaveBeenCalledTimes(1);
    act(() => result.current.setValue('period', 'Q2', 'THIS_MONTH'));
    expect(push).toHaveBeenCalledTimes(1);
    act(() => { query = 'status=LOSS&other=preserve'; rerender(); });
    expect(result.current.getValue('period')).toBeNull();
    expect(result.current.getValue('status')).toBe('LOSS');
    expect(push).toHaveBeenCalledTimes(1);
  });
});
