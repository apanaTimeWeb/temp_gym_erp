import { describe, expect, it } from 'vitest';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/api/manager_communications_communications_churn_recovery.api';

describe('communications_churn_recovery API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerCommunicationsCampaignsApi).sort()).toEqual(['fetchChurnKPIs', 'fetchChurnedMembers', 'sendWinBackMessage']);
  });
});
