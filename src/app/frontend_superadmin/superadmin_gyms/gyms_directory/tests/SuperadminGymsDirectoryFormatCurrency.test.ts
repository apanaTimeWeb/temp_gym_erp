import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatCurrency';



describe('SuperadminGymsFormatCurrency', () => {
  it('formats minor currency units using the feature currency contract', () => {
    expect(formatCurrency(9999, 'INR', 'en-IN')).toContain('99.99');
    expect(formatCurrency(1000, 'JPY', 'ja-JP')).toContain('1,000');
    expect(formatCurrency(1000, 'KWD', 'en-US')).toMatch(/1\.000/);
    expect(formatCurrency(1000, 'BHD', 'en-US')).toMatch(/1\.000/);
  });
});
