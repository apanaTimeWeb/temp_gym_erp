import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminAttendanceReportsDateRangePicker from '@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker';

vi.mock('next-intl', () => ({ useLocale: () => 'en-US', useTranslations: () => (key: string) => ({
  'reports.admin_reports_main.chooseDateRange':'Choose date range',
  'reports.admin_reports_main.selectEndDate':'Select an end date',
  'reports.admin_reports_main.calendarDialogLabel':'Choose a custom date range',
  'reports.admin_reports_main.previousMonth':'Previous month',
  'reports.admin_reports_main.nextMonth':'Next month',
  'reports.admin_reports_main.customRangeHelp':'Choose an inclusive date range.',
}[key] ?? key) }));

describe('AdminAttendanceReports custom date range picker', () => {
  it('uses one calendar trigger and selects an inclusive start/end pair without native date inputs', () => {
    const onChange = vi.fn();
    render(<AdminAttendanceReportsDateRangePicker startDate="2026-10-01" endDate="" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('admin-attendance-reports-date-range-trigger'));
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(0);
    const buttons = screen.getAllByRole('button', { name: /previous month|next month/i });
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => expect(button.className).toContain('min-h-11'));
    buttons.forEach((button) => expect(button.className).toContain('min-w-11'));
    expect(screen.getByTestId('admin-attendance-reports-calendar-day-2026-10-10').className).toContain('min-w-11');
    expect(screen.getByTestId('admin-attendance-reports-calendar-day-2026-10-10').className).toContain('min-h-11');
    fireEvent.click(screen.getByTestId('admin-attendance-reports-calendar-day-2026-10-10'));
    expect(onChange).toHaveBeenLastCalledWith('2026-10-01', '2026-10-10');
  });
});
