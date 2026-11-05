import { describe, expect, it } from 'vitest';
import { managerCommunicationsHandlers, resetManagerCommunicationsChurnRecoveryMockState } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/mocks/handlers/ManagerCommunicationsChurnRecoveryMockHandlers';

describe('communications_churn_recovery mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerCommunicationsHandlers)).toBe(true);
    expect(typeof resetManagerCommunicationsChurnRecoveryMockState).toBe('function');
  });
});
