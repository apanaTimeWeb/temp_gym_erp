import { describe, expect, it, vi } from 'vitest';
import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/api/TrainerCoachingWorkoutPlansApi';
import { TRAINER_WORKOUT_MOCK_WORKOUTS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/mocks/handlers/TrainerCoachingWorkoutPlansMockData';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer workout API behavior', () => {
  it('forwards workout list filters and returns validated server data', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'OK', data: { workouts: [TRAINER_WORKOUT_MOCK_WORKOUTS[0]], total: 1 } });
    const result = await TrainerWorkoutApi.fetchWorkouts({ search: 'Full Body', page: '2', limit: '10', level: 'Beginner' });
    expect(apiFetch.mock.calls[0][0]).toContain('search=Full+Body');
    expect(apiFetch.mock.calls[0][0]).toContain('page=2');
    expect(result.data.workouts[0]?.name).toBe('Full Body Fundamentals');
  });

  it('sends an idempotency key on workout creation', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Workout created', data: TRAINER_WORKOUT_MOCK_WORKOUTS[0] });
    const result = await TrainerWorkoutApi.createWorkout({ name: 'Full Body Fundamentals', level: 'Beginner', days: 3, exercises: 8, focus: 'General Fitness', duration: '45 mins' }, 'workout-create-test-key');
    expect(apiFetch.mock.calls[0][1]?.headers).toMatchObject({ 'Idempotency-Key': 'workout-create-test-key' });
    expect(result.message).toBe('Workout created');
    expect(result.data.id).toBe('wk-1');
  });

  it('covers workout PATCH and DELETE contracts', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Updated', data: TRAINER_WORKOUT_MOCK_WORKOUTS[0] });
    await TrainerWorkoutApi.updateWorkout('wk-1', { name: 'Updated plan' }, 'update-workout-key');
    expect(apiFetch.mock.calls.at(-1)?.[1]).toMatchObject({ method: 'PATCH', headers: { 'Idempotency-Key': 'update-workout-key' } });
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Deleted', data: null });
    await TrainerWorkoutApi.deleteWorkout('wk-1', 'delete-workout-key');
    expect(apiFetch.mock.calls.at(-1)?.[1]).toMatchObject({ method: 'DELETE', headers: { 'Idempotency-Key': 'delete-workout-key' } });
  });

  it('covers exercise list, create, update, and delete contracts', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'OK', data: { exercises: [], total: 0 } });
    await TrainerWorkoutApi.fetchExercises({ page: '1', limit: '10' });
    expect(apiFetch.mock.calls.at(-1)?.[0]).toContain('limit=10');
    const exercise = { id: 'ex-test', name: 'Squat', difficulty: 'Beginner', isActive: true };
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Created', data: exercise });
    await TrainerWorkoutApi.createExercise({ name: 'Squat', muscle: 'Legs', difficulty: 'Beginner' }, 'create-exercise-key');
    expect(apiFetch.mock.calls.at(-1)?.[1]).toMatchObject({ method: 'POST', headers: { 'Idempotency-Key': 'create-exercise-key' } });
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Updated', data: exercise });
    await TrainerWorkoutApi.updateExercise('ex-test', { name: 'Squat updated' }, 'update-exercise-key');
    expect(apiFetch.mock.calls.at(-1)?.[1]).toMatchObject({ method: 'PATCH', headers: { 'Idempotency-Key': 'update-exercise-key' } });
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Deleted', data: null });
    await TrainerWorkoutApi.deleteExercise('ex-test', 'delete-exercise-key');
    expect(apiFetch.mock.calls.at(-1)?.[1]).toMatchObject({ method: 'DELETE', headers: { 'Idempotency-Key': 'delete-exercise-key' } });
  });

  it('propagates canonical failure envelopes for workout and exercise writes before parsing null payloads', async () => {
    const failure = { success: false, requestId: 'workout-write-failure', message: 'Write rejected', data: null, errorCode: 'WRITE_REJECTED', statusCode: 403 };
    apiFetch.mockResolvedValueOnce(failure);
    await expect(TrainerWorkoutApi.deleteWorkout('wk-1', 'delete-workout-key')).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'exercise-delete-failure' });
    await expect(TrainerWorkoutApi.deleteExercise('ex-1', 'delete-exercise-key')).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'workout-create-failure' });
    await expect(TrainerWorkoutApi.createWorkout({ name: 'Plan', level: 'Beginner', days: 3, exercises: 8, focus: 'General Fitness', duration: '45 mins' }, 'create-workout-key')).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'workout-update-failure' });
    await expect(TrainerWorkoutApi.updateWorkout('wk-1', { name: 'Updated' }, 'update-key')).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'exercise-create-failure' });
    await expect(TrainerWorkoutApi.createExercise({ name: 'Squat', muscle: 'Legs', difficulty: 'Beginner' }, 'create-key')).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'exercise-update-failure' });
    await expect(TrainerWorkoutApi.updateExercise('ex-1', { name: 'Squat' }, 'update-exercise-key')).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'workout-read-failure' });
    await expect(TrainerWorkoutApi.fetchWorkouts()).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
    apiFetch.mockResolvedValueOnce({ ...failure, requestId: 'exercise-read-failure' });
    await expect(TrainerWorkoutApi.fetchExercises()).rejects.toMatchObject({ message: 'Write rejected', errorCode: 'WRITE_REJECTED', statusCode: 403 });
  });

  it('rejects malformed success envelopes and propagates transport failures', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, requestId: 'workout-success', message: 'Missing data' });
    await expect(TrainerWorkoutApi.fetchWorkouts()).rejects.toThrow();
    apiFetch.mockRejectedValueOnce(new Error('network unavailable'));
    await expect(TrainerWorkoutApi.fetchExercises()).rejects.toThrow('network unavailable');
  });
});
