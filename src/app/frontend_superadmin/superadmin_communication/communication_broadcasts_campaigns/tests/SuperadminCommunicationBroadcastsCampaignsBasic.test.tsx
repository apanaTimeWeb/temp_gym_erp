import {describe, expect, it, beforeEach} from 'vitest';

import { MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures';
import { resetSuperadminCommunicationBroadcastsMockState } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers';



beforeEach(() => {
  resetSuperadminCommunicationBroadcastsMockState();
});

describe('Superadmin Broadcasts module fixture contract', () => {
  it('provides broadcast records with the fields consumed by list actions', () => {
    expect(Array.isArray(MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS)).toBe(true);
    expect(MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS.length).toBeGreaterThan(0);
    expect(MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0]).toBeDefined();
    expect(MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS.every((broadcast) => Boolean(broadcast.id && broadcast.title && broadcast.status))).toBe(true);
    expect(new Set(MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS.map((broadcast) => broadcast.status)).size).toBeGreaterThan(1);
  });

});
