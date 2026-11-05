import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SuperadminAnalyticsReportsProgressBar from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/components/reports_center_states_and_feedback/SuperadminAnalyticsReportsCenterProgressBar';

describe('SuperadminAnalyticsReportsProgressBar', () => {
  it('renders percentage geometry with its semantic status fill', () => {
    const { container } = render(<SuperadminAnalyticsReportsProgressBar value={67.4} fillClassName="fill-warning-bg" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '67.4%');
    expect(container.querySelector('rect')).toHaveClass('fill-warning-bg');
  });

  it('bounds extreme and non-finite scores', () => {
    const { rerender, container } = render(<SuperadminAnalyticsReportsProgressBar value={120} fillClassName="fill-success-bg" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '100%');
    rerender(<SuperadminAnalyticsReportsProgressBar value={Number.NEGATIVE_INFINITY} fillClassName="fill-success-bg" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '0%');
  });
});
