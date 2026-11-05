// Guards the route-local mock scenario catalog and its required transport/UI states.
import { describe, expect, it } from 'vitest';
import { MANAGERCOMMUNICATIONSCHURNRECOVERY_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/mocks/scenarios/ManagerCommunicationsChurnRecoveryMockScenarios';

describe('communications_churn_recovery mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERCOMMUNICATIONSCHURNRECOVERY_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
