import { describe, expect, it } from 'vitest';
import { managerCommunicationsHandlers, resetManagerCommunicationsAutomationsMockState } from '@/app/frontend_manager/manager_communications/communications_automations/mocks/handlers/ManagerCommunicationsAutomationsMockHandlers';

describe('communications_automations mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerCommunicationsHandlers)).toBe(true);
    expect(typeof resetManagerCommunicationsAutomationsMockState).toBe('function');
  });
});
