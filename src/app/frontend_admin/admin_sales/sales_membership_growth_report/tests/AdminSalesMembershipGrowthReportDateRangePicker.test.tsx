import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminSalesMembershipGrowthReportDateRangePicker from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/components/date_filter/AdminSalesMembershipGrowthReportDateRangePicker';

vi.mock('next-intl', () => ({ useLocale: () => 'en-US', useTranslations: () => (key: string) => ({
  'reports.admin_reports_main.chooseDateRange':'Choose date range',
  'reports.admin_reports_main.selectEndDate':'Select an end date',
  'reports.admin_reports_main.calendarDialogLabel':'Choose a custom date range',
  'reports.admin_reports_main.previousMonth':'Previous month',
  'reports.admin_reports_main.nextMonth':'Next month',
  'reports.admin_reports_main.customRangeHelp':'Choose an inclusive date range.',
}[key] ?? key) }));

describe('Sales Membership Growth custom date range picker', () => {
  it('uses one calendar trigger and selects an inclusive start/end pair without native date inputs', () => {
    const onChange = vi.fn();
    render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2026-10-01" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(0);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-10'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-01', '2026-10-10');
  });
});


describe('Membership Growth calendar navigation regression (RBG107)', () => {
  it('does not snap back to the original start month on repeated month navigation', () => {
    render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2026-10-01" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('grid', { name: 'November 2026' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('grid', { name: 'December 2026' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByRole('grid', { name: 'November 2026' })).toBeTruthy();
  });

  it('preserves keyboard focus and month after navigating across a month boundary', () => {
    render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2026-10-31" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    const oct31 = screen.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-31');
    expect(document.activeElement).toBe(oct31);
    fireEvent.keyDown(oct31, { key: 'ArrowRight' });
    expect(screen.getByRole('grid', { name: 'November 2026' })).toBeTruthy();
    const nov1 = screen.getByTestId('admin-sales-membership-growth-calendar-day-2026-11-01');
    expect(document.activeElement).toBe(nov1);
    fireEvent.keyDown(nov1, { key: 'ArrowLeft' });
    expect(screen.getByRole('grid', { name: 'October 2026' })).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-31'));
  });

  it('supports Home, End, PageUp/Down and year jumps with month-end clamping', () => {
    render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2028-03-31" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    fireEvent.keyDown(screen.getByTestId('admin-sales-membership-growth-calendar-day-2028-03-31'), { key: 'PageUp' });
    expect(screen.getByRole('grid', { name: 'February 2028' })).toBeTruthy();
    const leapDay = screen.getByTestId('admin-sales-membership-growth-calendar-day-2028-02-29');
    expect(document.activeElement).toBe(leapDay);
    fireEvent.keyDown(leapDay, { key: 'Home' });
    expect(document.activeElement).toBe(screen.getByTestId('admin-sales-membership-growth-calendar-day-2028-02-28'));
    fireEvent.keyDown(screen.getByTestId('admin-sales-membership-growth-calendar-day-2028-02-28'), { key: 'End' });
    expect(document.activeElement).toBe(screen.getByTestId('admin-sales-membership-growth-calendar-day-2028-03-05'));
    fireEvent.keyDown(screen.getByTestId('admin-sales-membership-growth-calendar-day-2028-03-05'), { key: 'PageDown', shiftKey: true });
    expect(screen.getByRole('grid', { name: 'March 2029' })).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByTestId('admin-sales-membership-growth-calendar-day-2029-03-05'));
  });

  it('completes two rapid clicks without waiting for searchParams to re-render', () => {
    const onChange = vi.fn();
    render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2026-10-01" endDate="2026-10-30" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-12'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-12', '');
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-calendar-day-2026-10-20'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-12', '2026-10-20');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('reopens at an externally updated valid start date and restores trigger focus on Escape', () => {
    const onChange = vi.fn();
    const view = render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2026-10-15" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    view.rerender(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2027-04-01" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    expect(screen.getByRole('grid', { name: 'April 2027' })).toBeTruthy();
  });

  it('does not let impossible dates act as the selected start', () => {
    const onChange = vi.fn();
    render(<AdminSalesMembershipGrowthReportDateRangePicker startDate="2026-02-30" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-sales-membership-growth-date-range-trigger'));
    const candidate = document.querySelector<HTMLButtonElement>('button[data-testid^="admin-sales-membership-growth-calendar-day-"]');
    expect(candidate).not.toBeNull();
    fireEvent.click(candidate!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toBe('');
    expect(onChange.mock.calls[0][0]).not.toBe('2026-02-30');
  });
});
