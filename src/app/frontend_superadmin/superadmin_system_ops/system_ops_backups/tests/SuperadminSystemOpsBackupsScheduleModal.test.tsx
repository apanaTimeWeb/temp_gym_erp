// RESPONSIBILITY: Renders the SuperadminSystemOpsBackupsScheduleModal.test overlay UI and delegates submission or mutation behavior to module-owned hooks/callbacks.
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsBackupsScheduleModal from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/components/SuperadminSystemOpsBackupsScheduleModal';
import { useSuperadminSystemOpsBackupsSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsSchedule';
import { resetSuperadminBackupsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/mocks/SuperadminSystemOpsBackupsMockHandlers';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsSchedule", () => ({ useSuperadminSystemOpsBackupsSchedule: vi.fn() }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockedUseSchedule = vi.mocked(useSuperadminSystemOpsBackupsSchedule);
const mockedToast = vi.mocked(toast);

beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('SuperadminSystemOpsBackupsScheduleModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads the authoritative schedule and saves through the mutation contract', async () => {
    const saveSchedule = vi.fn().mockResolvedValue({
      success: true,
      message: 'Backup schedule updated',
      data: { cronExpression: '0 3 * * *', retentionDays: 45, updatedAt: '2026-09-18T03:00:00Z' },
    });
    mockedUseSchedule.mockReturnValue({
      schedule: { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' },
      isPending: false,
      isError: false,
      queryError: null,
      retry: vi.fn(),
      saveSchedule,
      isSaving: false,
      saveError: null,
    });
    const onClose = vi.fn();
    render(<SuperadminSystemOpsBackupsScheduleModal isOpen onClose={onClose} />);

    const cron = screen.getByLabelText('Cron Expression');
    const retention = screen.getByLabelText('Retention Period (Days)');
    fireEvent.change(cron, { target: { value: '0 3 * * *' } });
    fireEvent.change(retention, { target: { value: '45' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save Schedule' }));

    await waitFor(() => expect(saveSchedule).toHaveBeenCalledWith({ cronExpression: '0 3 * * *', retentionDays: 45 }));
    expect(mockedToast.success).toHaveBeenCalledWith('Backup schedule updated', { id: 'superadmin-backups-schedule-save' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render editable defaults when the authoritative schedule fails to load', async () => {
    const retry = vi.fn();
    const saveSchedule = vi.fn();
    mockedUseSchedule.mockReturnValue({
      schedule: undefined,
      isPending: false,
      isError: true,
      queryError: new Error('schedule unavailable'),
      retry,
      saveSchedule,
      isSaving: false,
      saveError: null,
    });
    render(<SuperadminSystemOpsBackupsScheduleModal isOpen onClose={vi.fn()} />);

    expect(screen.queryByLabelText('Cron Expression')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(retry).toHaveBeenCalledTimes(1);
    expect(saveSchedule).not.toHaveBeenCalled();
  });

  it('blocks invalid retention values before invoking the mutation', async () => {
    const saveSchedule = vi.fn();
    mockedUseSchedule.mockReturnValue({
      schedule: { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' },
      isPending: false,
      isError: false,
      queryError: null,
      retry: vi.fn(),
      saveSchedule,
      isSaving: false,
      saveError: null,
    });
    render(<SuperadminSystemOpsBackupsScheduleModal isOpen onClose={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Retention Period (Days)'), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save Schedule' }));

    await waitFor(() => expect(screen.getByText(/retention.*(?:1|one)/i)).toBeInTheDocument());
    expect(saveSchedule).not.toHaveBeenCalled();
  });
});
