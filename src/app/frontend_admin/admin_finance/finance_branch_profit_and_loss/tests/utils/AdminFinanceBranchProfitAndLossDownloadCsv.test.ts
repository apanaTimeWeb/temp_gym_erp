import { describe, expect, it, vi } from 'vitest';
import { downloadAdminFinanceBranchProfitAndLossCsv } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossDownloadCsv';

describe('Branch P&L download lifecycle', () => {
  it('mounts and removes anchor and preserves the post-click URL release', () => {
    const create = vi.fn().mockReturnValue('blob:pnl');
    const revoke = vi.fn();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
      expect(document.querySelector('a[download="branch-pnl.csv"]')).not.toBeNull();
    });
    const timeout = vi.spyOn(window, 'setTimeout').mockImplementation(((fn: TimerHandler) => { if(typeof fn === 'function') fn(); return 1; }) as typeof setTimeout);
    try {
      downloadAdminFinanceBranchProfitAndLossCsv('a,b', 'branch-pnl.csv');
      expect(click).toHaveBeenCalledTimes(1);
      expect(revoke).toHaveBeenCalledWith('blob:pnl');
      expect(document.querySelector('a[download="branch-pnl.csv"]')).toBeNull();
    } finally { timeout.mockRestore(); click.mockRestore(); vi.unstubAllGlobals(); }
  });
  it('immediately releases a Blob URL after click fails', () => {
    const create = vi.fn().mockReturnValue('blob:pnl-fail');
    const revoke = vi.fn();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { throw new Error('browser failed'); });
    try {
      expect(() => downloadAdminFinanceBranchProfitAndLossCsv('x', 'branch-pnl.csv')).toThrow();
      expect(revoke).toHaveBeenCalledWith('blob:pnl-fail');
      expect(document.querySelector('a[download="branch-pnl.csv"]')).toBeNull();
    } finally { click.mockRestore(); vi.unstubAllGlobals(); }
  });
});
