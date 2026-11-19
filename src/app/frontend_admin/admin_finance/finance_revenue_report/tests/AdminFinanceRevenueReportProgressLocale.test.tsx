// RESPONSIBILITY: Verify that localized human-readable percentages are not parsed back into chart geometry.
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminFinanceRevenueReportRevenue from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/revenue/AdminFinanceRevenueReportRevenue';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'de-DE' }));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/hooks/useAdminFinanceRevenueReportLogic', () => ({
  useAdminFinanceRevenueReportLogic: () => ({ status: 'success', retryReport: vi.fn(), reportData: {
    revenueByGym: [], revenueByMethod: [{ method: 'Cash', amount: 1 }, { method: 'UPI', amount: 2 }],
    revenueByPlan: [{ planName: 'Basic', amount: 1, count: 1 }, { planName: 'Pro', amount: 2, count: 2 }],
    monthlyRevenue: [], kpis: { totalRevenue: 3, totalExpenses: 0, netProfit: 3, totalMembers: 3, newMembers: 0, avgAttendanceRate: 0, totalPayroll: 0 },
  } }),
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_revenue_report/components/progress_bar/AdminFinanceRevenueReportProgressBar', () => ({
  default: ({ value, label }: { value: number; label: string }) => <output data-testid="revenue-percent-bar" data-label={label}>{String(value)}</output>,
}));

describe('Finance Revenue report locale-safe progress', () => {
  it('keeps progress numeric even when the visible German percentage uses comma decimals', () => {
    render(<AdminFinanceRevenueReportRevenue />);
    const bars = screen.getAllByTestId('revenue-percent-bar');
    expect(bars).toHaveLength(4);
    expect(bars.map((element) => Number(element.textContent)).every(Number.isFinite)).toBe(true);
    expect(Number(bars[0].textContent)).toBeCloseTo(100 / 3, 4);
    expect(screen.getByText(/33,3%/)).toBeInTheDocument();
  });
});
