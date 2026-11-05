// Module-local standalone fixture/handler entry; host wires approved global adapters.
export const moduleMockNamespace = "account_security" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerAccountAccountSecurityScenarioRegistry } from '../../mocks/scenarios/trainer_account_account_security.scenarios';
import type { TrainerAccountAccountSecurityScenarioKey } from '../../types/TrainerAccountAccountSecurityMockScenarioTypes';

export { createTrainerAccountAccountSecurityScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerAccountAccountSecurityMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerAccountAccountSecurityScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerAccountAccountSecurityScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerAccountAccountSecurityScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerAccountAccountSecurityScenarioSelector } from './ScenarioSelector';
export { default as TrainerAccountAccountSecurityHarness } from './Harness';
