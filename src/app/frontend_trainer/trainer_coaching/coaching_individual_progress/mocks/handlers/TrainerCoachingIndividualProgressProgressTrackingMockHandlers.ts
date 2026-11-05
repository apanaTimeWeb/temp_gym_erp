import { TrainerProgressTrackingBrowseMockHandlers } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/handlers/TrainerCoachingIndividualProgressProgressTrackingBrowseMockHandlers';
import { TrainerProgressTrackingMutationMockHandlers } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/handlers/TrainerCoachingIndividualProgressProgressTrackingMutationMockHandlers';

/**
 * @description Composes browse and mutation handlers for the Progress Tracking feature.
 * @dependencies Uses only module-owned handler groups.
 */
export const TrainerProgressTrackingMockHandlers = [
  ...TrainerProgressTrackingBrowseMockHandlers,
  ...TrainerProgressTrackingMutationMockHandlers,
];
