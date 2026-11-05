// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutBackendMessage.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/feedback/AdminNavigationLayoutBackendMessage.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutBackendMessage';

describe('getAdminBackendMessage', () => {
  it('returns a supplied Error message', () => {
    expect(getAdminBackendMessage(new Error('Backend rejected the request.'))).toBe('Backend rejected the request.');
  });

  it('returns no invented message when the error has no backend message', () => {
    expect(getAdminBackendMessage({ code: 'UNKNOWN' })).toBeNull();
  });
});
