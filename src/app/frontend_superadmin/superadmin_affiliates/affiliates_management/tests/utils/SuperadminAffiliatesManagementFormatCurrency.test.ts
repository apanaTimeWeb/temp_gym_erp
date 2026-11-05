import { describe, expect, it } from 'vitest';

import { SuperadminAffiliatesFormatCurrency } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementFormatCurrency';



describe('SuperadminAffiliatesFormatCurrency', () => {
  it('formats backend minor units using the supplied ISO currency', () => {
    expect(SuperadminAffiliatesFormatCurrency(799900, 'INR', 'en-IN')).toContain('7,999');
  });

  it('handles zero-decimal and three-decimal currencies', () => {
    expect(SuperadminAffiliatesFormatCurrency(1234, 'JPY', 'en-IN')).toContain('1,234');
    expect(SuperadminAffiliatesFormatCurrency(1234, 'KWD', 'en-IN')).toContain('1.234');
  });
});
