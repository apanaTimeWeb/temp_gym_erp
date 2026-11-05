// RESPONSIBILITY: Form value contract for create/edit subscription plan forms.
export interface SuperadminBillingPlansFormValues {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  maxMembers: number;
  maxStaff: number;
  dbLimitGb: number;
  binaryLimitGb: number;
  features: Array<{ value: string }>;
}
