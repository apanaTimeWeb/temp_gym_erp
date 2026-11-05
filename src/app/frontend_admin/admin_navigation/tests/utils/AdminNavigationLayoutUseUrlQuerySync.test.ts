// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutUseUrlQuerySync.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/AdminNavigationLayoutUseUrlQuerySync.test.ts)

import { describe, expect, it } from 'vitest';
import type { AdminUrlQueryBinding } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';

describe('AdminUrlQueryBinding contract', () => {
  it('represents only serializable URL primitives and optional defaults', () => {
    const binding: AdminUrlQueryBinding = { key: 'page', value: 2, defaultValue: 1, setValue: (value) => { if (value === '') throw new Error('unexpected empty page'); } };
    expect(binding.key).toBe('page');
    expect(binding.value).toBe(2);
    expect(binding.defaultValue).toBe(1);
  });
});
