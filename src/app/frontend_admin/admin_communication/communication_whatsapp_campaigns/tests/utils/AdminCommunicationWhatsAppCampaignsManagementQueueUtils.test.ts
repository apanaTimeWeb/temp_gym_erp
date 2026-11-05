// RESPONSIBILITY: Defines regression tests for AdminCommunicationWhatsAppCampaignsManagementQueueUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_whatsapp_campaigns/tests/utils/AdminCommunicationWhatsAppCampaignsManagementQueueUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { buildAdminCampaignQueue, updateAdminCampaignQueueStatus } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementQueueUtils';
import type { AdminCampaignsRecipient } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';

const recipients: AdminCampaignsRecipient[] = [
  { id: 'r1', name: 'Asha Sharma', phone: '+91 98765 43210', branchName: 'Branch A' },
  { id: 'r2', name: 'Ravi Kumar', phone: '+91 98765 43211', branchName: 'Branch B' },
];

describe('Admin Campaigns queue utilities', () => {
  it('personalizes one queue message per recipient', () => {
    const queue = buildAdminCampaignQueue('Hi {name}', recipients);
    expect(queue).toHaveLength(2);
    expect(queue[0]?.message).toBe('Hi Asha Sharma');
    expect(queue[1]?.message).toBe('Hi Ravi Kumar');
    expect(queue.every((item) => item.status === 'QUEUED')).toBe(true);
  });

  it('updates only the selected queue item', () => {
    const queue = buildAdminCampaignQueue('Hi {name}', recipients);
    const next = updateAdminCampaignQueueStatus(queue, 1, 'OPENED');
    expect(next[0]?.status).toBe('QUEUED');
    expect(next[1]?.status).toBe('OPENED');
    expect(queue[1]?.status).toBe('QUEUED');
  });

  it('does not mutate the original queue for an invalid index', () => {
    const queue = buildAdminCampaignQueue('Hi {name}', recipients);
    const next = updateAdminCampaignQueueStatus(queue, 99, 'SENT');
    expect(next).toEqual(queue);
    expect(next).not.toBe(queue);
  });
});
