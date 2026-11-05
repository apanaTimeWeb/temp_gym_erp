// Standalone module MSW handlers, subject to host env/api adapters.
export { TrainerLibraryMockHandlers } from '../../mocks/handlers/TrainerCoachingDietLibraryAndAssignmentsMockHandlers';

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerCoachingCoachingDietLibraryAndAssignmentsScenarioRegistry } from '../../mocks/scenarios/trainer_coaching_coaching_diet_library_and_assignments.scenarios';
import type { TrainerCoachingCoachingDietLibraryAndAssignmentsScenarioKey } from '../../types/TrainerCoachingCoachingDietLibraryAndAssignmentsMockScenarioTypes';

export { createTrainerCoachingCoachingDietLibraryAndAssignmentsScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerCoachingCoachingDietLibraryAndAssignmentsMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerCoachingCoachingDietLibraryAndAssignmentsScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerCoachingCoachingDietLibraryAndAssignmentsScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerCoachingCoachingDietLibraryAndAssignmentsScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerCoachingCoachingDietLibraryAndAssignmentsScenarioSelector } from './ScenarioSelector';
export { default as TrainerCoachingCoachingDietLibraryAndAssignmentsHarness } from './Harness';
