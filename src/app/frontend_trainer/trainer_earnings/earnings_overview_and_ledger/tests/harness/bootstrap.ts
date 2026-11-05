// Module-local standalone fixture/handler entry; host wires approved global adapters.
export { TrainerEarningsMockHandlers } from "../../mocks/handlers/TrainerEarningsOverviewAndLedgerEarningsMockHandlers";
export const moduleMockNamespace = "earnings_overview_and_ledger" as const;

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerEarningsEarningsOverviewAndLedgerScenarioRegistry } from '../../mocks/scenarios/trainer_earnings_earnings_overview_and_ledger.scenarios';
import type { TrainerEarningsEarningsOverviewAndLedgerScenarioKey } from '../../types/TrainerEarningsEarningsOverviewAndLedgerMockScenarioTypes';

export { createTrainerEarningsEarningsOverviewAndLedgerScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerEarningsEarningsOverviewAndLedgerMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerEarningsEarningsOverviewAndLedgerScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerEarningsEarningsOverviewAndLedgerScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerEarningsEarningsOverviewAndLedgerScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerEarningsEarningsOverviewAndLedgerScenarioSelector } from './ScenarioSelector';
export { default as TrainerEarningsEarningsOverviewAndLedgerHarness } from './Harness';
