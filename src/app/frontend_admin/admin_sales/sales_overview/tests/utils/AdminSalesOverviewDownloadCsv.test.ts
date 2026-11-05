import { describe, expect, it, vi } from 'vitest';
import { downloadAdminSalesOverviewCsv } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewDownloadCsv';

describe('Sales Overview download lifecycle', () => {
  it('mounts an approved named CSV anchor and releases resources', () => {
    const create = vi.fn().mockReturnValue('blob:sales');
    const revoke = vi.fn();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
      expect(document.querySelector('a[download="admin_sales-overview.csv"]')).not.toBeNull();
    });
    try {
      downloadAdminSalesOverviewCsv('Date,Revenue,New Members');
      expect(click).toHaveBeenCalledTimes(1);
      expect(revoke).toHaveBeenCalledWith('blob:sales');
      expect(document.querySelector('a[download="admin_sales-overview.csv"]')).toBeNull();
    } finally { click.mockRestore(); vi.unstubAllGlobals(); }
  });
  it('releases resources on a browser download error', () => {
    const create = vi.fn().mockReturnValue('blob:sales-fail');
    const revoke = vi.fn();
    vi.stubGlobal('URL', { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { throw new Error('private error'); });
    try {
      expect(() => downloadAdminSalesOverviewCsv('x')).toThrow();
      expect(revoke).toHaveBeenCalledWith('blob:sales-fail');
      expect(document.querySelector('a[download="admin_sales-overview.csv"]')).toBeNull();
    } finally { click.mockRestore(); vi.unstubAllGlobals(); }
  });
});
