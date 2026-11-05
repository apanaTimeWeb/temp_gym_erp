// RESPONSIBILITY: Validates mock-only payroll monetary mutation constraints; real backend enforcement remains authoritative.
/** Mock-only request boundary: reject financial inconsistencies before mutating fixtures or ledgers. */
export function isAdminFinancePayrollMockAmountValid(amount: unknown, paidAmount: unknown): boolean {
  return typeof amount === 'number' && Number.isFinite(amount) && amount > 0 &&
    typeof paidAmount === 'number' && Number.isFinite(paidAmount) &&
    paidAmount >= 0 && paidAmount <= amount;
}
