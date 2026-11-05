import { describe, expect, it } from 'vitest';

import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_history/api/manager_communications_communications_history.query_keys';

describe('manager_communications query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerCommunicationsCampaignsQueryKeys.all).toEqual(['manager_communications']);
  });
});
