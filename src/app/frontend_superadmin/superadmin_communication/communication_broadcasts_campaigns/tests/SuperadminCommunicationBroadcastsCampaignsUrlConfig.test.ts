import { describe, expect, it } from 'vitest';
import { SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API, SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_ROUTES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/config/superadmin_communication_broadcasts_campaigns.url_config';

describe('superadmin broadcasts URL contract', () => {
  it('keeps route ownership and collection endpoints centralized', () => {
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_ROUTES.MAIN).toBe('/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns');
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE).toBe('/superadmin/broadcasts');
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.TENANTS).toBe('/superadmin/gyms');
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.RECIPIENT_COUNT).toBe('/superadmin/broadcasts/recipient-count');
  });
  it('encodes identifiers and exposes separate MSW path patterns', () => {
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL('gym / 1')).toBe('/superadmin/broadcasts/gym%20%2F%201');
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DETAIL_PATTERN).toBe('/superadmin/broadcasts/:id');
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DELIVER_TO_RECIPIENT('b/1', 'r 2')).toBe('/superadmin/broadcasts/b%2F1/deliveries/r%202');
    expect(SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.DELIVER_TO_RECIPIENT_PATTERN).toBe('/superadmin/broadcasts/:id/deliveries/:recipientId');
  });
});
