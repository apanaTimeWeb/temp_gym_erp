// RESPONSIBILITY: Regression-checks typed forbidden status classification without treating incidental message text as authorization evidence.
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HrError from '@/app/frontend_admin/admin_hr/hr_staff_management/error';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementMonitoring', () => ({ logErrorToMonitoring: vi.fn() }));

describe('HR route error status boundary', () => {
  it('does not mistake incidental 403 text for a forbidden HTTP response', () => {
    const error = new Error('Import reference 403 unavailable');
    const reset = vi.fn();
    render(<HrError error={error} reset={reset} />);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
  });
  it('recognizes explicit status 403 and makes its return link reachable', () => {
    const error = Object.assign(new Error('Access denied'), { status: 403 });
    render(<HrError error={error} reset={vi.fn()} />);
    expect(screen.getByRole('link').className).toContain('min-h-11');
  });
});
