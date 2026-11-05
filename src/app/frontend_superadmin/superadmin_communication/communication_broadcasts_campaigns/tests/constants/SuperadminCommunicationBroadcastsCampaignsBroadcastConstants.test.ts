import { describe, expect, it } from 'vitest';

import { SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES, SUPERADMIN_BROADCAST_STATUS_CODES, SUPERADMIN_BROADCAST_STATUS_OPTIONS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';

describe('broadcast status constants', () => {
  it('defines the exact supported lifecycle values and matching display options', () => {
    expect(SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES).toEqual(['DRAFT', 'SCHEDULED', 'SENT']);
    expect(SUPERADMIN_BROADCAST_STATUS_OPTIONS.map((option) => option.value)).toEqual([...SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES]);
    expect(SUPERADMIN_BROADCAST_STATUS_CODES.ALL).toBe('ALL');
    expect(SUPERADMIN_BROADCAST_STATUS_CODES.FAILED).toBe('FAILED');
  });
});
