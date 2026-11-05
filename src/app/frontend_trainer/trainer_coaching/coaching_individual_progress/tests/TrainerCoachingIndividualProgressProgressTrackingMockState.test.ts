import { describe, expect, it } from 'vitest';
import { TRAINER_PROGRESS_TRACKING_MOCK_CURRENT_TRAINER, isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/handlers/TrainerCoachingIndividualProgressProgressTrackingMockState';

describe('progress mock ownership boundary', () => {
  it('permits mutation only for entries owned by the simulated current trainer', () => {
    expect(isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer({ recordedBy: TRAINER_PROGRESS_TRACKING_MOCK_CURRENT_TRAINER })).toBe(true);
    expect(isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer({ recordedBy: 'Another Trainer' })).toBe(false);
    expect(isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer({ recordedBy: 'Admin' })).toBe(false);
  });
});
