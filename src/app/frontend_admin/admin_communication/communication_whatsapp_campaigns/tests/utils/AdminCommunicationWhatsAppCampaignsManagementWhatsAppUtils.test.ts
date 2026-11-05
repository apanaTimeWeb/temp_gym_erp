// RESPONSIBILITY: Defines regression tests for AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_whatsapp_campaigns/tests/utils/AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { buildAdminWhatsAppLink, replaceAdminCampaignVariables } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils';

const recipient = { id: 'r1', name: 'Asha Sharma', phone: '+91 98765 43210', branchName: 'Branch A' };

describe('Admin Campaigns WhatsApp utilities', () => {
  it('replaces every supported name variable', () => {
    expect(replaceAdminCampaignVariables('Hi {name}, {name}!', recipient)).toBe('Hi Asha Sharma, Asha Sharma!');
  });

  it('builds an encoded wa.me link from a formatted phone number', () => {
    const link = buildAdminWhatsAppLink(recipient.phone, 'Pay now & save');
    expect(link).toBe('https://wa.me/919876543210?text=Pay%20now%20%26%20save');
  });

  it('returns an empty link when no phone number is available', () => {
    expect(buildAdminWhatsAppLink('', 'Hello')).toBe('');
  });
});
