import { describe, expect, it } from 'vitest';

import { SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { broadcastSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_aliases.schemas';
import { BroadcastStatusSchema, BroadcastResponseSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/schemas/superadmin_communication_broadcasts_campaigns_contract.schemas';


describe('broadcast schemas', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(broadcastSchema.safeParse({}).success).toBe(false);
  });

  it('accepts every canonical lifecycle status and rejects unsupported filter values', () => {
    for (const status of SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES) expect(BroadcastStatusSchema.safeParse(status).success).toBe(true);
    expect(BroadcastStatusSchema.safeParse('FAILED').success).toBe(false);
    expect(BroadcastStatusSchema.safeParse('UNKNOWN').success).toBe(false);
  });

  it('accepts a legacy all-tenants response with an empty explicit target list', () => {
    expect(BroadcastResponseSchema.safeParse({ id: 'b-1', title: 'All gyms', content: 'Hello everyone', status: 'DRAFT', targetGymIds: [], audience: 'ALL_TENANTS' }).success).toBe(true);
  });
});


describe('all-gyms broadcast target contract', () => {
  it('accepts an empty targetGymIds array as the documented all-gyms selection', () => {
    expect(broadcastSchema.safeParse({ title: 'Platform update', content: 'Important notice', targetGymIds: [], status: 'DRAFT', scheduledDate: null }).success).toBe(true);
  });
});
