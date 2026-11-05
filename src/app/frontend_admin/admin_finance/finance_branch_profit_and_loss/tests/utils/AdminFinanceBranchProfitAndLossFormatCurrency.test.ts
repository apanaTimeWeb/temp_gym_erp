// RESPONSIBILITY: Verifies finance P&L currency formatting requires explicit currency identity and integer minor units.
// DATA FLOW: API minor-unit amount plus ISO currency/locale → currency formatter → localized display or safe fallback.

import { describe, expect, it } from 'vitest';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossFormatCurrency';

describe('AdminFinanceFormatCurrency', () => {
  it('formats explicit USD minor units as currency', () => {
    expect(AdminFinanceFormatCurrency(12345, 'USD', 'en-US')).toBe('$123.45');
  });

  it('does not infer currency and safely handles invalid data or locale', () => {
    expect(AdminFinanceFormatCurrency(12345, undefined, 'en-US')).toBe('—');
    expect(AdminFinanceFormatCurrency(12345, 'usd', 'en-US')).toBe('—');
    expect(AdminFinanceFormatCurrency(1.5, 'USD', 'en-US')).toBe('—');
    expect(AdminFinanceFormatCurrency(100, 'USD', 'not_a_locale')).toBe('—');
  });
});
