import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import TrainerSessionsScheduleModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsScheduleModal';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureUnsavedChangesGuard', () => ({
  useTrainerInfrastructureUnsavedChangesGuard: () => async (navigate: () => void) => { navigate(); return true; },
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureDialogFocusTrap', () => ({
  useTrainerInfrastructureDialogFocusTrap: () => undefined,
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsTrainerInfrastructureSearchableDropdown', () => ({
  default: ({ options, value, onChange, disabled, ariaLabel, testId }: {
    options: Array<{ value: string | number; label: string }>;
    value: string | number;
    onChange: (value: string | number) => void;
    disabled?: boolean;
    ariaLabel: string;
    testId?: string;
  }) => (
    <select aria-label={ariaLabel} data-testid={testId} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  ),
}));

describe('TrainerSessionsScheduleModal behavior', () => {
  it('disables PT submission when member lookup fails and lets the user retry', async () => {
    const user = userEvent.setup();
    const onRetryMemberOptions = vi.fn();
    render(<TrainerSessionsScheduleModal
      onClose={vi.fn()}
      onSubmit={vi.fn().mockResolvedValue(true)}
      memberOptions={[]}
      memberOptionsIsPending={false}
      memberOptionsIsError
      memberOptionsIsFetching={false}
      onRetryMemberOptions={onRetryMemberOptions}
      isSubmitting={false}
    />);

    expect(screen.getByRole('alert')).toHaveTextContent('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY');
    expect(screen.getByRole('button', { name: 'TEXT_CONFIRM_ASSIGNMENT' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'TEXT_RETRY' }));
    expect(onRetryMemberOptions).toHaveBeenCalledTimes(1);
  });

  it('disables member selection while lookup is pending', () => {
    render(<TrainerSessionsScheduleModal
      onClose={vi.fn()}
      onSubmit={vi.fn().mockResolvedValue(true)}
      memberOptions={[]}
      memberOptionsIsPending
      memberOptionsIsError={false}
      memberOptionsIsFetching
      onRetryMemberOptions={vi.fn()}
      isSubmitting={false}
    />);

    expect(screen.getByRole('combobox', { name: 'TEXT_SELECT_MEMBER_OPTIONAL_FOR_GROUP' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('TEXT_MEMBERS_LOADING');
  });
});
