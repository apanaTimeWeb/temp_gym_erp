// RESPONSIBILITY: Renders the SuperadminCommunicationMessagingBasic.test UI for the messaging feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES, MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/fixtures/SuperadminCommunicationMessagingCenterMockFixtures';
import { resetSuperadminCommunicationMessagingMockState } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers';



beforeEach(() => {
  resetSuperadminCommunicationMessagingMockState();
});

describe('Superadmin Messaging fixture behavior', () => {
  it('contains messages and tenant records for interactive flows', () => {
    expect(MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES).toHaveLength(8);
    expect(new Set(MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_MESSAGES.map((message) => message.status))).toEqual(new Set(['SENT', 'SCHEDULED', 'FAILED']));
    expect(MOCK_SUPERADMIN_COMMUNICATION_MESSAGING_TENANTS).toHaveLength(8);
  });
});
