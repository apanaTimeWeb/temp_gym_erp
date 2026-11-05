// RESPONSIBILITY: Calculates the inquiry conversion price from a selected plan and billing cycle.
import type { PlanSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_plan_snapshot.types';

export function ManagerInquiriesPipelineCalculatePriceForCycle(plan: PlanSnapshot | undefined, cycle: string, customDays = 0): number {
  if (!plan) return 0;
  const priceByCycle: Record<string, number> = {
    ONE_MONTH: plan.price1Month, THREE_MONTHS: plan.price3Month, SIX_MONTHS: plan.price6Month,
    TWELVE_MONTHS: plan.price12Month, CUSTOM: (plan.priceCustom || 0) * customDays,
  };
  return priceByCycle[cycle] ?? 0;
}
