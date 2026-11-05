import { describe, expect, it } from 'vitest';

import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

describe('ManagerInfrastructureToManagerMinorUnits', () => {
  it('converts major units to integer minor units', () => {
    expect(ManagerInfrastructureToManagerMinorUnits(1500.25)).toBe(150025);
    expect(ManagerInfrastructureToManagerMinorUnits('99.99')).toBe(9999);
  });

  it('rejects invalid currency values', () => {
    expect(() => ManagerInfrastructureToManagerMinorUnits(Number.NaN)).toThrow(RangeError);
    expect(() => ManagerInfrastructureToManagerMinorUnits(-1)).toThrow(RangeError);
  });
});
