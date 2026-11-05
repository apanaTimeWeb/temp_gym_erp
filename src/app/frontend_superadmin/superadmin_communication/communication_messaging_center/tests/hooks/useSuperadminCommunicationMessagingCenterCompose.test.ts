// DATA FLOW: API / URL state / module client state → useSuperadminCommunicationMessagingCenterCompose → superadmin_communication_messaging view components.
import { describe, expect, it } from 'vitest';

import { useSuperadminCommunicationMessagingCenterCompose } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterCompose';

import type { SuperadminCommunicationMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_compose.types';
import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';



describe('useSuperadminCommunicationMessagingCenterCompose', () => {
  it('resolves the selected tenant into the outbound compose payload', () => {
    const tenants = [{ id: 'tenant-a', name: 'Tenant A' }] as MessagingTenant[];
    const values = { tenantId: 'tenant-a', channel: 'EMAIL' } as SuperadminCommunicationMessagingComposeValues;
    expect(useSuperadminCommunicationMessagingCenterCompose(tenants)(values)).toMatchObject({ tenantId: 'tenant-a', tenantName: 'Tenant A' });
  });

  it('returns null when the selected tenant cannot be resolved', () => {
    const values = { tenantId: 'missing', channel: 'EMAIL' } as SuperadminCommunicationMessagingComposeValues;
    expect(useSuperadminCommunicationMessagingCenterCompose([])(values)).toBeNull();
  });
});
