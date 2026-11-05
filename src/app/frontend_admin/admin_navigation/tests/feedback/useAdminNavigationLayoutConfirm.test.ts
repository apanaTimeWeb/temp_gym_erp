// RESPONSIBILITY: Defines regression tests for useAdminNavigationLayoutConfirm.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/feedback/useAdminNavigationLayoutConfirm.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { createElement, type ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm';
import { ConfirmContext } from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutConfirmProvider';

describe('useAdminNavigationLayoutConfirm', () => {
  it('returns the module confirmation service from its provider', () => {
    const confirm = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => createElement(
      ConfirmContext.Provider,
      { value: { confirm } as never },
      children,
    );
    const { result } = renderHook(() => useAdminNavigationLayoutConfirm(), { wrapper });
    expect(result.current.confirm).toBe(confirm);
  });

  it('fails loudly when used without the provider', () => {
    expect(() => renderHook(() => useAdminNavigationLayoutConfirm())).toThrow('Admin confirmation provider is required.');
  });
});
