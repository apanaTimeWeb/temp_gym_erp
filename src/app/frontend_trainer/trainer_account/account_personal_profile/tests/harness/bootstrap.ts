// Module-local standalone fixture/handler entry; host wires approved global adapters.
export { TrainerProfileMockHandlers } from "../../mocks/handlers/TrainerAccountPersonalProfileProfileMockHandlers";
export const moduleMockNamespace = "account_personal_profile" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerAccountAccountPersonalProfileScenarioRegistry } from '../../mocks/scenarios/trainer_account_account_personal_profile.scenarios';
import type { TrainerAccountAccountPersonalProfileScenarioKey } from '../../types/TrainerAccountAccountPersonalProfileMockScenarioTypes';

export { createTrainerAccountAccountPersonalProfileScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerAccountAccountPersonalProfileMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerAccountAccountPersonalProfileScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerAccountAccountPersonalProfileScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerAccountAccountPersonalProfileScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerAccountAccountPersonalProfileScenarioSelector } from './ScenarioSelector';
export { default as TrainerAccountAccountPersonalProfileHarness } from './Harness';
