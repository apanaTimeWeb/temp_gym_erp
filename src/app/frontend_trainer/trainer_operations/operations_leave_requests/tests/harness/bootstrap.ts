// Module-local standalone fixture/handler entry; host wires approved global adapters.
export const moduleMockNamespace = "operations_leave_requests" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerOperationsOperationsLeaveRequestsScenarioRegistry } from '../../mocks/scenarios/trainer_operations_operations_leave_requests.scenarios';
import type { TrainerOperationsOperationsLeaveRequestsScenarioKey } from '../../types/TrainerOperationsOperationsLeaveRequestsMockScenarioTypes';

export { createTrainerOperationsOperationsLeaveRequestsScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerOperationsOperationsLeaveRequestsMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerOperationsOperationsLeaveRequestsScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerOperationsOperationsLeaveRequestsScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerOperationsOperationsLeaveRequestsScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerOperationsOperationsLeaveRequestsScenarioSelector } from './ScenarioSelector';
export { default as TrainerOperationsOperationsLeaveRequestsHarness } from './Harness';
