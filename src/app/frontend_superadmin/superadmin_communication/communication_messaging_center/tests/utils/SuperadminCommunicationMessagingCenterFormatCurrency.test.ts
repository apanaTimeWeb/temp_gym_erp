import { describe, expect, it } from 'vitest';

import { SuperadminCommunicationMessagingFormatCurrency } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/utils/SuperadminCommunicationMessagingCenterFormatCurrency';



describe('SuperadminCommunicationMessagingFormatCurrency', () => {
  it('formats backend minor units using the supplied ISO currency', () => {
    expect(SuperadminCommunicationMessagingFormatCurrency(799900, 'INR', 'en-IN')).toContain('7,999');
  });

  it('handles zero-decimal and three-decimal currencies', () => {
    expect(SuperadminCommunicationMessagingFormatCurrency(1234, 'JPY', 'en-IN')).toContain('1,234');
    expect(SuperadminCommunicationMessagingFormatCurrency(1234, 'KWD', 'en-IN')).toContain('1.234');
  });
});
