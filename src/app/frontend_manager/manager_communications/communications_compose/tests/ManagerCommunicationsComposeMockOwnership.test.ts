import { describe, expect, it } from 'vitest';
import { managerCommunicationsHandlers, resetManagerCommunicationsComposeMockState } from '@/app/frontend_manager/manager_communications/communications_compose/mocks/handlers/ManagerCommunicationsComposeMockHandlers';

describe('communications_compose mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerCommunicationsHandlers)).toBe(true);
    expect(typeof resetManagerCommunicationsComposeMockState).toBe('function');
  });
});
