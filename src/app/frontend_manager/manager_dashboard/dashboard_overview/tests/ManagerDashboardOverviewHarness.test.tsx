import { screen } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { renderManagerDashboardOverview } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/tests/harness/bootstrap';

function HarnessProbe() {
  const t = useTranslations('probe');
  const queryClient = useQueryClient();
  return <div data-testid="dashboard-overview-harness-probe" data-query-client={String(Boolean(queryClient))}>{t('ready')}</div>;
}

describe('ManagerDashboardOverviewHarness', () => {
  it('provides isolated query and translation contexts to a leaf view', () => {
    renderManagerDashboardOverview(<HarnessProbe />, {
      messages: { probe: { ready: 'Dashboard harness ready' } },
    });

    expect(screen.getByTestId('dashboard-overview-harness-probe')).toHaveTextContent('Dashboard harness ready');
    expect(screen.getByTestId('dashboard-overview-harness-probe')).toHaveAttribute('data-query-client', 'true');
  });
});
