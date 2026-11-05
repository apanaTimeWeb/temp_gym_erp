// RESPONSIBILITY: Defines canonical membership billing-cycle IDs used by forms, pricing, and expiry calculations.
export const BILLING_CYCLE_ONE_MONTH = 'ONE_MONTH' as const;
export const BILLING_CYCLE_THREE_MONTHS = 'THREE_MONTHS' as const;
export const BILLING_CYCLE_SIX_MONTHS = 'SIX_MONTHS' as const;
export const BILLING_CYCLE_TWELVE_MONTHS = 'TWELVE_MONTHS' as const;
export const BILLING_CYCLE_CUSTOM = 'CUSTOM' as const;
export const MANAGER_MEMBERS_DIRECTORY_BILLING_CYCLE_VALUES = [BILLING_CYCLE_ONE_MONTH, BILLING_CYCLE_THREE_MONTHS, BILLING_CYCLE_SIX_MONTHS, BILLING_CYCLE_TWELVE_MONTHS, BILLING_CYCLE_CUSTOM, 'Monthly', 'Quarterly', 'Semiannual', 'Annual'] as const;
