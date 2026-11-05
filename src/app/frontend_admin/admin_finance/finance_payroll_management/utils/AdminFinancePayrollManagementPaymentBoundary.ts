// RESPONSIBILITY: Prevent invalid or excess payroll disbursements before the API mutation.
// All amounts are integer minor currency units in the existing verified payroll DTO.
export function canAdminFinancePayrollManagementPay(amountMinor: number, alreadyPaidMinor: number, pendingMinor: number): boolean {
  return Number.isSafeInteger(amountMinor) && amountMinor > 0
    && Number.isSafeInteger(alreadyPaidMinor) && alreadyPaidMinor >= 0
    && Number.isSafeInteger(pendingMinor) && pendingMinor >= 0
    && amountMinor <= pendingMinor
    && Number.isSafeInteger(alreadyPaidMinor + amountMinor);
}
