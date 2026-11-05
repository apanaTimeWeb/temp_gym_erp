// RESPONSIBILITY: Defines regression tests for AdminProfileOverviewSchemas.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_profile/profile_overview/tests/schemas/AdminProfileOverviewSchemas.test.ts)

import { describe, expect, it } from 'vitest';
import { updateAdminPasswordPayloadSchema } from '@/app/frontend_admin/admin_profile/profile_overview/schemas/AdminProfileOverviewSchemas';

describe('updateAdminPasswordPayloadSchema', () => {
  const valid = { currentPassword: 'old-passphrase', newPassword: 'new-passphrase', confirmPassword: 'new-passphrase' };

  it('accepts non-empty current password and matching new passwords of at least eight characters', () => {
    expect(updateAdminPasswordPayloadSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects blank current password', () => {
    expect(updateAdminPasswordPayloadSchema.safeParse({ ...valid, currentPassword: '' }).success).toBe(false);
  });

  it('rejects blank or too-short new passwords', () => {
    expect(updateAdminPasswordPayloadSchema.safeParse({ ...valid, newPassword: '', confirmPassword: '' }).success).toBe(false);
    expect(updateAdminPasswordPayloadSchema.safeParse({ ...valid, newPassword: 'short', confirmPassword: 'short' }).success).toBe(false);
  });

  it('rejects non-matching confirmation', () => {
    const result = updateAdminPasswordPayloadSchema.safeParse({ ...valid, confirmPassword: 'different-pass' });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.some((issue) => issue.path[0] === 'confirmPassword')).toBe(true);
  });
});
