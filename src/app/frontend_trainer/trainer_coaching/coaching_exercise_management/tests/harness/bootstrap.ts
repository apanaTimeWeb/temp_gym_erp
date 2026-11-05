export { trainerCoachingExerciseManagementMockHandlers, resetTrainerCoachingExerciseManagementMocks } from '../../mocks/handlers/TrainerCoachingExerciseManagementMockHandlers';

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerCoachingCoachingExerciseManagementScenarioRegistry } from '../../mocks/scenarios/trainer_coaching_coaching_exercise_management.scenarios';
import type { TrainerCoachingCoachingExerciseManagementScenarioKey } from '../../types/TrainerCoachingCoachingExerciseManagementMockScenarioTypes';

export { createTrainerCoachingCoachingExerciseManagementScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerCoachingCoachingExerciseManagementMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerCoachingCoachingExerciseManagementScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerCoachingCoachingExerciseManagementScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerCoachingCoachingExerciseManagementScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerCoachingCoachingExerciseManagementScenarioSelector } from './ScenarioSelector';
export { default as TrainerCoachingCoachingExerciseManagementHarness } from './Harness';
