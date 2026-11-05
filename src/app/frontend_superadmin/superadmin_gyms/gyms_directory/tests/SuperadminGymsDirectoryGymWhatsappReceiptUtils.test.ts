import { describe, expect, it } from 'vitest';

import { formatSuperadminGymWhatsappReceiptDate } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryGymWhatsappReceiptUtils';



describe('formatSuperadminGymWhatsappReceiptDate', () => {
  it('formats a deterministic timestamp using the requested locale', () => {
    const instant = new Date('2026-09-20T12:00:00.000Z');
    expect(formatSuperadminGymWhatsappReceiptDate(instant, 'en-IN')).toMatch(/2026/);
    expect(formatSuperadminGymWhatsappReceiptDate(instant, 'hi-IN')).toMatch(/२०२६|2026/);
  });
});
