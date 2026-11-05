// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutCreateIdempotencyKey.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/AdminNavigationLayoutCreateIdempotencyKey.test.ts)

import { describe, expect, it } from 'vitest';
import { createAdminIdempotencyKey } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutCreateIdempotencyKey';

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('createAdminIdempotencyKey', () => {
  it('creates a canonical UUID v4 key for one confirmed intent', () => {
    expect(createAdminIdempotencyKey()).toMatch(UUID_V4);
  });
  it('rejects malformed UUIDs, non-v4 versions, and non-RFC variants', () => {
    expect(UUID_V4.test('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(UUID_V4.test('550e8400-e29b-11d4-a716-446655440000')).toBe(false);
    expect(UUID_V4.test('550e8400-e29b-41d4-7716-446655440000')).toBe(false);
    expect(UUID_V4.test('550e8400e29b-41d4-a716-446655440000')).toBe(false);
  });
});
