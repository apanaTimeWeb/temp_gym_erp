// Module-local standalone fixture/handler entry; host wires approved global adapters.
export { TrainerProgressTrackingMutationMockHandlers } from "../../mocks/handlers/TrainerCoachingIndividualProgressProgressTrackingMutationMockHandlers";
export const moduleMockNamespace = "coaching_individual_progress" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerCoachingCoachingIndividualProgressScenarioRegistry } from '../../mocks/scenarios/trainer_coaching_coaching_individual_progress.scenarios';
import type { TrainerCoachingCoachingIndividualProgressScenarioKey } from '../../types/TrainerCoachingCoachingIndividualProgressMockScenarioTypes';

export { createTrainerCoachingCoachingIndividualProgressScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerCoachingCoachingIndividualProgressMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerCoachingCoachingIndividualProgressScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerCoachingCoachingIndividualProgressScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerCoachingCoachingIndividualProgressScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerCoachingCoachingIndividualProgressScenarioSelector } from './ScenarioSelector';
export { default as TrainerCoachingCoachingIndividualProgressHarness } from './Harness';
