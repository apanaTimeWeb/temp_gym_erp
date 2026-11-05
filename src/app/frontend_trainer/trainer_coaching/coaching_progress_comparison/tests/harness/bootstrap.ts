// Module-local standalone fixture/handler entry; host wires approved global adapters.
export const moduleMockNamespace = "coaching_progress_comparison" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerCoachingCoachingProgressComparisonScenarioRegistry } from '../../mocks/scenarios/trainer_coaching_coaching_progress_comparison.scenarios';
import type { TrainerCoachingCoachingProgressComparisonScenarioKey } from '../../types/TrainerCoachingCoachingProgressComparisonMockScenarioTypes';

export { createTrainerCoachingCoachingProgressComparisonScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerCoachingCoachingProgressComparisonMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerCoachingCoachingProgressComparisonScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerCoachingCoachingProgressComparisonScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerCoachingCoachingProgressComparisonScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerCoachingCoachingProgressComparisonScenarioSelector } from './ScenarioSelector';
export { default as TrainerCoachingCoachingProgressComparisonHarness } from './Harness';
