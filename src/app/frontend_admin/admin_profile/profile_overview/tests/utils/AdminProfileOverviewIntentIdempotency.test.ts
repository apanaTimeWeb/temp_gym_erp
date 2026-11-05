// RESPONSIBILITY: Defines regression tests for AdminProfileOverviewIntentIdempotency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_profile/profile_overview/tests/utils/AdminProfileOverviewIntentIdempotency.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminProfileIntentIdempotencyKey, clearAdminProfileIntentIdempotencyKey } from '@/app/frontend_admin/admin_profile/profile_overview/utils/AdminProfileOverviewIntentIdempotency';

describe('Admin profile intent idempotency', () => {
  it('reuses a key for retry of the same payload and rotates it when a payload changes', () => {
    const keys = new Map<string, string>();
    const signatures = new Map<string, string>();
    const first = getAdminProfileIntentIdempotencyKey(keys, signatures, 'profile-update', { name: 'A', phone: '1234567' });
    expect(getAdminProfileIntentIdempotencyKey(keys, signatures, 'profile-update', { name: 'A', phone: '1234567' })).toBe(first);
    const changed = getAdminProfileIntentIdempotencyKey(keys, signatures, 'profile-update', { name: 'B', phone: '1234567' });
    expect(changed).not.toBe(first);
    clearAdminProfileIntentIdempotencyKey(keys, signatures, 'profile-update');
    expect(keys.has('profile-update')).toBe(false);
    expect(signatures.has('profile-update')).toBe(false);
  });
});
