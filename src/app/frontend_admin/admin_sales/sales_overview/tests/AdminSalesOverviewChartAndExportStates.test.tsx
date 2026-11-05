// RESPONSIBILITY: Regression checks for Overview invalid and empty-report states and guarded CSV export.
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminSalesAnalyticsOverview from '@/app/frontend_admin/admin_sales/sales_overview/components/overview/AdminSalesOverviewOverview';
import AdminSalesAnalyticsToolbar from '@/app/frontend_admin/admin_sales/sales_overview/components/toolbar/AdminSalesOverviewToolbar';
const mocks = vi.hoisted(() => ({
  state: {} as Record<string, unknown>,
  csv: vi.fn(), download: vi.fn(),
}));
vi.mock('next-intl', () => ({ useLocale: () => 'en', useTranslations: () => (key: string) => key }));
vi.mock('next/dynamic', () => ({ default: () => () => <div data-testid="apex-chart" /> }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewLogic', () => ({ useAdminSalesLogic: () => mocks.state }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/components/date_filter/AdminSalesOverviewDateFilterDropdown', () => ({ AdminSalesAnalyticsDateFilterDropdown: () => <div /> }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewCreateExportCsv', () => ({ AdminSalesOverviewCreateExportCsv: (...args: unknown[]) => mocks.csv(...args) }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewDownloadCsv', () => ({ downloadAdminSalesOverviewCsv: (...args: unknown[]) => mocks.download(...args) }));
const base = () => ({
  isCustomRangeBlocked: false, overviewData: [{ date: '2026-10-01', revenue: 12, newMembers: 1 }],
  referralData: [{ source: 'referral', revenue: 12 }], overviewStatus: 'success', referralStatus: 'success',
  overviewError: '', referralError: '', retryOverview: vi.fn(), retryReferrals: vi.fn(),
  startDate: '', endDate: '', search: '', setSearch: vi.fn(),
});
beforeEach(() => { mocks.state=base(); mocks.csv.mockReset(); mocks.download.mockReset(); });
describe('Sales overview chart and CSV guards', () => {
  it('shows validation guidance rather than charts or a permanent loading skeleton for blocked dates', () => {
    mocks.state={...base(),isCustomRangeBlocked:true,overviewStatus:'pending',referralStatus:'pending'};
    render(<AdminSalesAnalyticsOverview />);
    expect(screen.getByTestId('admin_sales-overview-invalid-range')).toHaveAttribute('role','status');
    expect(screen.queryByTestId('apex-chart')).not.toBeInTheDocument();
  });
  it('shows a real no-data message instead of empty charts after a successful empty result', () => {
    mocks.state={...base(),overviewData:[],referralData:[]};
    render(<AdminSalesAnalyticsOverview />);
    expect(screen.getByTestId('admin_sales-overview-empty')).toHaveAttribute('role','status');
    expect(screen.queryByTestId('apex-chart')).not.toBeInTheDocument();
  });
  it.each(['pending','error','success'] as const)('prevents export for %s when no verified usable rows exist', (status) => {
    mocks.state={...base(),overviewStatus:status, overviewData:[]};
    render(<AdminSalesAnalyticsToolbar />);
    const button=screen.getByTestId('admin_sales-admin_sales-toolbar-click');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mocks.csv).not.toHaveBeenCalled();
    expect(mocks.download).not.toHaveBeenCalled();
  });
  it('exports verified nonempty overview data', () => {
    mocks.csv.mockReturnValue('csv');
    render(<AdminSalesAnalyticsToolbar />);
    const button=screen.getByTestId('admin_sales-admin_sales-toolbar-click');
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(mocks.download).toHaveBeenCalledWith('csv');
  });
});
