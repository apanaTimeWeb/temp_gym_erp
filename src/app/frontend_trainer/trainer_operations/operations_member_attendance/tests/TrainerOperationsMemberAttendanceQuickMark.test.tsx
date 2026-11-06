import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import TrainerOperationsMemberAttendanceQuickMark from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceQuickMark';
import type { TrainerAttendanceMemberBasic, TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

describe('TrainerOperationsMemberAttendanceQuickMark', () => {
  const mockMembers: TrainerAttendanceMemberBasic[] = [
    { id: 'mem-101', name: 'Rahul Sharma', phone: '9876543210' },
    { id: 'mem-102', name: 'Priya Verma', phone: '9123456780' },
  ];

  const todayStr = new Date().toISOString().split('T')[0];

  const mockRecords: TrainerAttendanceRecord[] = [
    {
      id: 'att-1',
      type: 'MEMBER',
      memberId: 'mem-102',
      member: { id: 'mem-102', name: 'Priya Verma', phone: '9123456780' },
      date: todayStr,
      checkIn: '08:30',
      status: 'PRESENT',
    },
  ];

  const onQuickMark = vi.fn().mockResolvedValue(undefined);
  const onCheckOut = vi.fn().mockResolvedValue(undefined);
  const onOpenModalWithMember = vi.fn();
  const onOpenModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders quick mark section and filters members by search query', () => {
    render(
      <TrainerOperationsMemberAttendanceQuickMark
        members={mockMembers}
        records={mockRecords}
        onQuickMark={onQuickMark}
        onCheckOut={onCheckOut}
        onOpenModalWithMember={onOpenModalWithMember}
        onOpenModal={onOpenModal}
        isPending={false}
      />
    );

    expect(screen.getByTestId('trainer-attendance-quick-mark-section')).toBeInTheDocument();
    const input = screen.getByTestId('trainer-attendance-quick-mark-input');

    // Type "Rahul"
    fireEvent.change(input, { target: { value: 'Rahul' } });

    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
    expect(screen.getByTestId('quick-mark-btn-mem-101')).toBeInTheDocument();
  });

  it('triggers onQuickMark when clicking Mark Present for an unrecorded member', async () => {
    render(
      <TrainerOperationsMemberAttendanceQuickMark
        members={mockMembers}
        records={mockRecords}
        onQuickMark={onQuickMark}
        onCheckOut={onCheckOut}
        onOpenModalWithMember={onOpenModalWithMember}
        onOpenModal={onOpenModal}
        isPending={false}
      />
    );

    const input = screen.getByTestId('trainer-attendance-quick-mark-input');
    fireEvent.change(input, { target: { value: 'Rahul' } });

    const markBtn = screen.getByTestId('quick-mark-btn-mem-101');
    fireEvent.click(markBtn);

    await waitFor(() => {
      expect(onQuickMark).toHaveBeenCalledWith(mockMembers[0]);
    });
  });

  it('shows Checked In status and allows Check Out for an already checked-in member', async () => {
    render(
      <TrainerOperationsMemberAttendanceQuickMark
        members={mockMembers}
        records={mockRecords}
        onQuickMark={onQuickMark}
        onCheckOut={onCheckOut}
        onOpenModalWithMember={onOpenModalWithMember}
        onOpenModal={onOpenModal}
        isPending={false}
      />
    );

    const input = screen.getByTestId('trainer-attendance-quick-mark-input');
    fireEvent.change(input, { target: { value: 'Priya' } });

    expect(screen.getByText('Priya Verma')).toBeInTheDocument();
    expect(screen.getByText(/Checked In/i)).toBeInTheDocument();

    const checkOutBtn = screen.getByRole('button', { name: /Check Out/i });
    expect(checkOutBtn).toBeInTheDocument();

    fireEvent.click(checkOutBtn);
    await waitFor(() => {
      expect(onCheckOut).toHaveBeenCalledWith('att-1');
    });
  });

  it('triggers onOpenModalWithMember when clicking custom time icon', () => {
    render(
      <TrainerOperationsMemberAttendanceQuickMark
        members={mockMembers}
        records={mockRecords}
        onQuickMark={onQuickMark}
        onCheckOut={onCheckOut}
        onOpenModalWithMember={onOpenModalWithMember}
        onOpenModal={onOpenModal}
        isPending={false}
      />
    );

    const input = screen.getByTestId('trainer-attendance-quick-mark-input');
    fireEvent.change(input, { target: { value: 'Rahul' } });

    const customTimeBtn = screen.getByTitle('Custom time');
    fireEvent.click(customTimeBtn);

    expect(onOpenModalWithMember).toHaveBeenCalledWith('mem-101');
  });
});

