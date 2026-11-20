// RESPONSIBILITY: Form value contract for create/edit subscription plan forms.
export interface SuperadminBillingPlansFormValues {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  setupFee?: number;
  currency?: string;
  maxMembers: number;
  maxStaff: number;
  maxBranches?: number;
  dbLimitGb: number;
  binaryLimitGb: number;
  features: Array<{ value: string }>;
}
