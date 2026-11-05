import { describe, expect, it } from 'vitest';

import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';

describe('ManagerInfrastructureFromManagerMinorUnits', () => {
  it('converts integer minor units back to major units', () => {
    expect(ManagerInfrastructureFromManagerMinorUnits(150025)).toBe(1500.25);
    expect(ManagerInfrastructureFromManagerMinorUnits(0)).toBe(0);
  });

  it('rejects non-finite currency values', () => {
    expect(() => ManagerInfrastructureFromManagerMinorUnits(Number.POSITIVE_INFINITY)).toThrow(RangeError);
    expect(() => ManagerInfrastructureFromManagerMinorUnits(Number.NaN)).toThrow(RangeError);
  });
});
