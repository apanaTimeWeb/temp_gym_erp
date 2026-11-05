// RESPONSIBILITY: Defines regression tests for useAdminNavigationLayoutToastStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/state/useAdminNavigationLayoutToastStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_navigation/state/useAdminNavigationLayoutToastStore';

describe('useAdminNavigationLayoutToastStore', () => {
  beforeEach(() => useAdminNavigationLayoutToastStore.setState({ toast: null }));

  it('stores a new toast with a stable identity', () => {
    useAdminNavigationLayoutToastStore.getState().showToast('Saved', 'success', 'save-1');
    expect(useAdminNavigationLayoutToastStore.getState().toast).toEqual({ id: 'save-1', message: 'Saved', type: 'success' });
  });

  it('updates the visible toast when the same ID has different content', () => {
    const store = useAdminNavigationLayoutToastStore.getState();
    store.showToast('Saved', 'success', 'save-1');
    const first = useAdminNavigationLayoutToastStore.getState().toast;
    store.showToast('Saved again', 'success', 'save-1');
    expect(useAdminNavigationLayoutToastStore.getState().toast).not.toBe(first);
    expect(useAdminNavigationLayoutToastStore.getState().toast?.message).toBe('Saved again');
  });

  it('deduplicates the same ID, message and type', () => {
    const store = useAdminNavigationLayoutToastStore.getState();
    store.showToast('Saved', 'success', 'save-1');
    const first = useAdminNavigationLayoutToastStore.getState().toast;
    store.showToast('Saved', 'success', 'save-1');
    expect(useAdminNavigationLayoutToastStore.getState().toast).toBe(first);
  });

  it('clears the toast when hidden', () => {
    useAdminNavigationLayoutToastStore.getState().showToast('Saved', 'success', 'save-1');
    useAdminNavigationLayoutToastStore.getState().hideToast();
    expect(useAdminNavigationLayoutToastStore.getState().toast).toBeNull();
  });
});
