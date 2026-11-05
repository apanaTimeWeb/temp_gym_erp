/** Module-owned dashboard request scenarios for the standalone MSW test harness. */
import { TrainerDashboardMockHandlers } from '../../mocks/TrainerDashboardOverviewMockHandlers';

export const dashboardOverviewMockHandlers = TrainerDashboardMockHandlers;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerDashboardDashboardOverviewScenarioRegistry } from '../../mocks/scenarios/trainer_dashboard_dashboard_overview.scenarios';
import type { TrainerDashboardDashboardOverviewScenarioKey } from '../../types/TrainerDashboardDashboardOverviewMockScenarioTypes';

export { createTrainerDashboardDashboardOverviewScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerDashboardDashboardOverviewMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerDashboardDashboardOverviewScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerDashboardDashboardOverviewScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerDashboardDashboardOverviewScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerDashboardDashboardOverviewScenarioSelector } from './ScenarioSelector';
export { default as TrainerDashboardDashboardOverviewHarness } from './Harness';
