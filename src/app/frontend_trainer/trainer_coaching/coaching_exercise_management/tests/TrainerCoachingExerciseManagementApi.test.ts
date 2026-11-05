import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TrainerWorkoutApi } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/api/TrainerCoachingExerciseManagementApi';
import { apiFetch } from '@/lib/api';
import { mapTrainerWorkoutExerciseUpdate } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/mocks/handlers/TrainerCoachingExerciseManagementMockHandlers';
import { TRAINER_EXERCISE_MOCK_FIXTURE } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/mocks/fixtures/TrainerCoachingExerciseManagementMockData';
vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));
beforeEach(() => vi.resetAllMocks());
describe('Exercise-only API and mutation contract', () => {
 it('writes no workout-plan CRUD operations from the exercise module', () => {
  expect(Object.keys(TrainerWorkoutApi).sort()).toEqual(['createExercise','deleteExercise','fetchExercises','updateExercise']);
 });
 it('DELETE keeps source endpoint and idempotency header', async () => {
  vi.mocked(apiFetch).mockResolvedValue({success:true,requestId:'exercise-delete-test-request',message:'Deleted',data:null});
  await TrainerWorkoutApi.deleteExercise('ex-1','uuid-v4-test');
  expect(apiFetch).toHaveBeenCalledWith('/trainer/trainer_workout/exercises/ex-1', {method:'DELETE',headers:{'Idempotency-Key':'uuid-v4-test'}});
 });

 it.each([
  { statusCode: 404, errorCode: 'EXERCISE_NOT_FOUND', message: 'Exercise not found' },
  { statusCode: 403, errorCode: 'EXERCISE_DELETE_FORBIDDEN', message: 'Exercise deletion is not permitted' },
 ])('rejects a valid unsuccessful DELETE envelope ($statusCode)', async ({ statusCode, errorCode, message }) => {
  vi.mocked(apiFetch).mockResolvedValueOnce({success:false,requestId:'exercise-delete-failure-request',message,data:null,errorCode,statusCode});
  await expect(TrainerWorkoutApi.deleteExercise('ex-failure','uuid-v4-test'))
   .rejects.toMatchObject({message,errorCode,statusCode});
 });
 it('rejects canonical failure envelopes before create/update payload parsing', async () => {
  const failure = {success:false,requestId:'exercise-write-failure-request',message:'Exercise update rejected',data:null,errorCode:'EXERCISE_UPDATE_REJECTED',statusCode:422};
  const dto = {name:'Bench Press',muscle:'Chest',difficulty:'Beginner',videoUrl:''};
  vi.mocked(apiFetch).mockResolvedValueOnce(failure);
  await expect(TrainerWorkoutApi.createExercise(dto,'create-key')).rejects.toMatchObject({message:'Exercise update rejected',errorCode:'EXERCISE_UPDATE_REJECTED',statusCode:422});
  vi.mocked(apiFetch).mockResolvedValueOnce(failure);
  await expect(TrainerWorkoutApi.updateExercise('ex-1',dto,'update-key')).rejects.toMatchObject({message:'Exercise update rejected',errorCode:'EXERCISE_UPDATE_REJECTED',statusCode:422});
 });
 it('maps the primary muscle DTO to the persisted mock domain fields on PATCH', () => {
  const existing = TRAINER_EXERCISE_MOCK_FIXTURE[0]!;
  const updated = mapTrainerWorkoutExerciseUpdate(existing, {muscle:'Chest'});
  expect(updated.category).toBe('Chest');
  expect(updated.muscleGroup).toEqual(['Chest']);
 });
});
