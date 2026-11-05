import { describe, expect, it } from 'vitest';

import { getSuperadminCommunicationMessagingStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center_status_badge_config.constants';



describe('getSuperadminCommunicationMessagingStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminCommunicationMessagingStatusBadgeClasses('SENT')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminCommunicationMessagingStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
