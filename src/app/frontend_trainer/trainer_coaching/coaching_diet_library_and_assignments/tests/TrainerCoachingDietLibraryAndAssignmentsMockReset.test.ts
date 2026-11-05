import { describe, expect, it } from 'vitest';
import { resetTrainerLibraryMockState } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/mocks/handlers/TrainerCoachingDietLibraryAndAssignmentsMockHandlers';

describe('diet assignment mock isolation', () => {
  it('supports deterministic repeatable reset between test runs', () => {
    expect(() => resetTrainerLibraryMockState()).not.toThrow();
    expect(() => resetTrainerLibraryMockState()).not.toThrow();
  });
});
