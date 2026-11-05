// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { OnboardGymSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_validation.schemas';



describe('OnboardGymSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(OnboardGymSchema.safeParse({}).success).toBe(false);
  });
});
