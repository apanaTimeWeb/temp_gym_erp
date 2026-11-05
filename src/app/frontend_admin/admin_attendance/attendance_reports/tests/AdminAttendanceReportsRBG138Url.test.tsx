import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminAttendanceReportsDateFilterDropdown } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown';

const ctx = vi.hoisted(() => ({ query: 'range=custom&startDate=2026-01-01&source=dashboard', replace: vi.fn() }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(ctx.query), usePathname: () => '/frontend_admin/admin_attendance/attendance_reports', useRouter: () => ({ replace: ctx.replace }) }));
vi.mock('next-intl', () => ({ useLocale: () => 'en-US', useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/components/searchable_dropdown/AdminAttendanceReportsSearchableDropdown', () => ({
  AdminAttendanceReportsSearchableDropdown: ({ onChange }: { onChange: (s:string)=>void }) => <button type="button" onClick={() => onChange('last_month')}>Preset</button>
}));
vi.mock('@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateRangePicker', () => ({
  default: ({onChange}: {onChange:(a:string,b:string)=>void}) => <><button type="button" onClick={() => onChange('2026-02-01','')}>Start</button><button type="button" onClick={() => onChange('2026-02-01','2026-02-10')}>End</button></>
}));

describe('RBG138 URL pending edits', () => {
  beforeEach(() => { ctx.query='range=custom&startDate=2026-01-01&source=dashboard';ctx.replace.mockReset(); });
  it('merges consecutive date edits without dropping unrelated query values', () => {
    render(<AdminAttendanceReportsDateFilterDropdown/>);
    fireEvent.click(screen.getByRole('button',{name:'Start'}));
    fireEvent.click(screen.getByRole('button',{name:'End'}));
    const last=String(ctx.replace.mock.calls.at(-1)?.[0]);
    expect(last).toContain('startDate=2026-02-01');
    expect(last).toContain('endDate=2026-02-10');
    expect(last).toContain('source=dashboard');
  });
  it('avoids redundant same-payload navigation', () => {
    render(<AdminAttendanceReportsDateFilterDropdown/>);
    fireEvent.click(screen.getByRole('button',{name:'End'}));
    const count=ctx.replace.mock.calls.length;
    fireEvent.click(screen.getByRole('button',{name:'End'}));
    expect(ctx.replace.mock.calls.length).toBe(count);
  });
});
