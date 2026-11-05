import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SuperadminBillingUsageMetersMain from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/components/usage_meters_dashboard_main/SuperadminBillingUsageMetersDashboardMain';
import { useSuperadminBillingUsageMetersDashboardPage } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/hooks/useSuperadminBillingUsageMetersDashboardPage';
vi.mock('next-intl', () => ({ useLocale: () => 'en-IN', useTranslations: () => (key: string) => key }));
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: () => 'this_month', setParam: vi.fn() }) }));
vi.mock('@/components/ui/SearchableDropdown', () => ({ SearchableDropdown: () => <button type="button" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">date range</button> }));
vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/hooks/useSuperadminBillingUsageMetersDashboardPage');
const mockQuery = vi.mocked(useSuperadminBillingUsageMetersDashboardPage);
describe('SuperadminBillingUsageMetersMain', () => {
  beforeEach(() => vi.clearAllMocks());
  it('shows a retryable error instead of an empty grid after request failure', () => {
    const refetch = vi.fn(); mockQuery.mockReturnValue({ isPending: false, isError: true, data: undefined, refetch } as never);
    render(<SuperadminBillingUsageMetersMain />); fireEvent.click(screen.getByRole('button', { name: 'ui.try_again_d876a9fe' })); expect(refetch).toHaveBeenCalledTimes(1);
  });
  it('renders a localized empty state for a successful empty response', () => {
    mockQuery.mockReturnValue({ isPending: false, isError: false, data: { success: true, message: 'ok', data: [] }, refetch: vi.fn() } as never);
    render(<SuperadminBillingUsageMetersMain />); expect(screen.getByRole('status')).toHaveTextContent('ui.no_usage_meters_found');
  });
});
