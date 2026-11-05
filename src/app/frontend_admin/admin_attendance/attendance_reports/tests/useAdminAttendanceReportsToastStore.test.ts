import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_attendance/attendance_reports/state/useAdminAttendanceReportsToastStore';

/** Reports toast IDs are event identities; localized message text is never used as an implicit ID. */
describe('AdminAttendanceReports toast identity', () => {
  beforeEach(() => useAdminNavigationLayoutToastStore.setState({ toast: null }));

  it('rejects an empty runtime ID rather than falling back to message content', () => {
    useAdminNavigationLayoutToastStore.getState().showToast('message', 'error', '');
    expect(useAdminNavigationLayoutToastStore.getState().toast).toBeNull();
  });

  it('deduplicates a repeated event ID and allows a distinct event', () => {
    const state = useAdminNavigationLayoutToastStore.getState();
    state.showToast('Failed to export', 'error', 'reports-export-failed');
    const first = useAdminNavigationLayoutToastStore.getState().toast;
    state.showToast('Different translated message', 'error', 'reports-export-failed');
    expect(useAdminNavigationLayoutToastStore.getState().toast).toBe(first);
    state.showToast('Export complete', 'success', 'reports-export-success');
    expect(useAdminNavigationLayoutToastStore.getState().toast).toMatchObject({ id: 'reports-export-success', type: 'success' });
  });
});
