import { describe, expect, it } from 'vitest';
import { managerCommunicationsHandlers, resetManagerCommunicationsHistoryMockState } from '@/app/frontend_manager/manager_communications/communications_history/mocks/handlers/ManagerCommunicationsHistoryMockHandlers';

describe('communications_history mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerCommunicationsHandlers)).toBe(true);
    expect(typeof resetManagerCommunicationsHistoryMockState).toBe('function');
  });
});
