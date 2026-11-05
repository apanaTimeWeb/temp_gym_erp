// RESPONSIBILITY: Defines regression tests for AdminSecurityPermissionsManagementMockHandlers.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/mocks/AdminSecurityPermissionsManagementMockHandlers.test.ts)

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import {
  MOCK_ADMIN_PERMISSION_OVERRIDES,
  MOCK_ADMIN_PERMISSIONS,
} from '@/app/frontend_admin/admin_security/security_permissions_management/mocks/fixtures/AdminSecurityPermissionsManagementMockFixtures';
import {
  resetAdminPermissionsMockState,
  adminPermissionsMockHandlers,
} from '@/app/frontend_admin/admin_security/security_permissions_management/mocks/handlers/AdminSecurityPermissionsManagementMockHandlers';

const server = setupServer(...adminPermissionsMockHandlers);
const overridesUrl = 'http://localhost/admin/permissions/overrides';
const staffPermissionUrl = 'http://localhost/admin/permissions/staff-1001';

describe('Admin Permissions mutable MSW fixtures', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  beforeEach(() => resetAdminPermissionsMockState());
  afterEach(() => {
    server.resetHandlers();
    resetAdminPermissionsMockState();
  });
  afterAll(() => server.close());

  it('rejects malformed payloads and unsupported permission keys', async () => {
    const malformedResponse = await fetch(staffPermissionUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permission: 'members.view', enabled: 'false' }),
    });
    expect(malformedResponse.status).toBe(400);

    const unsupportedResponse = await fetch(staffPermissionUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permission: 'system.root', enabled: true }),
    });
    expect(unsupportedResponse.status).toBe(400);
  });

  it('mutates fixture state and restores canonical state through the reset helper', async () => {
    expect(resetAdminPermissionsMockState).not.toThrow();
    expect(adminPermissionsMockHandlers.length).toBeGreaterThan(0);
    expect(MOCK_ADMIN_PERMISSIONS).toBeDefined();
    expect(MOCK_ADMIN_PERMISSION_OVERRIDES).toBeDefined();

    const updateResponse = await fetch(staffPermissionUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permission: 'members.view', enabled: false }),
    });
    expect(updateResponse.status).toBe(200);
    const updatedPayload = await updateResponse.json() as { data: { overrides: Record<string, boolean> } };
    expect(updatedPayload.data.overrides['members.view']).toBe(false);

    const persistedResponse = await fetch(overridesUrl);
    const persistedPayload = await persistedResponse.json() as { data: Array<{ staffId: string; overrides: Record<string, boolean> }> };
    expect(persistedPayload.data.find((item) => item.staffId === 'staff-1001')?.overrides['members.view']).toBe(false);

    resetAdminPermissionsMockState();
    const resetResponse = await fetch(overridesUrl);
    const resetPayload = await resetResponse.json() as { data: Array<{ staffId: string; overrides: Record<string, boolean> }> };
    expect(resetPayload.data.find((item) => item.staffId === 'staff-1001')?.overrides['members.view']).toBeUndefined();
  });
});
