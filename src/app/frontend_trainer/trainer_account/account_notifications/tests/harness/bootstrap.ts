// Module-local standalone fixture/handler entry; host wires approved global adapters.
export { TrainerNotificationsMockHandlers } from "../../mocks/handlers/TrainerAccountNotificationsNotificationsMockHandlers";
export const moduleMockNamespace = "account_notifications" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerAccountAccountNotificationsScenarioRegistry } from '../../mocks/scenarios/trainer_account_account_notifications.scenarios';
import type { TrainerAccountAccountNotificationsScenarioKey } from '../../types/TrainerAccountAccountNotificationsMockScenarioTypes';

export { createTrainerAccountAccountNotificationsScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerAccountAccountNotificationsMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerAccountAccountNotificationsScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerAccountAccountNotificationsScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerAccountAccountNotificationsScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerAccountAccountNotificationsScenarioSelector } from './ScenarioSelector';
export { default as TrainerAccountAccountNotificationsHarness } from './Harness';
