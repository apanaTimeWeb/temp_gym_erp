import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminFinanceRevenueReportDateRangePicker from '@/app/frontend_admin/admin_finance/finance_revenue_report/components/date_filter/AdminFinanceRevenueReportDateRangePicker';

vi.mock('next-intl', () => ({ useLocale: () => 'en-US', useTranslations: () => (key: string) => ({
  'reports.admin_reports_main.chooseDateRange':'Choose date range',
  'reports.admin_reports_main.selectEndDate':'Select an end date',
  'reports.admin_reports_main.calendarDialogLabel':'Choose a custom date range',
  'reports.admin_reports_main.previousMonth':'Previous month',
  'reports.admin_reports_main.nextMonth':'Next month',
  'reports.admin_reports_main.customRangeHelp':'Choose an inclusive date range.',
}[key] ?? key) }));

describe('AdminFinanceRevenueReport custom date range picker', () => {
  it('uses one calendar trigger and selects an inclusive start/end pair without native date inputs', () => {
    const onChange = vi.fn();
    render(<AdminFinanceRevenueReportDateRangePicker startDate="2026-10-01" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-finance-revenue-date-range-trigger'));
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(0);
    fireEvent.click(screen.getByTestId('admin-finance-revenue-calendar-day-2026-10-10'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-01', '2026-10-10');
  });
  it('navigates across months and selects an end date without resetting to the start month', async () => {
    const onChange = vi.fn();
    render(<AdminFinanceRevenueReportDateRangePicker startDate="2026-10-31" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-finance-revenue-date-range-trigger'));
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: /November 2026/ })).toBeTruthy());
    fireEvent.click(screen.getByTestId('admin-finance-revenue-calendar-day-2026-11-02'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-31', '2026-11-02');
  });
  it('offers 44px minimum calendar navigation/day targets', () => {
    render(<AdminFinanceRevenueReportDateRangePicker startDate="2026-10-31" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-finance-revenue-date-range-trigger'));
    expect(screen.getByRole('button', { name: 'Next month' }).className).toContain('min-h-11');
    expect(screen.getByTestId('admin-finance-revenue-calendar-day-2026-10-31').className).toContain('min-h-11');
  });

});
