// Module-local standalone fixture/handler entry; host wires approved global adapters.
export { resetTrainerAttendanceMockData } from "../../mocks/handlers/TrainerOperationsMemberAttendanceAttendanceMockHandlers";
export const moduleMockNamespace = "operations_member_attendance" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerOperationsOperationsMemberAttendanceScenarioRegistry } from '../../mocks/scenarios/trainer_operations_operations_member_attendance.scenarios';
import type { TrainerOperationsOperationsMemberAttendanceScenarioKey } from '../../types/TrainerOperationsOperationsMemberAttendanceMockScenarioTypes';

export { createTrainerOperationsOperationsMemberAttendanceScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerOperationsOperationsMemberAttendanceMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerOperationsOperationsMemberAttendanceScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerOperationsOperationsMemberAttendanceScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerOperationsOperationsMemberAttendanceScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerOperationsOperationsMemberAttendanceScenarioSelector } from './ScenarioSelector';
export { default as TrainerOperationsOperationsMemberAttendanceHarness } from './Harness';
