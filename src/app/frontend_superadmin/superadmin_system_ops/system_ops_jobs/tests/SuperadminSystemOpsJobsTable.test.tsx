import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsJobsTable from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsTable';
import { MOCK_BACKGROUND_JOBS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockData';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, unknown>) => values ? `${key} ${Object.values(values).join(' ')}` : key }));
vi.mock('@/components/ui/Tooltip', () => ({ default: ({ children }: { children: React.ReactNode }) => children }));

describe('SuperadminSystemOpsJobsTable', () => {
  const callbacks = () => ({ toggleSelection: vi.fn(), toggleAll: vi.fn(), onInspect: vi.fn(), onRetry: vi.fn(), onCancel: vi.fn(), onDelete: vi.fn() });

  it('renders the empty-state row inside the table body', () => {
    const c = callbacks();
    render(<SuperadminSystemOpsJobsTable jobs={[]} allJobsFiltered={false} selectedJobIds={new Set()} {...c} />);
    const emptyRow = screen.getByTestId('superadmin_system_ops_jobs-superadmin-system-ops-jobs-empty-state-jobs-empty-state-empty');
    expect(emptyRow.tagName).toBe('TR');
    expect(within(screen.getByRole('table')).getByTestId('superadmin_system_ops_jobs-superadmin-system-ops-jobs-empty-state-jobs-empty-state-empty')).toBeInTheDocument();
  });

  it('does not treat a retry-button keyboard action as row inspection', () => {
    const c = callbacks();
    const failedJob = MOCK_BACKGROUND_JOBS.find((job) => job.status === 'FAILED')!;
    render(<SuperadminSystemOpsJobsTable jobs={[failedJob]} allJobsFiltered={false} selectedJobIds={new Set()} {...c} />);
    const retry = screen.getByRole('button', { name: `ui.a11y_retry_job ${failedJob.id}` });
    fireEvent.keyDown(retry, { key: 'Enter' });
    expect(c.onInspect).not.toHaveBeenCalled();
    fireEvent.click(retry);
    expect(c.onRetry).toHaveBeenCalledWith(failedJob.id);
    expect(c.onInspect).not.toHaveBeenCalled();
  });
});
