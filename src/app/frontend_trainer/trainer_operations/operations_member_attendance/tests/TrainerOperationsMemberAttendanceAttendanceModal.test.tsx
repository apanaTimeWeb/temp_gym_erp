import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import TrainerAttendanceModal from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceAttendanceModal';
import type { TrainerAttendanceModalProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceModalProps';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureUnsavedChangesGuard', () => ({
  useTrainerInfrastructureUnsavedChangesGuard: () => async (callback: () => void) => callback(),
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureDialogFocusTrap', () => ({
  useTrainerInfrastructureDialogFocusTrap: () => undefined,
}));
vi.mock('@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSearchableDropdown', () => ({
  default: ({ options, value, onChange, ariaLabel, ariaInvalid, ariaDescribedBy, id, testId }: {
    options: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
    ariaLabel: string;
    ariaInvalid?: boolean;
    ariaDescribedBy?: string;
    id?: string;
    testId?: string;
  }) => (
    <select id={id} aria-label={ariaLabel} aria-invalid={ariaInvalid} aria-describedby={ariaDescribedBy} data-testid={testId} value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Choose member</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  ),
}));

const baseProps: TrainerAttendanceModalProps = {
  isOpen: true,
  onClose: vi.fn(),
  members: [{ id: 'm-1', name: 'Member One' }],
  membersLoading: false,
  membersError: false,
  onRetryMembers: vi.fn(),
  saving: false,
  onSubmit: vi.fn().mockResolvedValue(undefined),
};

beforeEach(() => vi.clearAllMocks());

describe('TrainerAttendanceModal', () => {
  it('does not render when closed', () => {
    render(<TrainerAttendanceModal {...baseProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('distinguishes member lookup loading, empty, and failed states and exposes retry', () => {
    const { rerender } = render(<TrainerAttendanceModal {...baseProps} membersLoading />);
    expect(screen.getByRole('status')).toHaveTextContent('TEXT_LOADING_MEMBERS');

    rerender(<TrainerAttendanceModal {...baseProps} membersLoading={false} members={[]} />);
    expect(screen.getByTestId('trainer_attendance-members-empty')).toHaveTextContent('TEXT_NO_MEMBERS_AVAILABLE');

    rerender(<TrainerAttendanceModal {...baseProps} membersLoading={false} membersError />);
    expect(screen.getByRole('alert')).toHaveTextContent('TEXT_UNABLE_TO_LOAD_MEMBERS');
    fireEvent.click(screen.getByTestId('trainer_attendance-members-retry'));
    expect(baseProps.onRetryMembers).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('trainer_attendance-attendance-modal_submit')).toBeDisabled();
  });

  it('associates the check-in validation message with its input and does not submit invalid data', async () => {
    render(<TrainerAttendanceModal {...baseProps} />);
    fireEvent.change(screen.getByLabelText('TEXT_SEARCH_MEMBER'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('TEXT_CHECK_IN_TIME'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('trainer_attendance-attendance-modal_submit'));

    await waitFor(() => expect(screen.getByLabelText('TEXT_CHECK_IN_TIME')).toHaveAttribute('aria-invalid', 'true'));
    const input = screen.getByLabelText('TEXT_CHECK_IN_TIME');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('ERR_TIME_REQUIRED');
    expect(baseProps.onSubmit).not.toHaveBeenCalled();
  });

  it('submits a valid member attendance record and keeps the member-only form contract', async () => {
    render(<TrainerAttendanceModal {...baseProps} />);
    fireEvent.change(screen.getByLabelText('TEXT_SEARCH_MEMBER'), { target: { value: 'm-1' } });
    fireEvent.click(screen.getByTestId('trainer_attendance-attendance-modal_submit'));

    await waitFor(() => expect(baseProps.onSubmit).toHaveBeenCalledWith(expect.objectContaining({ type: 'MEMBER', memberId: 'm-1' })));
  });
});
