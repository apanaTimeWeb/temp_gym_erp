// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutErrorFallback.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/components/AdminNavigationLayoutErrorFallback.test.tsx)

import { describe, expect, it } from 'vitest';
import { isAdminForbiddenError } from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutErrorFallback';

describe('isAdminForbiddenError', () => {
  it('classifies structured HTTP 403 status and explicit forbidden code', () => {
    expect(isAdminForbiddenError(Object.assign(new Error('request failed'), { status: 403 }))).toBe(true);
    expect(isAdminForbiddenError(Object.assign(new Error('request failed'), { response: { status: 403 } }))).toBe(true);
    expect(isAdminForbiddenError(Object.assign(new Error('blocked'), { code: 'FORBIDDEN' }))).toBe(true);
  });
  it('does not infer authorization failure from arbitrary message text', () => {
    expect(isAdminForbiddenError(new Error('the permission server returned 403 in an example'))).toBe(false);
    expect(isAdminForbiddenError(new Error('unauthorized word appears in an unrelated network message'))).toBe(false);
    expect(isAdminForbiddenError(new Error('Network Error'))).toBe(false);
  });
});
