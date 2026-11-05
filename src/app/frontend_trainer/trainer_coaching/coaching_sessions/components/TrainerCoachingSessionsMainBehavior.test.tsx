import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import TrainerSessionsMain from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsMain';

import { TRAINER_SESSIONS_SESSION_TYPE, TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';







const confirm = vi.fn().mockResolvedValue(true);
const showSuccess = vi.fn();
const showError = vi.fn();
const cancelMutate = vi.fn().mockResolvedValue({ message: 'Session cancelled' });

vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsFilters', () => ({ useTrainerSessionsFilters: () => ({ filter: 'All', setFilter: vi.fn(), date: '2026-09-17', setDate: vi.fn() }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsQuery', () => ({
  useTrainerSessionsQuery: () => ({ data: [{ id: 's1', title: 'Morning HIIT', type: TRAINER_SESSIONS_SESSION_TYPE.GROUP, status: TRAINER_SESSIONS_SESSION_STATUS.UPCOMING, time: '07:00 AM', duration: '60 min', attendees: 4, maxAttendees: 10 }], isPending: false, isError: false, isFetching: false }),
  useTrainerSessionsSessionMembersQuery: () => ({ data: [] }),
}));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsActions', () => ({ useTrainerSessionsActions: () => ({ handleScheduleSubmit: vi.fn(), handleCancelSession: async () => { await confirm(); await cancelMutate({ id: 's1', idempotencyKey: 'session-cancel-s1' }); showSuccess('Session cancelled', 'session-cancel-s1'); }, handleNoShowSession: vi.fn(), handleAttendanceSubmit: vi.fn(), handleEditSuccess: vi.fn(), createSessionPending: false, markNoShowSessionPending: false, cancelSessionPending: false, markAttendancePending: false, updateSessionPending: false }) }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsAttendanceModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEditModal', () => ({ default: () => null }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsKPIs', () => ({ default: () => <div /> }));
vi.mock('@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsScheduleModal', () => ({ default: () => null }));

describe('TrainerSessionsMain behavior', () => {
  it('requires confirmation before cancelling a session and emits the backend message', async () => {
    const user = userEvent.setup();
    render(<TrainerSessionsMain />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(cancelMutate).toHaveBeenCalledWith({ id: 's1', idempotencyKey: expect.stringContaining('session-cancel-s1') });
    await vi.waitFor(() => expect(showSuccess).toHaveBeenCalledWith('Session cancelled', 'session-cancel-s1')); 
  });
});
