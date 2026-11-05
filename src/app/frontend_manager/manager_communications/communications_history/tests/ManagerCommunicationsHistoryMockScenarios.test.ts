// Guards the route-local mock scenario catalog and its required transport/UI states.
import { describe, expect, it } from 'vitest';
import { MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS, resolveManagerCommunicationsHistoryMockScenario } from '@/app/frontend_manager/manager_communications/communications_history/mocks/scenarios/ManagerCommunicationsHistoryMockScenarios';

describe('communications_history mock scenario catalog', () => {
  it('resolves each declared scenario to its configured HTTP outcome', () => {
    expect(resolveManagerCommunicationsHistoryMockScenario('SERVER_500')).toEqual({ status: 500, kind: 'server-error' });
    expect(resolveManagerCommunicationsHistoryMockScenario('UNAUTHORIZED')).toEqual({ status: 401, kind: 'unauthorized' });
    expect(resolveManagerCommunicationsHistoryMockScenario('RETRY')).toEqual({ status: 503, kind: 'retry-then-success' });
  });

  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
