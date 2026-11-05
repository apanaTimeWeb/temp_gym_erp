import { describe, expect, it } from 'vitest';

import { planSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle.schemas';

describe('Plans API money schema', () => { it('rejects fractional minor-unit plan prices', () => { const plan = { id: 'p1', name: 'Basic', tier: 'BASIC', price1Month: 150000, price3Month: 420000, price6Month: 780000, price12Month: 1440000, features: [], isActive: true }; expect(planSchema.safeParse(plan).success).toBe(true); expect(planSchema.safeParse({ ...plan, price1Month: 150000.5 }).success).toBe(false); }); });
