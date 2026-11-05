import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminHrKPIs from '@/app/frontend_admin/admin_hr/hr_staff_management/components/kpis/AdminHrStaffManagementKPIs';

const localeState = vi.hoisted(() => ({ locale: 'en-IN' }));
const model = vi.hoisted(() => ({ staff: [] as any[], totalStaff: 0, status: 'success', error: '', retryStaff: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => localeState.locale }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel', () => ({ useAdminHrViewModel: () => model }));

describe('Admin HR staff KPI state', () => {
  beforeEach(() => { localeState.locale = 'en-IN'; model.staff = []; model.totalStaff = 0; model.status = 'success'; model.error = ''; model.retryStaff.mockReset(); });
  it('renders current-page staff counts without Finance summary data', () => {
    model.totalStaff = 27;
    model.staff = [{ id: 'a', isActive: true }, { id: 'b', isActive: false }];
    render(<AdminHrKPIs />);
    expect(screen.getByTestId('admin_hr-staff-kpis')).toBeTruthy();
    expect(screen.getByText('hr.AdminAuditRepair.staffTotalCount')).toBeTruthy();
    expect(screen.getByText('hr.AdminAuditRepair.activeStaffOnPage')).toBeTruthy();
    expect(screen.getByText('hr.AdminAuditRepair.inactiveStaffOnPage')).toBeTruthy();
  });
  it('uses the active locale for large counts', () => {
    model.totalStaff = 123456;
    render(<AdminHrKPIs />);
    expect(screen.getByText(new Intl.NumberFormat('en-IN').format(123456))).toBeTruthy();
  });
  it('keeps internal network errors out of accessible user-facing UI', () => {
    model.status = 'error'; model.error = 'private trace: tenant 123';
    render(<AdminHrKPIs />);
    expect(screen.queryByText(/private trace/)).toBeNull();
    expect(screen.getByRole('button', { name: /retryStaffMetrics/ })).toBeTruthy();
  });
  it('renders a recoverable staff-query error', () => {
    model.status = 'error'; model.error = 'network failed';
    render(<AdminHrKPIs />);
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByRole('button', { name: /retryStaffMetrics/ })).toBeTruthy();
  });
});
