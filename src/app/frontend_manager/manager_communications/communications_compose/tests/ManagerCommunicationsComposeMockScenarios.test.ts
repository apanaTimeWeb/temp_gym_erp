// Guards this autonomous leaf's complete transport and UI scenario catalog.
import { describe, expect, it } from 'vitest';
import { MANAGERCOMMUNICATIONSCOMPOSE_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_communications/communications_compose/mocks/scenarios/ManagerCommunicationsComposeMockScenarios';

describe('communications_compose mock scenario catalog', () => {
  it('declares the required transport and UI states', () => {
    expect(Object.keys(MANAGERCOMMUNICATIONSCOMPOSE_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
