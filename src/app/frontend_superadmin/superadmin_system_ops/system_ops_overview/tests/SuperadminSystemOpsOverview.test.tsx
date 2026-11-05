import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsOverview from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/components/SuperadminSystemOpsOverview';
import { useSuperadminSystemOpsOverviewSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/hooks/useSuperadminSystemOpsOverviewSummary';

vi.mock('next-intl', () => ({ useLocale: () => 'en-IN', useTranslations: () => (key: string, values?: Record<string, unknown>) => values ? `${key} ${Object.values(values).join(' ')}` : key }));
vi.mock('next/link', () => ({ default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => <a href={href} {...props}>{children}</a> }));
vi.mock('@/components/ui/Tooltip', () => ({ default: ({ children }: { children: React.ReactNode }) => children }));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/hooks/useSuperadminSystemOpsOverviewSummary');

const mockQuery = vi.mocked(useSuperadminSystemOpsOverviewSummary);

describe('SuperadminSystemOpsOverview', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a busy skeleton while the summary is pending', () => {
    mockQuery.mockReturnValue({ isPending: true, isError: false, data: undefined, refetch: vi.fn() } as never);
    render(<SuperadminSystemOpsOverview />);
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('exposes a retry action when the summary fails', () => {
    const refetch = vi.fn();
    mockQuery.mockReturnValue({ isPending: false, isError: true, data: undefined, refetch } as never);
    render(<SuperadminSystemOpsOverview />);
    fireEvent.click(screen.getByRole('button', { name: 'ui.try_again_cb12d14' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renders module links and translated status values from the valid summary', () => {
    mockQuery.mockReturnValue({ isPending: false, isError: false, data: { data: { infrastructureStatus: 'HEALTHY', pendingJobs: 3, lastBackupAt: '2026-09-20T12:00:00Z', backupStatus: 'HEALTHY', migrationStatus: 'UP_TO_DATE' } }, refetch: vi.fn() } as never);
    render(<SuperadminSystemOpsOverview />);
    expect(screen.getByRole('link', { name: /ui.card_infrastructure_title/ })).toHaveAttribute('href', expect.stringContaining('infrastructure'));
    expect(screen.getAllByText(/ui.status_healthy/)).toHaveLength(2);
    expect(screen.getByText(/ui.status_up_to_date/)).toBeInTheDocument();
  });
});
