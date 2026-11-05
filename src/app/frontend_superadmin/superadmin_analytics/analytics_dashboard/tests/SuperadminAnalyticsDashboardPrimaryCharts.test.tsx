import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import { SuperadminAnalyticsDashboardPrimaryCharts } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/components/SuperadminAnalyticsDashboardPrimaryCharts';

describe('SuperadminAnalyticsDashboardPrimaryCharts', () => {
  it('renders a clear empty state rather than an empty chart canvas when the API returns no months', () => {
    render(<SuperadminAnalyticsDashboardPrimaryCharts charts={{
      mrrAreaOptions: {},
      mrrAreaSeries: [{ name: 'MRR', data: [] }],
      tenantBarOptions: {},
      tenantBarSeries: [{ name: 'Tenants', data: [] }, { name: 'Cancelled', data: [] }],
      locale: 'en-IN',
    } as never} />);
    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.getAllByText('ui.analytics_chart_empty_state')).toHaveLength(2);
  });
});
