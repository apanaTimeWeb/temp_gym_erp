import { describe, expect, it } from 'vitest';

import { formatReceipt } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryWhatsappReceiptFormatter';

describe('SuperadminGymsWhatsappReceiptFormatter', () => {
  it('formats the canonical receipt sections deterministically', () => {
    const output = formatReceipt({
      title: 'Test Receipt',
      sections: [{ title: 'Payment', items: { Total: 'INR 100', Status: 'PAID' } }],
    });

    expect(output).toContain('Test Receipt');
    expect(output).toContain('Total: INR 100');
    expect(output).toContain('Status: PAID');
  });
});
