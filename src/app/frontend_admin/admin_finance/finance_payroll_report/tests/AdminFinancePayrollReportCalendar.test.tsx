import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Picker from '../components/date_filter/AdminFinancePayrollReportDateRangePicker';

vi.mock('next-intl', () => ({
  useLocale: () => 'en-US',
  useTranslations: () => (key: string) => ({
    'reports.admin_reports_main.chooseDateRange': 'Choose date range',
    'reports.admin_reports_main.calendarDialogLabel': 'Custom calendar',
    'reports.admin_reports_main.previousMonth': 'Previous month',
    'reports.admin_reports_main.nextMonth': 'Next month',
    'reports.admin_reports_main.selectEndDate': 'Select end',
  }[key] ?? key),
}));

describe('RBG122 Payroll Report calendar', () => {
  it('retains a first date click while parent URL props are still unchanged', () => {
    const onChange = vi.fn();
    render(<Picker startDate="2026-10-01" endDate="2026-10-30" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-finance-payroll-date-range-trigger'));
    fireEvent.click(screen.getByTestId('admin-finance-payroll-calendar-day-2026-10-12'));
    fireEvent.click(screen.getByTestId('admin-finance-payroll-calendar-day-2026-10-20'));
    expect(onChange).toHaveBeenNthCalledWith(1, '2026-10-12', '');
    expect(onChange).toHaveBeenNthCalledWith(2, '2026-10-12', '2026-10-20');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('supports month-end PageUp, Home/End, and year jumps with correct focus', async () => {
    render(<Picker startDate="2028-03-31" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-finance-payroll-date-range-trigger'));
    fireEvent.keyDown(screen.getByTestId('admin-finance-payroll-calendar-day-2028-03-31'), { key: 'PageUp' });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId('admin-finance-payroll-calendar-day-2028-02-29')));
    fireEvent.keyDown(document.activeElement!, { key: 'Home' });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId('admin-finance-payroll-calendar-day-2028-02-28')));
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId('admin-finance-payroll-calendar-day-2028-03-05')));
    fireEvent.keyDown(document.activeElement!, { key: 'PageDown', shiftKey: true });
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId('admin-finance-payroll-calendar-day-2029-03-05')));
  });

  it('keeps previous/next buttons keyboard-operable and parses historical years', () => {
    const view = render(<Picker startDate="0042-02-28" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-finance-payroll-date-range-trigger'));
    expect(screen.getByRole('grid').getAttribute('aria-label')).toMatch(/42/);
    expect(screen.getByTestId('admin-finance-payroll-calendar-day-0042-02-28')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('grid').getAttribute('aria-label')).toMatch(/March/);
    view.unmount();
  });
});
