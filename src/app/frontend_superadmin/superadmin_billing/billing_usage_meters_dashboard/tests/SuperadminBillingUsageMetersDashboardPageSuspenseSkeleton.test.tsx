import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SuperadminBillingUsageMetersDashboardPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/components/SuperadminBillingUsageMetersDashboardPageSuspenseSkeleton';


vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('billing_usage_meters_dashboard suspense isolation', () => {
  it('exposes a stable localized busy status without an external feature import', () => {
    render(<SuperadminBillingUsageMetersDashboardPageSuspenseSkeleton />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-busy')).toBe('true');
    expect(status.getAttribute('aria-label')).toBe('ui.route_loading');
  });
});
