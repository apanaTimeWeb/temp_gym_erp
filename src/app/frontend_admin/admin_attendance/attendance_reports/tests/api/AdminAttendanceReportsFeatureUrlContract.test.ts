import { describe, expect, it } from 'vitest';
import { ADMIN_DASHBOARD_URL, ADMIN_ATTENDANCE_REPORTS_ROUTES, ADMIN_ATTENDANCE_REPORTS_API } from '@/app/frontend_admin/admin_attendance/attendance_reports/config/attendance_reports.url_config';

describe('attendance_reports route and API ownership contract', () => {
  it('keeps the dashboard fallback within its own canonical URL contract', () => {
    expect(ADMIN_DASHBOARD_URL).toBe('/frontend_admin/admin_dashboard/dashboard_overview');
  });
  it('declares the canonical route under its owning business domain', () => {
    expect(ADMIN_ATTENDANCE_REPORTS_ROUTES.root).toBe('/frontend_admin/admin_attendance/attendance_reports');
  });
  it('exposes only its own report read endpoint and shared blocked export route', () => {
    expect(ADMIN_ATTENDANCE_REPORTS_API.attendance).toBe('/admin/reports/attendance');
    expect(ADMIN_ATTENDANCE_REPORTS_API.export).toBe('/admin/reports/export');
    expect(Object.keys(ADMIN_ATTENDANCE_REPORTS_API).filter((key) => ['revenue','attendance','members','payroll','pnl'].includes(key))).toEqual(['attendance']);
  });
});
