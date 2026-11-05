// Standalone module MSW handlers, subject to host env/api adapters.
export { TrainerSessionsMockHandlers, resetTrainerSessionsMockData } from '../../mocks/handlers/TrainerCoachingSessionsMockHandlers';

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerCoachingCoachingSessionsScenarioRegistry } from '../../mocks/scenarios/trainer_coaching_coaching_sessions.scenarios';
import type { TrainerCoachingCoachingSessionsScenarioKey } from '../../types/TrainerCoachingCoachingSessionsMockScenarioTypes';

export { createTrainerCoachingCoachingSessionsScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerCoachingCoachingSessionsMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerCoachingCoachingSessionsScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerCoachingCoachingSessionsScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerCoachingCoachingSessionsScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerCoachingCoachingSessionsScenarioSelector } from './ScenarioSelector';
export { default as TrainerCoachingCoachingSessionsHarness } from './Harness';
