import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SuperadminBillingUsageMetersProgressBar from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/components/usage_meters_dashboard_states_and_feedback/SuperadminBillingUsageMetersDashboardProgressBar';

describe('SuperadminBillingUsageMetersProgressBar', () => {
  it('renders a correctly bounded segment and accessible title', () => {
    render(<SuperadminBillingUsageMetersProgressBar value={25} limit={100} fillClassName="fill-primary" title="Database storage" />);
    const meter = screen.getByRole('img', { name: 'Database storage: 25%' });
    expect(meter).toHaveAttribute('width', '25%');
    expect(meter.querySelector('rect')).toHaveClass('fill-primary');
  });

  it('clamps overflow and treats invalid limits as empty usage', () => {
    const { rerender } = render(<SuperadminBillingUsageMetersProgressBar value={150} limit={100} fillClassName="fill-warning" />);
    expect(document.querySelector('svg')).toHaveAttribute('width', '100%');
    rerender(<SuperadminBillingUsageMetersProgressBar value={10} limit={0} fillClassName="fill-warning" />);
    expect(document.querySelector('svg')).toHaveAttribute('width', '0%');
    rerender(<SuperadminBillingUsageMetersProgressBar value={Number.NaN} limit={100} fillClassName="fill-warning" />);
    expect(document.querySelector('svg')).toHaveAttribute('width', '0%');
  });
});
