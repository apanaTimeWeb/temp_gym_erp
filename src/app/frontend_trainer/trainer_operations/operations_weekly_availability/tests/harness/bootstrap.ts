// Module-local standalone fixture/handler entry; host wires approved global adapters.
export { TrainerScheduleMockHandlers } from "../../mocks/handlers/TrainerOperationsWeeklyAvailabilityScheduleMockHandlers";
export const moduleMockNamespace = "operations_weekly_availability" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerOperationsOperationsWeeklyAvailabilityScenarioRegistry } from '../../mocks/scenarios/trainer_operations_operations_weekly_availability.scenarios';
import type { TrainerOperationsOperationsWeeklyAvailabilityScenarioKey } from '../../types/TrainerOperationsOperationsWeeklyAvailabilityMockScenarioTypes';

export { createTrainerOperationsOperationsWeeklyAvailabilityScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerOperationsOperationsWeeklyAvailabilityMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerOperationsOperationsWeeklyAvailabilityScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerOperationsOperationsWeeklyAvailabilityScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerOperationsOperationsWeeklyAvailabilityScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerOperationsOperationsWeeklyAvailabilityScenarioSelector } from './ScenarioSelector';
export { default as TrainerOperationsOperationsWeeklyAvailabilityHarness } from './Harness';
