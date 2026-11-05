// RESPONSIBILITY: Defines regression tests for AdminFinanceOverviewMaskFinancialAmount.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payments/tests/utils/AdminFinanceOverviewMaskFinancialAmount.test.ts)

import { describe, expect, it } from 'vitest';
import { maskAdminFinanceListAmount } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsMaskFinancialAmount';

describe('financial amount list masking', () => {
  it('returns a stable masked presentation independent of numeric input', () => {
    expect(maskAdminFinanceListAmount()).toBe('••••');
  });
});
