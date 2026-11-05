// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutIdempotencyIntentStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/AdminNavigationLayoutIdempotencyIntentStore.test.ts)

import { describe, expect, it } from 'vitest';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutIdempotencyIntentStore';

describe('AdminNavigationLayoutIdempotencyIntentStore', () => {
  it('reuses the exact same key for a retry of the same confirmed intent', () => {
    const registry = new Map<string, string>();
    const firstKey = getAdminIdempotencyKey(registry, 'payroll:pay-1');
    const retryKey = getAdminIdempotencyKey(registry, 'payroll:pay-1');

    expect(retryKey).toBe(firstKey);
  });

  it('creates a fresh key after an intent is explicitly abandoned', () => {
    const registry = new Map<string, string>();
    const firstKey = getAdminIdempotencyKey(registry, 'delete:member-1');
    clearAdminIdempotencyKey(registry, 'delete:member-1');
    const reopenedKey = getAdminIdempotencyKey(registry, 'delete:member-1');

    expect(reopenedKey).not.toBe(firstKey);
  });
});
