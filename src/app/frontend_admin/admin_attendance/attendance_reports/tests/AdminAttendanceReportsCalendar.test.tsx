import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminAttendanceReportsDateRangePicker from '@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker';

vi.mock('next-intl', () => ({ useLocale: () => 'en-US', useTranslations: () => (key: string) => key }));

describe('RBG138 attendance calendar civil-year and boundary invariants', () => {
  it('preserves years 0001–0099 instead of mapping them to 19xx', () => {
    const onChange = vi.fn();
    render(<AdminAttendanceReportsDateRangePicker startDate="0042-01-01" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-attendance-reports-date-range-trigger'));
    const day = screen.getByTestId('admin-attendance-reports-calendar-day-0042-01-10');
    fireEvent.click(day);
    expect(onChange).toHaveBeenCalledWith('0042-01-01', '0042-01-10');
    expect(screen.queryByTestId('admin-attendance-reports-calendar-day-1942-01-10')).toBeNull();
  });
  it('does not navigate outside supported civil-year bounds', () => {
    const { rerender } = render(<AdminAttendanceReportsDateRangePicker startDate="0001-01-01" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-attendance-reports-date-range-trigger'));
    expect(screen.getByRole('button',{ name: 'reports.admin_reports_main.previousMonth' }).hasAttribute('disabled')).toBe(true);
    fireEvent.click(screen.getByTestId('admin-attendance-reports-date-range-trigger'));
    rerender(<AdminAttendanceReportsDateRangePicker startDate="9999-12-31" endDate="" onChange={vi.fn()} />);
    fireEvent.click(screen.getByTestId('admin-attendance-reports-date-range-trigger'));
    expect(screen.getByRole('button',{ name: 'reports.admin_reports_main.nextMonth' }).hasAttribute('disabled')).toBe(true);
  });
  it('keeps date selection coherent while parent URL props are pending', () => {
    const onChange = vi.fn();
    render(<AdminAttendanceReportsDateRangePicker startDate="2026-10-10" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-attendance-reports-date-range-trigger'));
    fireEvent.click(screen.getByTestId('admin-attendance-reports-calendar-day-2026-10-03'));
    fireEvent.click(screen.getByTestId('admin-attendance-reports-calendar-day-2026-10-17'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-03', '2026-10-17');
  });
});
