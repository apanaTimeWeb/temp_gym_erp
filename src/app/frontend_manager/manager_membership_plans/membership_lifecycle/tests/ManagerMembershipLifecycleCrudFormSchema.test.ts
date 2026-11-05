import { describe, expect, it } from 'vitest';
import { managerPlansCrudFormSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle_crud_form.schemas';

describe('Manager Plans CRUD form schema input/output parity', () => {
  it('coerces price inputs and defaults the feature list', () => {
    const result = managerPlansCrudFormSchema.safeParse({ name: 'Premium', tier: 'PREMIUM', price1Month: '100', price3Month: '270', price6Month: '500', price12Month: '900', isActive: true });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.price1Month).toBe(100); expect(result.data.featuresText).toBe(''); }
  });
});
