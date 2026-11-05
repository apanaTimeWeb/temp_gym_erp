import { describe, expect, it } from 'vitest';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_compose/api/manager_communications_communications_compose.api';

describe('communications_compose API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerCommunicationsCampaignsApi).sort()).toEqual(['fetchSegmentRecipients', 'sendCampaign']);
  });
});
