import { describe, expect, it } from 'vitest';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_history/api/manager_communications_communications_history.api';

describe('communications_history API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerCommunicationsCampaignsApi).sort()).toEqual(['fetchCampaigns', 'fetchCommunicationKPIs']);
  });
});
