import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { env } from '@/config/env';
import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';
import { TrainerWorkoutMockHandlers, resetTrainerWorkoutMockData } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/mocks/handlers/TrainerCoachingWorkoutPlansMockHandlers';

const server = setupServer(...TrainerWorkoutMockHandlers);
const base = env.NEXT_PUBLIC_API_URL;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => { resetTrainerWorkoutMockData(); server.resetHandlers(); });

describe('Trainer workout mock mutation contracts', () => {
  it('replays a workout create for the same idempotency key', async () => {
    const payload = { name: 'RBG idempotent plan', level: 'Beginner', days: 3, exercises: 1, focus: 'Strength', duration: '45 mins', tags: 'strength', workoutExercises: [{ name: 'Squat', sets: 3, reps: '10' }] };
    const url = `${base}${TRAINER_WORKOUT_URLS.API.WORKOUTS}`;
    const request = () => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'rbg-workout-create' }, body: JSON.stringify(payload) });
    const first = await (await request()).json();
    const replay = await (await request()).json();
    expect(replay.data.id).toBe(first.data.id);
    const list = await (await fetch(`${url}?page=1&limit=10`)).json();
    expect(list.data.total).toBe(4);
  });
  it('rejects immutable/unknown PATCH fields without changing the record', async () => {
    const url = `${base}${TRAINER_WORKOUT_URLS.API.WORKOUTS}/wk-1`;
    const invalid = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'overwritten', status: 'disabled' }) });
    expect(invalid.status).toBe(422);
    const fetched = await (await fetch(`${base}${TRAINER_WORKOUT_URLS.API.WORKOUTS}?page=1&limit=10`)).json();
    expect(fetched.data.workouts.some((item: { id: string }) => item.id === 'wk-1')).toBe(true);
    expect(fetched.data.workouts.some((item: { id: string }) => item.id === 'overwritten')).toBe(false);
  });
  it('replays exercise creation for the same idempotency key and keeps distinct keys independent', async () => {
    const url = `${base}${TRAINER_WORKOUT_URLS.API.EXERCISES}`;
    const request = (key: string) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ name: 'RBG test exercise', muscle: 'Legs', difficulty: 'Beginner' }) });
    const first = await (await request('exercise-create-replay')).json();
    const replay = await (await request('exercise-create-replay')).json();
    expect(replay.data.id).toBe(first.data.id);
    const distinct = await (await request('exercise-create-distinct')).json();
    expect(distinct.data.id).not.toBe(first.data.id);
    const list = await (await fetch(`${url}?page=1&limit=10&search=RBG+test+exercise`)).json();
    expect(list.data.total).toBe(2);
  });
  it('rejects invalid PATCH date values and reversed ranges without mutating the workout', async () => {
    const url = `${base}${TRAINER_WORKOUT_URLS.API.WORKOUTS}/wk-1`;
    const invalidDates = [
      { startDate: '2026-02-31' },
      { startDate: '2026-06-02', endDate: '2026-06-01' },
    ];
    for (const patch of invalidDates) {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      expect(response.status).toBe(422);
    }
    const fetched = await (await fetch(`${base}${TRAINER_WORKOUT_URLS.API.WORKOUTS}?page=1&limit=10`)).json();
    const original = fetched.data.workouts.find((item: { id: string }) => item.id === 'wk-1');
    expect(original).toBeDefined();
    expect(original.startDate).toBeUndefined();
    expect(original.endDate).toBeUndefined();
  });

  it('rejects invalid exercise PATCH fields without changing the record', async () => {
    const url = `${base}${TRAINER_WORKOUT_URLS.API.EXERCISES}/ex-1`;
    const invalid = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'overwritten', isActive: false }) });
    expect(invalid.status).toBe(422);
    const fetched = await (await fetch(`${base}${TRAINER_WORKOUT_URLS.API.EXERCISES}?page=1&limit=10`)).json();
    expect(fetched.data.exercises.some((item: { id: string }) => item.id === 'ex-1')).toBe(true);
    expect(fetched.data.exercises.some((item: { id: string }) => item.id === 'overwritten')).toBe(false);
  });
});
