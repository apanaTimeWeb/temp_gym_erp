/** Standalone mock harness for Members directory/profile. */
export { TrainerMembersMockHandlers } from '../../mocks/handlers/TrainerMembersDirectoryAndProfileMockHandlers';

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerMembersMembersDirectoryAndProfileScenarioRegistry } from '../../mocks/scenarios/trainer_members_members_directory_and_profile.scenarios';
import type { TrainerMembersMembersDirectoryAndProfileScenarioKey } from '../../types/TrainerMembersMembersDirectoryAndProfileMockScenarioTypes';

export { createTrainerMembersMembersDirectoryAndProfileScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerMembersMembersDirectoryAndProfileMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerMembersMembersDirectoryAndProfileScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerMembersMembersDirectoryAndProfileScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerMembersMembersDirectoryAndProfileScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerMembersMembersDirectoryAndProfileScenarioSelector } from './ScenarioSelector';
export { default as TrainerMembersMembersDirectoryAndProfileHarness } from './Harness';
