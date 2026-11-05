export { TrainerWorkoutMockHandlers, resetTrainerWorkoutMockData } from '../../mocks/handlers/TrainerCoachingWorkoutPlansMockHandlers';

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerCoachingCoachingWorkoutPlansScenarioRegistry } from '../../mocks/scenarios/trainer_coaching_coaching_workout_plans.scenarios';
import type { TrainerCoachingCoachingWorkoutPlansScenarioKey } from '../../types/TrainerCoachingCoachingWorkoutPlansMockScenarioTypes';

export { createTrainerCoachingCoachingWorkoutPlansScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerCoachingCoachingWorkoutPlansMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerCoachingCoachingWorkoutPlansScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerCoachingCoachingWorkoutPlansScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerCoachingCoachingWorkoutPlansScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerCoachingCoachingWorkoutPlansScenarioSelector } from './ScenarioSelector';
export { default as TrainerCoachingCoachingWorkoutPlansHarness } from './Harness';
