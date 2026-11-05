import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fetchTrainerSessions,
  fetchTrainerSessionsTrainerSessionMembers,
  createTrainerSessionsTrainerSession,
  updateTrainerSessionsTrainerSession,
  cancelTrainerSessionsTrainerSession,
  markTrainerSessionsTrainerSessionAttendance,
  markTrainerSessionsTrainerSessionNoShow,
} from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/api/TrainerCoachingSessionsApi';
import { TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS, TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/mocks/fixtures/TrainerCoachingSessionsMockData';
import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

beforeEach(() => apiFetch.mockReset());

describe('Trainer sessions API behavior', () => {
  it('forwards the selected session date and filter', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'OK', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS });
    const result = await fetchTrainerSessions('2026-09-14', 'PT');
    expect(apiFetch.mock.calls[0][0]).toContain('date=2026-09-14');
    expect(apiFetch.mock.calls[0][0]).toContain('filter=PT');
    expect(result[0]?.title).toBe('Morning HIIT');
  });

  it('validates and returns the member lookup result', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Members loaded', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS });
    expect(await fetchTrainerSessionsTrainerSessionMembers()).toEqual(TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS);
    expect(apiFetch.mock.calls[0][0]).toBe(TRAINER_SESSIONS_URLS.API.MEMBERS);
  });

  it('covers create and update mutation methods with idempotency keys', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Session scheduled', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS[0] });
    const created = await createTrainerSessionsTrainerSession({ date: '2026-09-14', time: '07:00 AM', duration: '60 min', type: 'Group' }, 'sessions-create-test-key');
    expect(created.message).toBe('Session scheduled');
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'POST', headers: { 'Idempotency-Key': 'sessions-create-test-key' } });

    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Session updated', data: TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS[0] });
    const updated = await updateTrainerSessionsTrainerSession('s1', { time: '08:00 AM' }, 'sessions-update-test-key');
    expect(updated.message).toBe('Session updated');
    expect(apiFetch.mock.calls[1][0]).toBe(TRAINER_SESSIONS_URLS.API.UPDATE('s1'));
    expect(apiFetch.mock.calls[1][1]).toMatchObject({ method: 'PATCH', headers: { 'Idempotency-Key': 'sessions-update-test-key' } });
  });

  it('keeps cancel, attendance, and no-show operations separate', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Session cancelled', data: null });
    expect((await cancelTrainerSessionsTrainerSession('s1', 'sessions-cancel-test-key')).message).toBe('Session cancelled');
    expect(apiFetch.mock.calls[0][0]).toBe(TRAINER_SESSIONS_URLS.API.CANCEL('s1'));
    expect(apiFetch.mock.calls[0][1]).toMatchObject({ method: 'DELETE', headers: { 'Idempotency-Key': 'sessions-cancel-test-key' } });

    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Attendance marked', data: null });
    await markTrainerSessionsTrainerSessionAttendance('s1', ['member-1'], 'sessions-attendance-test-key');
    expect(apiFetch.mock.calls[1][0]).toBe(TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE('s1'));
    expect(apiFetch.mock.calls[1][1]).toMatchObject({ method: 'POST', body: JSON.stringify({ memberIds: ['member-1'] }), headers: { 'Idempotency-Key': 'sessions-attendance-test-key' } });

    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Marked no show', data: null });
    expect((await markTrainerSessionsTrainerSessionNoShow('s1', 'sessions-no-show-test-key')).message).toBe('Marked no show');
    expect(apiFetch.mock.calls[2][0]).toBe(TRAINER_SESSIONS_URLS.API.MARK_NO_SHOW('s1'));
    expect(apiFetch.mock.calls[2][1]).toMatchObject({ method: 'POST', headers: { 'Idempotency-Key': 'sessions-no-show-test-key' } });
  });

  it('preserves canonical failure envelopes for session and member reads', async () => {
    const failure = { success: false, requestId: 'sessions-read-failure', message: 'Sessions unavailable', data: null, errorCode: 'SESSIONS_UNAVAILABLE', statusCode: 503 };
    apiFetch.mockResolvedValueOnce(failure);
    await expect(fetchTrainerSessions('2026-09-14')).rejects.toMatchObject({ message: 'Sessions unavailable', errorCode: 'SESSIONS_UNAVAILABLE', statusCode: 503 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'sessions-members-failure' });
    await expect(fetchTrainerSessionsTrainerSessionMembers()).rejects.toMatchObject({ message: 'Sessions unavailable', errorCode: 'SESSIONS_UNAVAILABLE', statusCode: 503 });
  });

  it('rejects valid failure envelopes for cancel, attendance and no-show mutations', async () => {
    const failure = { success: false, requestId: 'sessions-mutation-failure', message: 'Session action rejected', data: null, errorCode: 'SESSION_ACTION_REJECTED', statusCode: 409 };
    apiFetch.mockResolvedValueOnce(failure);
    await expect(cancelTrainerSessionsTrainerSession('s1', 'cancel-key')).rejects.toMatchObject({ message: 'Session action rejected', errorCode: 'SESSION_ACTION_REJECTED', statusCode: 409 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'sessions-attendance-failure' });
    await expect(markTrainerSessionsTrainerSessionAttendance('s1', ['m1'], 'attendance-key')).rejects.toMatchObject({ message: 'Session action rejected', errorCode: 'SESSION_ACTION_REJECTED', statusCode: 409 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'sessions-noshow-failure' });
    await expect(markTrainerSessionsTrainerSessionNoShow('s1', 'no-show-key')).rejects.toMatchObject({ message: 'Session action rejected', errorCode: 'SESSION_ACTION_REJECTED', statusCode: 409 });
  });

  it('rejects malformed API response data and propagates transport errors', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'sessions-test-request', message: 'Bad members', data: [{ id: 7, name: 'Invalid' }] });
    await expect(fetchTrainerSessionsTrainerSessionMembers()).rejects.toThrow();
    apiFetch.mockRejectedValueOnce(new Error('network unavailable'));
    await expect(fetchTrainerSessions('2026-09-14')).rejects.toThrow('network unavailable');
  });
});
