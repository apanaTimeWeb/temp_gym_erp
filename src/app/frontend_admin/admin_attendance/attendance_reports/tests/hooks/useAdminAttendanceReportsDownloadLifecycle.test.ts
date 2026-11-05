import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminAttendanceReportsMutations } from '@/app/frontend_admin/admin_attendance/attendance_reports/hooks/useAdminAttendanceReportsMutations';
import { adminToast } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/feedback/AdminAttendanceReportsToastService';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/components/feedback/AdminAttendanceReportsToastService', () => ({adminToast:{error:vi.fn()}}));
vi.mock('@tanstack/react-query', () => ({ useMutation: () => ({mutateAsync:vi.fn().mockResolvedValue(new Blob(['report']))}) }));

/** jsdom may not implement Blob URLs: install only the two URL statics used by the hook. */
function stubBlobUrls(uri: string) {
  const priorCreate = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
  const priorRevoke = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
  const create = vi.fn().mockReturnValue(uri);
  const revoke = vi.fn();
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: create });
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revoke });
  return {
    create,
    revoke,
    restore: () => {
      if (priorCreate) Object.defineProperty(URL, 'createObjectURL', priorCreate);
      else Reflect.deleteProperty(URL, 'createObjectURL');
      if (priorRevoke) Object.defineProperty(URL, 'revokeObjectURL', priorRevoke);
      else Reflect.deleteProperty(URL, 'revokeObjectURL');
    },
  };
}

describe('AdminAttendanceReports download cleanup', () => {
  it('removes temporary anchor and revokes the Blob URL on successful download', async () => {
    const { create, revoke, restore } = stubBlobUrls('blob:test');
    const click = vi.spyOn(HTMLAnchorElement.prototype,'click').mockImplementation(() => undefined);
    try {
      const { result } = renderHook(() => useAdminAttendanceReportsMutations());
      await act(async () => { await result.current.exportReport({ from:'2026-01-01',to:'2026-01-31',type:'attendance',format:'csv' } as never); });
      expect(create).toHaveBeenCalledTimes(1);
      expect(revoke).toHaveBeenCalledWith('blob:test');
      expect(document.querySelector('a[href="blob:test"]')).toBeNull();
    } finally { click.mockRestore();restore(); }
  });
  it('revokes resources and emits a safe error if browser click fails', async () => {
    const { create, revoke, restore } = stubBlobUrls('blob:failed');
    const click = vi.spyOn(HTMLAnchorElement.prototype,'click').mockImplementation(() => { throw new Error('PRIVATE_BROWSER_DETAIL'); });
    try {
      const { result } = renderHook(() => useAdminAttendanceReportsMutations());
      await act(async () => { await result.current.exportReport({ from:'2026-01-01',to:'2026-01-31',type:'attendance',format:'csv' } as never); });
      expect(revoke).toHaveBeenCalledWith('blob:failed');
      expect(adminToast.error).toHaveBeenCalledWith('reports.admin_reports_main.exportError','admin-reports-export-error');
      expect(document.querySelector('a[href="blob:failed"]')).toBeNull();
    } finally { click.mockRestore();restore(); }
  });
});
