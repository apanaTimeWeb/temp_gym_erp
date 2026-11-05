import { describe, expect, it } from 'vitest';
import { ManagerMembersDirectoryCalculatePriceForCycle } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculatePriceForCycle';

const plan = { price1Month: 1000, price3Month: 2700, price6Month: 5000, price12Month: 9000, priceCustom: 120 };

describe('ManagerMembersDirectoryCalculatePriceForCycle', () => {
  it('calculates canonical and legacy billing-cycle prices consistently', () => {
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'ONE_MONTH')).toBe(1000);
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'Monthly')).toBe(1000);
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'THREE_MONTHS')).toBe(2700);
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'Quarterly')).toBe(2700);
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'Semiannual')).toBe(5000);
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'Annual')).toBe(9000);
  });

  it('calculates custom duration and safely handles missing plans', () => {
    expect(ManagerMembersDirectoryCalculatePriceForCycle(plan, 'CUSTOM', 5)).toBe(600);
    expect(ManagerMembersDirectoryCalculatePriceForCycle(undefined, 'ONE_MONTH')).toBe(0);
  });
});
