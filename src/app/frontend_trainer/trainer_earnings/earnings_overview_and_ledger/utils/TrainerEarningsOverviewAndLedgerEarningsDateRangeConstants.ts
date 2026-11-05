// RESPONSIBILITY: Earnings-owned date-range UI configuration. It is not global business configuration.
export const TRAINER_EARNINGS_DATE_RANGE_OPTIONS = [
  { labelKey: 'TEXT_THIS_MONTH', value: 'this_month' },
  { labelKey: 'TEXT_LAST_MONTH', value: 'last_month' },
  { labelKey: 'TEXT_LAST_3_MONTHS', value: 'last_3_months' },
  { labelKey: 'TEXT_LAST_6_MONTHS', value: 'last_6_months' },
  { labelKey: 'TEXT_THIS_YEAR', value: 'this_year' },
  { labelKey: 'TEXT_CUSTOM', value: 'custom' },
] as const;
