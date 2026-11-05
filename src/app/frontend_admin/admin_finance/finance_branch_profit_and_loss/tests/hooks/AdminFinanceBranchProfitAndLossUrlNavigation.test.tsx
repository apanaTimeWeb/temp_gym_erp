// RESPONSIBILITY: Regression coverage for URL-owned P&L filters and browser-history navigation.
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminFinancePnlUrlQuerySync } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/hooks/useAdminFinanceBranchProfitAndLossUrlQuerySync';

const push = vi.fn();
let queryString = 'period=LAST_MONTH&status=LOSS&other=keep';
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/frontend_admin/admin_finance/finance_branch_profit_and_loss',
  useSearchParams: () => new URLSearchParams(queryString),
}));

describe('P&L URL history is canonical', () => {
  it('reads browser navigation without pushing or replacing history', () => {
    queryString = 'period=LAST_MONTH&status=LOSS&other=keep';
    push.mockClear();
    const { result, rerender } = renderHook(() => useAdminFinancePnlUrlQuerySync());
    expect(result.current.getValue('period')).toBe('LAST_MONTH');
    queryString = 'period=Q2&other=keep';
    rerender();
    expect(result.current.getValue('period')).toBe('Q2');
    expect(result.current.getValue('status')).toBeNull();
    expect(push).not.toHaveBeenCalled();
  });

  it('preserves unrelated filters when a user selects a period', () => {
    queryString = 'status=LOSS&other=keep';
    push.mockClear();
    const { result } = renderHook(() => useAdminFinancePnlUrlQuerySync());
    act(() => result.current.setValue('period', 'Q3', 'THIS_MONTH'));
    const target = String(push.mock.calls[0]?.[0]);
    expect(target).toContain('period=Q3');
    expect(target).toContain('status=LOSS');
    expect(target).toContain('other=keep');
    expect(push.mock.calls[0]?.[1]).toEqual({ scroll: false });
  });
});
