// RESPONSIBILITY: Rejects nonnumeric or nonpositive demo financial mutations before MSW state changes.
export function isAdminFinanceStaffDuesMockAmountValid(amount: unknown): amount is number {
  return typeof amount === 'number' && Number.isFinite(amount) && amount > 0;
}
