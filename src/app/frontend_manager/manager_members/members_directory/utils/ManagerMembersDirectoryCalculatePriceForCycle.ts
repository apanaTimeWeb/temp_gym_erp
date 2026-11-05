// RESPONSIBILITY: Calculates membership plan prices for canonical and legacy billing-cycle IDs.
import type { ManagerMembersDirectoryPlanPricingSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

export function ManagerMembersDirectoryCalculatePriceForCycle(plan: ManagerMembersDirectoryPlanPricingSnapshot | undefined, cycle: string, customDays = 0): number {
  if (!plan) return 0;
  const priceByCycle: Record<string, number> = {
    ONE_MONTH: plan.price1Month, Monthly: plan.price1Month,
    THREE_MONTHS: plan.price3Month, Quarterly: plan.price3Month,
    SIX_MONTHS: plan.price6Month, Semiannual: plan.price6Month,
    TWELVE_MONTHS: plan.price12Month, Annual: plan.price12Month,
    CUSTOM: (plan.priceCustom || 0) * (customDays || 0),
  };
  return priceByCycle[cycle] ?? 0;
}
