// RESPONSIBILITY: Verifies the public utility contract of the owning feature utility module.
import { describe, expect, it } from 'vitest';

import { personalSchema } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/schemas/superadmin_account_profile_overview_personal_form.schemas';



describe('personalSchema', () => {
  it('rejects an empty payload at the schema boundary', () => {
    expect(personalSchema.safeParse({}).success).toBe(false);
  });
});
