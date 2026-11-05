import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ManagerStaffAttendanceEmptyState from '@/app/frontend_manager/manager_staff_hr/staff_attendance/components/ManagerStaffAttendanceEmptyState';

describe('ManagerStaffAttendanceEmptyState', () => {
  it('announces the feature-owned empty-state message accessibly', () => {
    render(<ManagerStaffAttendanceEmptyState message="Nothing to show" />);
    expect(screen.getByTestId('manager_hr-managerhrattendancehistory-empty-state').textContent).toContain('Nothing to show');
  });
});
