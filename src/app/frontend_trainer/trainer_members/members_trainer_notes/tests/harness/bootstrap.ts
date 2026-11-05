export { trainerNotesMockHandlers, resetTrainerNotesMocks } from '../../mocks/TrainerMembersTrainerNotesHandlers';

import { setupWorker } from 'msw/browser';
import type { RequestHandler } from 'msw';
import { createTrainerMembersMembersTrainerNotesScenarioRegistry } from '../../mocks/scenarios/trainer_members_members_trainer_notes.scenarios';
import type { TrainerMembersMembersTrainerNotesScenarioKey } from '../../types/TrainerMembersMembersTrainerNotesMockScenarioTypes';

export { createTrainerMembersMembersTrainerNotesScenarioRegistry };

/**
 * Starts an isolated browser MSW worker for this leaf and exposes deterministic scenario switching.
 * Pass this leaf's existing handler arrays, its existing list/detail GET endpoint, and schema-shaped fixture data.
 */
export async function startTrainerMembersMembersTrainerNotesMockHarness<TData>(
  baseHandlers: RequestHandler[],
  endpoint: string,
  activeData: TData,
  initialScenario: TrainerMembersMembersTrainerNotesScenarioKey = 'ACTIVE_RECORDS',
) {
  const worker = setupWorker(...baseHandlers);
  const scenarios = createTrainerMembersMembersTrainerNotesScenarioRegistry(endpoint, activeData);
  await worker.start({ onUnhandledRequest: 'bypass' });
  worker.use(scenarios[initialScenario]);

  return {
    worker,
    selectScenario(nextScenario: TrainerMembersMembersTrainerNotesScenarioKey) {
      worker.resetHandlers(...baseHandlers);
      worker.use(scenarios[nextScenario]);
    },
    stop() {
      worker.stop();
    },
  };
}
export { default as TrainerMembersMembersTrainerNotesScenarioSelector } from './ScenarioSelector';
export { default as TrainerMembersMembersTrainerNotesHarness } from './Harness';
