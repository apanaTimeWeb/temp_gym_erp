import type { PlanSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_plan_snapshot.types';


/**
 * @description Provides the ManagerInquiriesPipelineConvertConstants implementation for the inquiries module.
 * @dependencies @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_types/ManagerInquiriesPipelinePlanSnapshotTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_INQUIRY_MAX_AMOUNT_MAJOR_UNITS = Number.MAX_SAFE_INTEGER / 100;
export const MANAGER_INQUIRY_MAX_CUSTOM_DAYS = 3650;

export const INQUIRIES_CYCLE_LABELS: Record<string, string> = { ONE_MONTH: '1 Month', THREE_MONTHS: '3 Months', SIX_MONTHS: '6 Months', TWELVE_MONTHS: '12 Months', CUSTOM: 'Custom (Days)' };
export const INQUIRIES_GENDER_OPTIONS = [{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }, { label: 'Other', value: 'OTHER' }];
export function getPriceForCycleSnapshot(plan: PlanSnapshot | undefined, cycle: string, customDays = 0): number {
  if (!plan) return 0;
  const map: Record<string, number> = {
    ONE_MONTH: plan.price1Month,
    THREE_MONTHS: plan.price3Month,
    SIX_MONTHS: plan.price6Month,
    TWELVE_MONTHS: plan.price12Month,
    CUSTOM: (plan.priceCustom || 0) * customDays,
  };
  return map[cycle] || 0;
}

export const INQUIRIES_CYCLE_OPTIONS_CUSTOM = 'CUSTOM' as const;
