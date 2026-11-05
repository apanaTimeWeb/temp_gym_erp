import { describe, expect, it } from 'vitest';

import { ManagerNotificationsInboxQueryKeys } from '@/app/frontend_manager/manager_communications/notifications_inbox/api/manager_notifications_inbox.query_keys';

describe('manager_notifications query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerNotificationsInboxQueryKeys.all).toEqual(['manager_notifications']);
  });
});
