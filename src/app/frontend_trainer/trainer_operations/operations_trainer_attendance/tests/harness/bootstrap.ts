// Module-local standalone fixture/handler entry; host wires approved global adapters.
export const moduleMockNamespace = "operations_trainer_attendance" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerOperationsOperationsTrainerAttendanceScenarioRegistry } from '../../mocks/scenarios/trainer_operations_operations_trainer_attendance.scenarios';
import type { TrainerOperationsOperationsTrainerAttendanceScenarioKey } from '../../types/TrainerOperationsOperationsTrainerAttendanceMockScenarioTypes';

export { createTrainerOperationsOperationsTrainerAttendanceScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerOperationsOperationsTrainerAttendanceMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerOperationsOperationsTrainerAttendanceScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerOperationsOperationsTrainerAttendanceScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerOperationsOperationsTrainerAttendanceScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerOperationsOperationsTrainerAttendanceScenarioSelector } from './ScenarioSelector';
export { default as TrainerOperationsOperationsTrainerAttendanceHarness } from './Harness';
