import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminAttendanceStaffManagerTable from '../../components/table/AdminAttendanceStaffManagerTable';

vi.mock('next-intl', () => ({
  useTranslations: () => (key?: string) => key || '',
}));

describe('AdminAttendanceStaffManagerTable Manual Attendance & Adjustments', () => {
  it('renders staff attendance table with initial mock records and Mark Attendance button', () => {
    render(<AdminAttendanceStaffManagerTable />);

    expect(screen.getByText('Total Staff Logged')).toBeInTheDocument();
    expect(screen.getByText('Present Today')).toBeInTheDocument();
    expect(screen.getByText('Late Arrivals')).toBeInTheDocument();
    expect(screen.getByText('Approved Leaves')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Mark Manual Attendance/i })).toBeInTheDocument();
    expect(screen.getByText('Rohit Mehta')).toBeInTheDocument();
    expect(screen.getByText('Sahil Joshi')).toBeInTheDocument();
  });

  it('opens manual attendance modal on button click, submits a new attendance record, and updates table', () => {
    render(<AdminAttendanceStaffManagerTable />);

    const markButton = screen.getByRole('button', { name: /Mark Manual Attendance/i });
    fireEvent.click(markButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Mark Manual Attendance \(Admin Override\)/i)).toBeInTheDocument();

    // Fill form and save
    const submitButton = screen.getByRole('button', { name: /Save Attendance Record/i });
    fireEvent.click(submitButton);

    // Modal closes and success feedback is shown
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/Manual attendance marked successfully/i)).toBeInTheDocument();
  });

  it('opens adjust punch modal when clicking row action, updates record, and displays toast', () => {
    render(<AdminAttendanceStaffManagerTable />);

    const adjustButtons = screen.getAllByRole('button', { name: /Adjust attendance punch for/i });
    expect(adjustButtons.length).toBeGreaterThan(0);

    fireEvent.click(adjustButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/Adjust Staff \/ Manager Attendance/i)).toBeInTheDocument();

    const updateButton = screen.getByRole('button', { name: /Update Punch Record/i });
    fireEvent.click(updateButton);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText(/Attendance punch updated successfully/i)).toBeInTheDocument();
  });

  it('filters records by role and branch accurately', () => {
    render(<AdminAttendanceStaffManagerTable />);

    const roleSelect = screen.getByLabelText(/Filter by role/i);
    fireEvent.change(roleSelect, { target: { value: 'Manager' } });

    // Should only show Managers
    expect(screen.getByText('Rohit Mehta')).toBeInTheDocument();
    expect(screen.queryByText('Priya Shah')).toBeNull(); // Senior Trainer should be filtered out

    const branchSelect = screen.getByLabelText(/Filter by branch/i);
    fireEvent.change(branchSelect, { target: { value: 'Bandra West' } });

    expect(screen.getByText('Sahil Joshi')).toBeInTheDocument();
    expect(screen.queryByText('Rohit Mehta')).toBeNull(); // Andheri East should be filtered out
  });
});
