// RESPONSIBILITY: Guards the required eight-state mock catalog for notifications_inbox.
import { describe, expect, it } from 'vitest';
import { MANAGERNOTIFICATIONSINBOX_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_communications/notifications_inbox/mocks/scenarios/ManagerNotificationsInboxMockScenarios';

describe('ManagerNotificationsInbox mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERNOTIFICATIONSINBOX_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
