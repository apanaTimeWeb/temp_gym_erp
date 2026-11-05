// RESPONSIBILITY: Protects the module-local permission operation guard across independently mounted consumers.
// DATA FLOW: test ID / operation -> Zustand synchronous guard -> pending state assertions -> cleanup.
import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore';

const store = useAdminPermissionsStore;
beforeEach(() => store.setState({ pendingStaffOperations: {}, idempotencyKeysByIntent: {} }));

describe('Permissions shared operation guard', () => {
  it('rejects concurrent permission changes and resets on the same staff member', () => {
    const firstConsumer = store.getState();
    const secondConsumer = store.getState();
    expect(firstConsumer.tryBeginStaffOperation('staff-1')).toBe(true);
    expect(secondConsumer.tryBeginStaffOperation('staff-1')).toBe(false);
    expect(store.getState().pendingStaffOperations['staff-1']).toBe(true);
    firstConsumer.endStaffOperation('staff-1');
    expect(secondConsumer.tryBeginStaffOperation('staff-1')).toBe(true);
  });
  it('isolates distinct staff and rejects empty targets', () => {
    expect(store.getState().tryBeginStaffOperation('  ')).toBe(false);
    expect(store.getState().tryBeginStaffOperation('staff-1')).toBe(true);
    expect(store.getState().tryBeginStaffOperation('staff-2')).toBe(true);
    store.getState().endStaffOperation('staff-1');
    expect(store.getState().pendingStaffOperations['staff-2']).toBe(true);
    expect(store.getState().pendingStaffOperations['staff-1']).toBeUndefined();
  });
  it('does not allow inherited object keys to poison operation checks', () => {
    expect(store.getState().tryBeginStaffOperation('__proto__')).toBe(true);
    expect(store.getState().tryBeginStaffOperation('__proto__')).toBe(false);
    store.getState().endStaffOperation('__proto__');
    expect(store.getState().tryBeginStaffOperation('toString')).toBe(true);
  });
  it('shares idempotency identity across independent consumers and remounts', () => {
    const firstConsumer = store.getState();
    const secondConsumer = store.getState();
    const intent = '["permission","staff-1","members.view",true]';
    const first = firstConsumer.getSharedIntentKey(intent);
    expect(first.length).toBeGreaterThan(0);
    expect(secondConsumer.getSharedIntentKey(intent)).toBe(first);
    expect(store.getState().getSharedIntentKey('["permission","staff-1","members.view",false]')).not.toBe(first);
    secondConsumer.clearSharedIntentKey(intent);
    expect(store.getState().getSharedIntentKey(intent)).not.toBe(first);
  });
  it('permits a clean retry after an explicit release', () => {
    expect(store.getState().tryBeginStaffOperation('staff-1')).toBe(true);
    store.getState().endStaffOperation('staff-1');
    expect(store.getState().tryBeginStaffOperation('staff-1')).toBe(true);
  });
});
