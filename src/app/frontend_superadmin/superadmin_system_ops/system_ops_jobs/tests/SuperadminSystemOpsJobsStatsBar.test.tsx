import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsJobsStatsBar from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsStatsBar';
import { SUPERADMIN_JOBS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('SuperadminSystemOpsJobsStatsBar', () => {
  it('exposes and styles the active KPI filter state', () => {
    render(<SuperadminSystemOpsJobsStatsBar metrics={{ activeJobs: 3, completed24h: 4, failed24h: 1, delayed: 2 }} selectedStatus={SUPERADMIN_JOBS_STATUS_CODES.FAILED} onFilterSelect={vi.fn()} />);
    expect(screen.getByRole('button', { name: /ui.failed_24h/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /ui.active_jobs/ })).toHaveAttribute('aria-pressed', 'false');
  });

  it('changes the filter when a KPI is activated', () => {
    const onFilterSelect = vi.fn();
    render(<SuperadminSystemOpsJobsStatsBar metrics={{ activeJobs: 3, completed24h: 4, failed24h: 1, delayed: 2 }} selectedStatus="ALL" onFilterSelect={onFilterSelect} />);
    fireEvent.click(screen.getByRole('button', { name: /ui.active_jobs/ }));
    expect(onFilterSelect).toHaveBeenCalledWith(SUPERADMIN_JOBS_STATUS_CODES.ACTIVE);
  });
});
