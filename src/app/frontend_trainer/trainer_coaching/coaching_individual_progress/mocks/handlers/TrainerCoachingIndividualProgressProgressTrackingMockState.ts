import { TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/fixtures/TrainerCoachingIndividualProgressProgressTrackingMockData';

let trainerProgressTrackingMockProgressDb = [...TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES];

export function getTrainerProgressTrackingMockProgress(): typeof trainerProgressTrackingMockProgressDb {
  return trainerProgressTrackingMockProgressDb;
}

export function replaceTrainerProgressTrackingMockProgress(nextEntries: typeof trainerProgressTrackingMockProgressDb): void {
  trainerProgressTrackingMockProgressDb = nextEntries;
}

// Mock-only identity representing the authenticated trainer in deterministic fixtures. Production authorization must use server session context.
export const TRAINER_PROGRESS_TRACKING_MOCK_CURRENT_TRAINER = 'Trainer John';

export function isTrainerProgressTrackingMockEntryOwnedByCurrentTrainer(entry: { recordedBy: string }): boolean {
  return entry.recordedBy === TRAINER_PROGRESS_TRACKING_MOCK_CURRENT_TRAINER;
}
