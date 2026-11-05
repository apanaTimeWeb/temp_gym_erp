import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { env } from '@/config/env';
import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';
import { TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/mocks/fixtures/TrainerCoachingSessionsMockData';
import { TrainerSessionsMockHandlers, resetTrainerSessionsMockData } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/mocks/handlers/TrainerCoachingSessionsMockHandlers';

const server = setupServer(...TrainerSessionsMockHandlers);
const base = env.NEXT_PUBLIC_API_URL;
const sessionsUrl = `${base}${TRAINER_SESSIONS_URLS.API.LIST}`;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => {
  resetTrainerSessionsMockData();
  server.resetHandlers();
});

const readSessions = async (query = '') => {
  const response = await fetch(`${sessionsUrl}${query}`);
  expect(response.ok).toBe(true);
  return (await response.json()) as { data: Array<{ id: string; sessionDate: string; time: string; duration: string; attendees: number; status: string }> };
};

describe('Trainer sessions mutable mock-handler contracts', () => {
  it('starts from a clean fixture snapshot for each test', async () => {
    const response = await readSessions();
    expect(response.data).toHaveLength(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS.length);
    expect(response.data.map((session) => session.id)).toEqual(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS.map((session) => session.id));
  });

  it('rejects invalid create payloads without mutating the session collection', async () => {
    const response = await fetch(sessionsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'PT', memberId: 'm1', date: '2030-02-30', time: '10:30', duration: '60m' }),
    });
    expect(response.status).toBe(422);
    expect((await readSessions()).data).toHaveLength(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS.length);
  });

  it('creates a valid PT session and returns it from a subsequent filtered read', async () => {
    const response = await fetch(sessionsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'PT', memberId: 'm1', date: '2030-02-28', time: '10:30', duration: '60m', location: 'Studio C' }),
    });
    expect(response.status).toBe(200);
    const created = (await response.json()) as { data: { id: string; sessionDate: string; member?: string; enrolledMembers?: Array<{ id: string }> } };
    expect(created.data.sessionDate).toBe('2030-02-28');
    expect(created.data.member).toBe('m1');
    expect(created.data.enrolledMembers?.map((member) => member.id)).toEqual(['m1']);
    const read = await readSessions('?date=2030-02-28&filter=PT');
    expect(read.data.map((session) => session.id)).toContain(created.data.id);
  });

  it('deduplicates retried create requests with the same idempotency key', async () => {
    const dto = { type: 'PT', memberId: 'm1', date: '2030-02-28', time: '10:30', duration: '60m', location: 'Studio C' };
    const headers = { 'Content-Type': 'application/json', 'Idempotency-Key': '00000000-0000-4000-8000-000000000001' };
    const first = await fetch(sessionsUrl, { method: 'POST', headers, body: JSON.stringify(dto) });
    const second = await fetch(sessionsUrl, { method: 'POST', headers, body: JSON.stringify(dto) });
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    const one = (await first.json()) as { data: { id: string } };
    const two = (await second.json()) as { data: { id: string } };
    expect(one.data.id).toBe(two.data.id);
    expect((await readSessions()).data).toHaveLength(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS.length + 1);
  });

  it('rejects an invalid update and preserves the original session values', async () => {
    const before = (await readSessions()).data.find((session) => session.id === 's1');
    const response = await fetch(`${base}${TRAINER_SESSIONS_URLS.API.UPDATE('s1')}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: '29:90' }),
    });
    expect(response.status).toBe(422);
    const after = (await readSessions()).data.find((session) => session.id === 's1');
    expect(after).toMatchObject({ time: before?.time, duration: before?.duration });
  });

  it('rejects malformed attendance member IDs without changing attendance', async () => {
    const before = (await readSessions()).data.find((session) => session.id === 's1');
    const response = await fetch(`${base}${TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE('s1')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberIds: ['m1', 7] }),
    });
    expect(response.status).toBe(422);
    const after = (await readSessions()).data.find((session) => session.id === 's1');
    expect(after?.attendees).toBe(before?.attendees);
  });

  it('applies attendance to enrolled members and removes cancelled sessions from subsequent reads', async () => {
    const attendance = await fetch(`${base}${TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE('s1')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberIds: ['m1', 'm2'] }),
    });
    expect(attendance.status).toBe(200);
    expect((await readSessions()).data.find((session) => session.id === 's1')?.attendees).toBe(2);

    const cancelled = await fetch(`${base}${TRAINER_SESSIONS_URLS.API.CANCEL('s1')}`, { method: 'DELETE' });
    expect(cancelled.status).toBe(200);
    expect((await readSessions()).data.some((session) => session.id === 's1')).toBe(false);
  });
});
